/**
 * Calculateur pour les articles standards
 * Gère les calculs de quantité, prix, remise et TVA
 */

class ItemCalculator {
    /**
     * Calcule le total d'une ligne d'article
     * @param {number} quantity - Quantité
     * @param {number} unitPrice - Prix unitaire
     * @param {number} discount - Remise en pourcentage (0-100)
     * @param {number} vatRate - Taux de TVA en pourcentage (0-100)
     * @returns {number} Total de la ligne
     */
    static calculateLineTotal(quantity, unitPrice, discount = 0, vatRate = 0) {
        if (quantity <= 0 || unitPrice < 0) return 0;
        if (discount < 0 || discount > 100) discount = 0;
        if (vatRate < 0) vatRate = 0;
        
        const subtotal = quantity * unitPrice;
        const discountAmount = subtotal * (discount / 100);
        const subtotalAfterDiscount = subtotal - discountAmount;
        const vatAmount = subtotalAfterDiscount * (vatRate / 100);
        
        return subtotalAfterDiscount + vatAmount;
    }
    
    /**
     * Calcule le sous-total HT de tous les articles
     * @param {Array} items - Liste des articles
     * @returns {number} Sous-total HT
     */
    static calculateSubtotal(items) {
        return items.reduce((total, item) => {
            const subtotal = item.quantity * item.unitPrice;
            const discountAmount = subtotal * (item.discount / 100);
            return total + (subtotal - discountAmount);
        }, 0);
    }
    
    /**
     * Calcule le total des remises
     * @param {Array} items - Liste des articles
     * @returns {number} Total des remises
     */
    static calculateTotalDiscount(items) {
        return items.reduce((total, item) => {
            const subtotal = item.quantity * item.unitPrice;
            const discountAmount = subtotal * (item.discount / 100);
            return total + discountAmount;
        }, 0);
    }
    
    /**
     * Calcule le total de la TVA
     * @param {Array} items - Liste des articles
     * @returns {number} Total TVA
     */
    static calculateTotalVAT(items) {
        return items.reduce((total, item) => {
            const subtotal = item.quantity * item.unitPrice;
            const discountAmount = subtotal * (item.discount / 100);
            const subtotalAfterDiscount = subtotal - discountAmount;
            const vatAmount = subtotalAfterDiscount * (item.vatRate / 100);
            return total + vatAmount;
        }, 0);
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ItemCalculator;
}