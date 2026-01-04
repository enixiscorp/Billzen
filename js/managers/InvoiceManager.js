/**
 * Gestionnaire principal des factures
 * Orchestre la création, modification et export des factures
 */

class InvoiceManager {
    constructor() {
        this.state = getState();
    }
    
    /**
     * Met à jour les informations de l'entreprise
     * @param {Object} companyData - Données de l'entreprise
     */
    setCompanyInfo(companyData) {
        updateState('invoice.company', { ...this.state.invoice.company, ...companyData });
    }
    
    /**
     * Ajoute un article à la facture
     * @param {Object} item - Article à ajouter
     */
    addItem(item) {
        const newItem = {
            id: generateId(),
            reference: item.reference || '',
            description: item.description || '',
            quantity: item.quantity || 1,
            unitPrice: item.unitPrice || 0,
            discount: item.discount || 0,
            vatRate: item.vatRate || 0,
            lineTotal: 0
        };
        
        newItem.lineTotal = ItemCalculator.calculateLineTotal(
            newItem.quantity,
            newItem.unitPrice,
            newItem.discount,
            newItem.vatRate
        );
        
        const currentItems = this.state.invoice.items;
        updateState('invoice.items', [...currentItems, newItem]);
        this.calculateTotals();
    }
    
    /**
     * Supprime un article
     * @param {string} itemId - ID de l'article à supprimer
     */
    removeItem(itemId) {
        const currentItems = this.state.invoice.items;
        const filteredItems = currentItems.filter(item => item.id !== itemId);
        updateState('invoice.items', filteredItems);
        this.calculateTotals();
    }
    
    /**
     * Met à jour un article existant
     * @param {string} itemId - ID de l'article
     * @param {Object} updates - Mises à jour
     */
    updateItem(itemId, updates) {
        const currentItems = this.state.invoice.items;
        const updatedItems = currentItems.map(item => {
            if (item.id === itemId) {
                const updatedItem = { ...item, ...updates };
                updatedItem.lineTotal = ItemCalculator.calculateLineTotal(
                    updatedItem.quantity,
                    updatedItem.unitPrice,
                    updatedItem.discount,
                    updatedItem.vatRate
                );
                return updatedItem;
            }
            return item;
        });
        
        updateState('invoice.items', updatedItems);
        this.calculateTotals();
    }
    
    /**
     * Recalcule tous les totaux
     */
    calculateTotals() {
        const totals = TotalCalculator.calculateFinalTotals(
            this.state.invoice.items,
            this.state.invoice.hourlyItems
        );
        updateState('invoice.totals', totals);
    }
    
    /**
     * Exporte la facture en PDF
     */
    exportToPDF() {
        // Sera implémenté dans les tâches suivantes
        console.log('Export PDF - À implémenter');
    }
    
    /**
     * Exporte la facture en JPG
     */
    exportToJPG() {
        // Sera implémenté dans les tâches suivantes
        console.log('Export JPG - À implémenter');
    }
    
    /**
     * Applique un thème
     * @param {string} themeId - ID du thème
     */
    applyTheme(themeId) {
        updateState('invoice.theme', themeId);
    }
    
    /**
     * Change la devise
     * @param {string} currencyCode - Code de la devise
     */
    setCurrency(currencyCode) {
        updateState('invoice.currency', currencyCode);
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InvoiceManager;
}