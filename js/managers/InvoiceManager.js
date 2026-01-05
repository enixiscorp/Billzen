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
     * Gère l'upload du logo de l'entreprise
     * @param {File} logoFile - Fichier image du logo
     * @returns {Promise<boolean>} True si l'upload a réussi
     */
    async uploadLogo(logoFile) {
        try {
            // Validation du fichier
            if (!this.validateLogoFile(logoFile)) {
                throw new Error('Fichier logo invalide');
            }
            
            // Convertir le fichier en Data URL pour stockage local
            const logoDataUrl = await this.fileToDataUrl(logoFile);
            
            // Mettre à jour l'état avec le logo
            updateState('invoice.company.logo', {
                file: logoFile,
                dataUrl: logoDataUrl,
                name: logoFile.name,
                size: logoFile.size,
                type: logoFile.type
            });
            
            // Mettre à jour l'affichage du logo
            this.updateLogoDisplay(logoDataUrl);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'upload du logo:', error);
            return false;
        }
    }
    
    /**
     * Valide le fichier logo
     * @param {File} file - Fichier à valider
     * @returns {boolean} True si le fichier est valide
     */
    validateLogoFile(file) {
        // Vérifier que c'est bien un fichier
        if (!file || !(file instanceof File)) {
            return false;
        }
        
        // Vérifier le type MIME
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            return false;
        }
        
        // Vérifier la taille (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Convertit un fichier en Data URL
     * @param {File} file - Fichier à convertir
     * @returns {Promise<string>} Data URL du fichier
     */
    fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            
            reader.onerror = (error) => {
                reject(error);
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    /**
     * Met à jour l'affichage du logo dans la prévisualisation
     * @param {string} logoDataUrl - Data URL du logo
     */
    updateLogoDisplay(logoDataUrl) {
        const logoDisplay = document.getElementById('company-logo-display');
        if (logoDisplay) {
            logoDisplay.style.backgroundImage = `url(${logoDataUrl})`;
            logoDisplay.style.backgroundSize = 'contain';
            logoDisplay.style.backgroundRepeat = 'no-repeat';
            logoDisplay.style.backgroundPosition = 'center';
            logoDisplay.textContent = ''; // Supprimer le texte placeholder
            logoDisplay.classList.add('has-logo');
            logoDisplay.classList.remove('loading');
        }
    }
    
    /**
     * Supprime le logo
     */
    removeLogo() {
        updateState('invoice.company.logo', null);
        
        const logoDisplay = document.getElementById('company-logo-display');
        if (logoDisplay) {
            logoDisplay.style.backgroundImage = '';
            logoDisplay.textContent = 'Logo';
            logoDisplay.classList.remove('has-logo', 'loading');
        }
    }
    
    /**
     * Obtient les informations du logo actuel
     * @returns {Object|null} Informations du logo ou null
     */
    getCurrentLogo() {
        return this.state.invoice.company.logo || null;
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