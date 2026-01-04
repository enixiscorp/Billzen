/**
 * Gestionnaire de devises
 * Gère les devises et le formatage des montants selon ISO 4217
 */

class CurrencyManager {
    constructor() {
        this.currencies = {};
        this.currentCurrency = 'EUR';
        this.loadCurrencies();
    }
    
    /**
     * Charge les devises ISO 4217 complètes
     */
    loadCurrencies() {
        this.currencies = {
            // Devises principales
            'EUR': {
                code: 'EUR',
                symbol: '€',
                name: 'Euro',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'USD': {
                code: 'USD',
                symbol: '$',
                name: 'US Dollar',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'GBP': {
                code: 'GBP',
                symbol: '£',
                name: 'British Pound',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'JPY': {
                code: 'JPY',
                symbol: '¥',
                name: 'Japanese Yen',
                symbolPosition: 'left',
                decimalPlaces: 0,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'CHF': {
                code: 'CHF',
                symbol: 'CHF',
                name: 'Swiss Franc',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: "'",
                decimalSeparator: '.'
            },
            'CAD': {
                code: 'CAD',
                symbol: 'C$',
                name: 'Canadian Dollar',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'AUD': {
                code: 'AUD',
                symbol: 'A$',
                name: 'Australian Dollar',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'CNY': {
                code: 'CNY',
                symbol: '¥',
                name: 'Chinese Yuan',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'SEK': {
                code: 'SEK',
                symbol: 'kr',
                name: 'Swedish Krona',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'NOK': {
                code: 'NOK',
                symbol: 'kr',
                name: 'Norwegian Krone',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'DKK': {
                code: 'DKK',
                symbol: 'kr',
                name: 'Danish Krone',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: '.',
                decimalSeparator: ','
            },
            'PLN': {
                code: 'PLN',
                symbol: 'zł',
                name: 'Polish Zloty',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'CZK': {
                code: 'CZK',
                symbol: 'Kč',
                name: 'Czech Koruna',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'HUF': {
                code: 'HUF',
                symbol: 'Ft',
                name: 'Hungarian Forint',
                symbolPosition: 'right',
                decimalPlaces: 0,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'RUB': {
                code: 'RUB',
                symbol: '₽',
                name: 'Russian Ruble',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'BRL': {
                code: 'BRL',
                symbol: 'R$',
                name: 'Brazilian Real',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: '.',
                decimalSeparator: ','
            },
            'MXN': {
                code: 'MXN',
                symbol: '$',
                name: 'Mexican Peso',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'INR': {
                code: 'INR',
                symbol: '₹',
                name: 'Indian Rupee',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'KRW': {
                code: 'KRW',
                symbol: '₩',
                name: 'South Korean Won',
                symbolPosition: 'left',
                decimalPlaces: 0,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'SGD': {
                code: 'SGD',
                symbol: 'S$',
                name: 'Singapore Dollar',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'HKD': {
                code: 'HKD',
                symbol: 'HK$',
                name: 'Hong Kong Dollar',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'NZD': {
                code: 'NZD',
                symbol: 'NZ$',
                name: 'New Zealand Dollar',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'ZAR': {
                code: 'ZAR',
                symbol: 'R',
                name: 'South African Rand',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: '.'
            },
            'TRY': {
                code: 'TRY',
                symbol: '₺',
                name: 'Turkish Lira',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: '.',
                decimalSeparator: ','
            },
            'ILS': {
                code: 'ILS',
                symbol: '₪',
                name: 'Israeli Shekel',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'AED': {
                code: 'AED',
                symbol: 'د.إ',
                name: 'UAE Dirham',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'SAR': {
                code: 'SAR',
                symbol: '﷼',
                name: 'Saudi Riyal',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'EGP': {
                code: 'EGP',
                symbol: '£',
                name: 'Egyptian Pound',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'MAD': {
                code: 'MAD',
                symbol: 'د.م.',
                name: 'Moroccan Dirham',
                symbolPosition: 'right',
                decimalPlaces: 2,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'TND': {
                code: 'TND',
                symbol: 'د.ت',
                name: 'Tunisian Dinar',
                symbolPosition: 'right',
                decimalPlaces: 3,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'NGN': {
                code: 'NGN',
                symbol: '₦',
                name: 'Nigerian Naira',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'KES': {
                code: 'KES',
                symbol: 'KSh',
                name: 'Kenyan Shilling',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'GHS': {
                code: 'GHS',
                symbol: '₵',
                name: 'Ghanaian Cedi',
                symbolPosition: 'left',
                decimalPlaces: 2,
                thousandsSeparator: ',',
                decimalSeparator: '.'
            },
            'XOF': {
                code: 'XOF',
                symbol: 'CFA',
                name: 'West African CFA Franc',
                symbolPosition: 'right',
                decimalPlaces: 0,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            },
            'XAF': {
                code: 'XAF',
                symbol: 'FCFA',
                name: 'Central African CFA Franc',
                symbolPosition: 'right',
                decimalPlaces: 0,
                thousandsSeparator: ' ',
                decimalSeparator: ','
            }
        };
    }
    
    /**
     * Définit la devise courante
     * @param {string} currencyCode - Code de la devise
     * @returns {boolean} True si la devise a été définie avec succès
     */
    setCurrency(currencyCode) {
        if (this.currencies[currencyCode]) {
            this.currentCurrency = currencyCode;
            return true;
        }
        return false;
    }
    
    /**
     * Obtient la devise courante
     * @returns {Object} Objet devise courante
     */
    getCurrentCurrency() {
        return this.currencies[this.currentCurrency];
    }
    
    /**
     * Obtient toutes les devises disponibles
     * @returns {Object} Toutes les devises
     */
    getAllCurrencies() {
        return this.currencies;
    }
    
    /**
     * Vérifie si une devise existe
     * @param {string} currencyCode - Code de la devise
     * @returns {boolean} True si la devise existe
     */
    currencyExists(currencyCode) {
        return this.currencies.hasOwnProperty(currencyCode);
    }
    
    /**
     * Formate un montant selon la devise courante
     * @param {number} amount - Montant à formater
     * @returns {string} Montant formaté
     */
    formatAmount(amount) {
        const currency = this.getCurrentCurrency();
        if (!currency) return amount.toString();
        
        // Arrondir selon les décimales de la devise
        const roundedAmount = Math.round(amount * Math.pow(10, currency.decimalPlaces)) / Math.pow(10, currency.decimalPlaces);
        
        // Formater le nombre avec les séparateurs
        const formattedNumber = this.formatNumber(roundedAmount, currency);
        
        // Ajouter le symbole selon la position
        if (currency.symbolPosition === 'left') {
            return `${currency.symbol}${formattedNumber}`;
        } else {
            return `${formattedNumber} ${currency.symbol}`;
        }
    }
    
    /**
     * Formate un nombre selon les conventions de la devise
     * @param {number} number - Nombre à formater
     * @param {Object} currency - Objet devise
     * @returns {string} Nombre formaté
     */
    formatNumber(number, currency) {
        const parts = number.toFixed(currency.decimalPlaces).split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];
        
        // Ajouter les séparateurs de milliers
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, currency.thousandsSeparator);
        
        // Retourner avec ou sans partie décimale
        if (currency.decimalPlaces === 0) {
            return formattedInteger;
        } else {
            return `${formattedInteger}${currency.decimalSeparator}${decimalPart}`;
        }
    }
    
    /**
     * Obtient la position du symbole monétaire
     * @returns {string} 'left' ou 'right'
     */
    getSymbolPosition() {
        const currency = this.getCurrentCurrency();
        return currency ? currency.symbolPosition : 'right';
    }
    
    /**
     * Obtient le symbole de la devise courante
     * @returns {string} Symbole de la devise
     */
    getCurrentSymbol() {
        const currency = this.getCurrentCurrency();
        return currency ? currency.symbol : '€';
    }
    
    /**
     * Parse un montant formaté en nombre
     * @param {string} formattedAmount - Montant formaté
     * @returns {number} Montant en nombre
     */
    parseAmount(formattedAmount) {
        const currency = this.getCurrentCurrency();
        if (!currency) return 0;
        
        // Supprimer le symbole
        let cleanAmount = formattedAmount.replace(currency.symbol, '').trim();
        
        // Remplacer les séparateurs
        cleanAmount = cleanAmount.replace(new RegExp('\\' + currency.thousandsSeparator, 'g'), '');
        cleanAmount = cleanAmount.replace(currency.decimalSeparator, '.');
        
        return parseFloat(cleanAmount) || 0;
    }
    
    /**
     * Obtient la liste des codes de devises triés
     * @returns {Array} Liste des codes de devises
     */
    getCurrencyCodes() {
        return Object.keys(this.currencies).sort();
    }
    
    /**
     * Obtient les informations d'une devise spécifique
     * @param {string} currencyCode - Code de la devise
     * @returns {Object|null} Informations de la devise ou null
     */
    getCurrencyInfo(currencyCode) {
        return this.currencies[currencyCode] || null;
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CurrencyManager;
}