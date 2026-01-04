/**
 * Calculateur de totaux généraux
 * Combine les calculs d'articles et de prestations horaires
 */

class TotalCalculator {
    /**
     * Calcule le total TTC final d'une facture
     * @param {Array} items - Articles standards
     * @param {Array} hourlyItems - Prestations horaires
     * @returns {Object} Objet contenant tous les totaux
     */
    static calculateFinalTotals(items, hourlyItems) {
        // Calculs des articles
        const itemsSubtotalHT = ItemCalculator.calculateSubtotal(items);
        const totalDiscount = ItemCalculator.calculateTotalDiscount(items);
        const totalVAT = ItemCalculator.calculateTotalVAT(items);
        
        // Calculs des prestations horaires
        const hourlySubtotal = HourlyCalculator.calculateHourlySubtotal(hourlyItems);
        
        // Totaux combinés
        const subtotalHT = itemsSubtotalHT + hourlySubtotal;
        const totalTTC = subtotalHT + totalVAT;
        
        return {
            subtotalHT,
            totalDiscount,
            totalVAT,
            totalTTC
        };
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TotalCalculator;
}