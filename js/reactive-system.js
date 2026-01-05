/**
 * Système de mise à jour en temps réel
 * Gère les calculs automatiques et la réactivité de l'interface
 */

class ReactiveSystem {
    constructor() {
        this.updateQueue = new Set();
        this.isUpdating = false;
        this.debounceTimeout = null;
        this.performanceMetrics = {
            calculationTimes: [],
            updateTimes: []
        };
        
        // Configuration de performance
        this.DEBOUNCE_DELAY = 16; // ~60fps
        this.MAX_CALCULATION_TIME = 100; // 100ms max selon exigence 9.1
        this.MAX_UPDATE_TIME = 50; // 50ms max selon exigence 9.3
        
        this.initializeEventListeners();
    }
    
    /**
     * Initialise les écouteurs d'événements pour les calculs automatiques
     */
    initializeEventListeners() {
        // Écouteurs pour les champs d'articles
        this.setupItemFieldListeners();
        
        // Écouteurs pour les champs de prestations horaires
        this.setupHourlyFieldListeners();
        
        // Écouteurs pour les modifications d'état global
        this.setupGlobalStateListeners();
        
        // Écouteur pour les changements de devise
        this.setupCurrencyListeners();
        
        console.log('Système réactif initialisé');
    }
    
    /**
     * Configure les écouteurs pour les champs d'articles
     */
    setupItemFieldListeners() {
        const itemFields = [
            'item-quantity',
            'item-unit-price', 
            'item-discount',
            'item-vat'
        ];
        
        itemFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                // Utiliser 'input' pour une réactivité immédiate
                field.addEventListener('input', (e) => {
                    this.scheduleCalculationUpdate('item-preview');
                });
                
                // Également écouter 'change' pour la validation finale
                field.addEventListener('change', (e) => {
                    this.scheduleCalculationUpdate('item-validation');
                });
            }
        });
        
        // Écouteurs pour les articles existants (délégation d'événements)
        document.addEventListener('input', (e) => {
            if (e.target.matches('.item-field')) {
                const itemId = e.target.dataset.itemId;
                this.scheduleItemUpdate(itemId);
            }
        });
    }
    
    /**
     * Configure les écouteurs pour les champs de prestations horaires
     */
    setupHourlyFieldListeners() {
        const hourlyFields = [
            'hourly-hours',
            'hourly-rate'
        ];
        
        hourlyFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', (e) => {
                    this.scheduleCalculationUpdate('hourly-preview');
                });
                
                field.addEventListener('change', (e) => {
                    this.scheduleCalculationUpdate('hourly-validation');
                });
            }
        });
        
        // Écouteurs pour les prestations existantes
        document.addEventListener('input', (e) => {
            if (e.target.matches('.hourly-field')) {
                const itemId = e.target.dataset.itemId;
                this.scheduleHourlyUpdate(itemId);
            }
        });
    }
    
    /**
     * Configure les écouteurs pour l'état global
     */
    setupGlobalStateListeners() {
        // Écouter les événements personnalisés de changement d'état
        document.addEventListener('stateChanged', (e) => {
            this.scheduleCalculationUpdate('state-change');
        });
        
        // Écouter les changements de thème
        document.addEventListener('themeApplied', (e) => {
            this.scheduleDisplayUpdate('theme-change');
        });
    }
    
    /**
     * Configure les écouteurs pour les changements de devise
     */
    setupCurrencyListeners() {
        const currencySelect = document.getElementById('currency-select');
        if (currencySelect) {
            currencySelect.addEventListener('change', (e) => {
                this.scheduleCalculationUpdate('currency-change');
                this.scheduleDisplayUpdate('currency-format');
            });
        }
    }
    
    /**
     * Programme une mise à jour des calculs avec debouncing
     * @param {string} reason - Raison de la mise à jour
     */
    scheduleCalculationUpdate(reason) {
        this.updateQueue.add('calculations');
        this.debounceUpdate(reason);
    }
    
    /**
     * Programme une mise à jour de l'affichage
     * @param {string} reason - Raison de la mise à jour
     */
    scheduleDisplayUpdate(reason) {
        this.updateQueue.add('display');
        this.debounceUpdate(reason);
    }
    
    /**
     * Programme une mise à jour d'un article spécifique
     * @param {string} itemId - ID de l'article
     */
    scheduleItemUpdate(itemId) {
        this.updateQueue.add(`item-${itemId}`);
        this.debounceUpdate('item-update');
    }
    
    /**
     * Programme une mise à jour d'une prestation horaire spécifique
     * @param {string} itemId - ID de la prestation
     */
    scheduleHourlyUpdate(itemId) {
        this.updateQueue.add(`hourly-${itemId}`);
        this.debounceUpdate('hourly-update');
    }
    
    /**
     * Debounce les mises à jour pour optimiser les performances
     * @param {string} reason - Raison de la mise à jour
     */
    debounceUpdate(reason) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        
        this.debounceTimeout = setTimeout(() => {
            this.processUpdateQueue(reason);
        }, this.DEBOUNCE_DELAY);
    }
    
    /**
     * Traite la queue des mises à jour
     * @param {string} reason - Raison de la mise à jour
     */
    async processUpdateQueue(reason) {
        if (this.isUpdating) return;
        
        this.isUpdating = true;
        const startTime = performance.now();
        
        try {
            // Traiter les mises à jour par priorité
            const updates = Array.from(this.updateQueue);
            this.updateQueue.clear();
            
            // 1. Calculs d'abord
            if (updates.includes('calculations')) {
                await this.performCalculations();
            }
            
            // 2. Mises à jour d'articles spécifiques
            const itemUpdates = updates.filter(u => u.startsWith('item-'));
            for (const update of itemUpdates) {
                const itemId = update.replace('item-', '');
                await this.updateItemDisplay(itemId);
            }
            
            // 3. Mises à jour de prestations horaires
            const hourlyUpdates = updates.filter(u => u.startsWith('hourly-'));
            for (const update of hourlyUpdates) {
                const itemId = update.replace('hourly-', '');
                await this.updateHourlyDisplay(itemId);
            }
            
            // 4. Mise à jour de l'affichage général
            if (updates.includes('display')) {
                await this.updateGeneralDisplay();
            }
            
            const endTime = performance.now();
            const updateTime = endTime - startTime;
            
            // Enregistrer les métriques de performance
            this.recordUpdateTime(updateTime);
            
            // Vérifier les performances selon les exigences
            this.checkPerformanceRequirements(updateTime, reason);
            
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        } finally {
            this.isUpdating = false;
        }
    }
    
    /**
     * Effectue tous les calculs nécessaires
     */
    async performCalculations() {
        const startTime = performance.now();
        
        try {
            const state = getState();
            const { items, hourlyItems } = state.invoice;
            
            // Calculer les totaux avec optimisation
            const totals = TotalCalculator.calculateFinalTotals(items, hourlyItems);
            
            // Mettre à jour l'état
            updateState('invoice.totals', totals);
            
            // Déclencher l'événement de changement d'état
            const event = new CustomEvent('calculationsUpdated', {
                detail: { totals, reason: 'reactive-calculation' }
            });
            document.dispatchEvent(event);
            
            const endTime = performance.now();
            const calculationTime = endTime - startTime;
            
            // Enregistrer les métriques
            this.recordCalculationTime(calculationTime);
            
            return totals;
            
        } catch (error) {
            console.error('Erreur lors des calculs:', error);
            throw error;
        }
    }
    
    /**
     * Met à jour l'affichage d'un article spécifique
     * @param {string} itemId - ID de l'article
     */
    async updateItemDisplay(itemId) {
        const state = getState();
        const item = state.invoice.items.find(i => i.id === itemId);
        
        if (!item) return;
        
        // Calculer le total de la ligne
        const lineTotal = ItemCalculator.calculateLineTotal(
            item.quantity,
            item.unitPrice,
            item.discount,
            item.vatRate
        );
        
        // Mettre à jour l'affichage
        const totalElement = document.querySelector(`[data-item-id="${itemId}"] .item-total`);
        if (totalElement) {
            totalElement.textContent = this.formatCurrency(lineTotal);
        }
        
        // Mettre à jour l'item dans l'état
        const itemIndex = state.invoice.items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            updateState(`invoice.items.${itemIndex}.lineTotal`, lineTotal);
        }
    }
    
    /**
     * Met à jour l'affichage d'une prestation horaire spécifique
     * @param {string} itemId - ID de la prestation
     */
    async updateHourlyDisplay(itemId) {
        const state = getState();
        const item = state.invoice.hourlyItems.find(i => i.id === itemId);
        
        if (!item) return;
        
        // Calculer le total
        const total = HourlyCalculator.calculateHourlyTotal(item.hours, item.hourlyRate);
        
        // Mettre à jour l'affichage
        const totalElement = document.querySelector(`[data-hourly-id="${itemId}"] .hourly-total`);
        if (totalElement) {
            totalElement.textContent = this.formatCurrency(total);
        }
        
        // Mettre à jour l'item dans l'état
        const itemIndex = state.invoice.hourlyItems.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            updateState(`invoice.hourlyItems.${itemIndex}.total`, total);
        }
    }
    
    /**
     * Met à jour l'affichage général
     */
    async updateGeneralDisplay() {
        const state = getState();
        const { totals } = state.invoice;
        
        // Mettre à jour les totaux dans l'interface
        this.updateTotalsDisplay(totals);
        
        // Mettre à jour le formatage des devises si nécessaire
        this.updateCurrencyFormatting();
        
        // Mettre à jour les prévisualisations
        this.updatePreviewCalculations();
    }
    
    /**
     * Met à jour l'affichage des totaux
     * @param {Object} totals - Objet des totaux
     */
    updateTotalsDisplay(totals) {
        const elements = {
            'subtotal-ht': totals.subtotalHT,
            'total-discount': totals.totalDiscount,
            'total-vat': totals.totalVAT,
            'total-ttc': totals.totalTTC
        };
        
        Object.entries(elements).forEach(([elementId, value]) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = this.formatCurrency(value);
            }
        });
    }
    
    /**
     * Met à jour le formatage des devises
     */
    updateCurrencyFormatting() {
        const currencyElements = document.querySelectorAll('.currency-amount');
        currencyElements.forEach(element => {
            const amount = parseFloat(element.dataset.amount);
            if (!isNaN(amount)) {
                element.textContent = this.formatCurrency(amount);
            }
        });
    }
    
    /**
     * Met à jour les calculs de prévisualisation
     */
    updatePreviewCalculations() {
        // Prévisualisation d'article
        this.updateItemPreview();
        
        // Prévisualisation de prestation horaire
        this.updateHourlyPreview();
    }
    
    /**
     * Met à jour la prévisualisation d'article
     */
    updateItemPreview() {
        const quantity = parseFloat(document.getElementById('item-quantity')?.value) || 0;
        const unitPrice = parseFloat(document.getElementById('item-unit-price')?.value) || 0;
        const discount = parseFloat(document.getElementById('item-discount')?.value) || 0;
        const vatRate = parseFloat(document.getElementById('item-vat')?.value) || 0;
        
        if (quantity > 0 && unitPrice > 0) {
            const total = ItemCalculator.calculateLineTotal(quantity, unitPrice, discount, vatRate);
            
            const previewElement = document.getElementById('item-preview-total');
            if (previewElement) {
                previewElement.textContent = this.formatCurrency(total);
                previewElement.style.opacity = '1';
            }
        } else {
            const previewElement = document.getElementById('item-preview-total');
            if (previewElement) {
                previewElement.style.opacity = '0.5';
                previewElement.textContent = this.formatCurrency(0);
            }
        }
    }
    
    /**
     * Met à jour la prévisualisation de prestation horaire
     */
    updateHourlyPreview() {
        const hours = parseFloat(document.getElementById('hourly-hours')?.value) || 0;
        const rate = parseFloat(document.getElementById('hourly-rate')?.value) || 0;
        
        if (hours > 0 && rate > 0) {
            const total = HourlyCalculator.calculateHourlyTotal(hours, rate);
            
            const previewElement = document.getElementById('hourly-preview-total');
            if (previewElement) {
                previewElement.textContent = this.formatCurrency(total);
                previewElement.style.opacity = '1';
            }
        } else {
            const previewElement = document.getElementById('hourly-preview-total');
            if (previewElement) {
                previewElement.style.opacity = '0.5';
                previewElement.textContent = this.formatCurrency(0);
            }
        }
    }
    
    /**
     * Formate un montant selon la devise actuelle
     * @param {number} amount - Montant à formater
     * @returns {string} Montant formaté
     */
    formatCurrency(amount) {
        const state = getState();
        const currency = state.invoice.currency || 'EUR';
        
        // Utiliser le gestionnaire de devises si disponible
        if (typeof currencyManager !== 'undefined' && currencyManager.formatAmount) {
            return currencyManager.formatAmount(amount);
        }
        
        // Formatage par défaut
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
    
    /**
     * Enregistre le temps de calcul pour les métriques
     * @param {number} time - Temps en millisecondes
     */
    recordCalculationTime(time) {
        this.performanceMetrics.calculationTimes.push(time);
        
        // Garder seulement les 100 dernières mesures
        if (this.performanceMetrics.calculationTimes.length > 100) {
            this.performanceMetrics.calculationTimes.shift();
        }
    }
    
    /**
     * Enregistre le temps de mise à jour pour les métriques
     * @param {number} time - Temps en millisecondes
     */
    recordUpdateTime(time) {
        this.performanceMetrics.updateTimes.push(time);
        
        // Garder seulement les 100 dernières mesures
        if (this.performanceMetrics.updateTimes.length > 100) {
            this.performanceMetrics.updateTimes.shift();
        }
    }
    
    /**
     * Vérifie les exigences de performance
     * @param {number} updateTime - Temps de mise à jour
     * @param {string} reason - Raison de la mise à jour
     */
    checkPerformanceRequirements(updateTime, reason) {
        // Exigence 9.1: Calculs instantanés (< 100ms)
        const avgCalculationTime = this.getAverageCalculationTime();
        if (avgCalculationTime > this.MAX_CALCULATION_TIME) {
            console.warn(`Performance: Temps de calcul moyen (${avgCalculationTime.toFixed(2)}ms) dépasse la limite (${this.MAX_CALCULATION_TIME}ms)`);
        }
        
        // Exigence 9.3: Mise à jour immédiate (< 50ms)
        if (updateTime > this.MAX_UPDATE_TIME) {
            console.warn(`Performance: Temps de mise à jour (${updateTime.toFixed(2)}ms) dépasse la limite (${this.MAX_UPDATE_TIME}ms) pour ${reason}`);
        }
    }
    
    /**
     * Obtient le temps de calcul moyen
     * @returns {number} Temps moyen en millisecondes
     */
    getAverageCalculationTime() {
        const times = this.performanceMetrics.calculationTimes;
        if (times.length === 0) return 0;
        
        const sum = times.reduce((a, b) => a + b, 0);
        return sum / times.length;
    }
    
    /**
     * Obtient le temps de mise à jour moyen
     * @returns {number} Temps moyen en millisecondes
     */
    getAverageUpdateTime() {
        const times = this.performanceMetrics.updateTimes;
        if (times.length === 0) return 0;
        
        const sum = times.reduce((a, b) => a + b, 0);
        return sum / times.length;
    }
    
    /**
     * Obtient les métriques de performance
     * @returns {Object} Métriques de performance
     */
    getPerformanceMetrics() {
        return {
            averageCalculationTime: this.getAverageCalculationTime(),
            averageUpdateTime: this.getAverageUpdateTime(),
            totalCalculations: this.performanceMetrics.calculationTimes.length,
            totalUpdates: this.performanceMetrics.updateTimes.length,
            maxCalculationTime: Math.max(...this.performanceMetrics.calculationTimes, 0),
            maxUpdateTime: Math.max(...this.performanceMetrics.updateTimes, 0)
        };
    }
    
    /**
     * Force une mise à jour complète
     */
    forceUpdate() {
        this.updateQueue.add('calculations');
        this.updateQueue.add('display');
        this.processUpdateQueue('force-update');
    }
    
    /**
     * Réinitialise les métriques de performance
     */
    resetPerformanceMetrics() {
        this.performanceMetrics.calculationTimes = [];
        this.performanceMetrics.updateTimes = [];
    }
}

// Instance globale du système réactif
let reactiveSystem;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    reactiveSystem = new ReactiveSystem();
});

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReactiveSystem;
}