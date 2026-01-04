/**
 * Calculateur pour les prestations horaires
 * Gère les calculs spécifiques aux services facturés à l'heure
 */

class HourlyCalculator {
    /**
     * Calcule le total d'une prestation horaire
     * @param {number} hours - Nombre d'heures
     * @param {number} hourlyRate - Taux horaire
     * @returns {number} Total de la prestation
     */
    static calculateHourlyTotal(hours, hourlyRate) {
        if (hours <= 0 || hourlyRate < 0) return 0;
        return hours * hourlyRate;
    }
    
    /**
     * Calcule le sous-total de toutes les prestations horaires
     * @param {Array} hourlyItems - Liste des prestations horaires
     * @returns {number} Sous-total des prestations
     */
    static calculateHourlySubtotal(hourlyItems) {
        return hourlyItems.reduce((total, item) => {
            return total + this.calculateHourlyTotal(item.hours, item.hourlyRate);
        }, 0);
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HourlyCalculator;
}