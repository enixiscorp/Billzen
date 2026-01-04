/**
 * Gestionnaire d'état global pour le générateur de factures
 * Gère les structures de données et l'état de l'application
 */

// État global de l'application
let globalState = {
    invoice: {
        id: '',
        number: '',
        date: new Date(),
        company: {
            name: '',
            logo: null,
            address: '',
            phone: '',
            email: '',
            legalInfo: ''
        },
        items: [],
        hourlyItems: [],
        totals: {
            subtotalHT: 0,
            totalDiscount: 0,
            totalVAT: 0,
            totalTTC: 0
        },
        theme: 'default',
        currency: 'EUR',
        customization: {
            textColor: '#000000',
            backgroundColor: '#ffffff',
            autoUppercase: false,
            columnTitles: {
                reference: 'Référence',
                description: 'Description',
                quantity: 'Quantité',
                unitPrice: 'Prix unitaire',
                total: 'Total'
            },
            footerText: '',
            paymentMethod: ''
        }
    }
};

/**
 * Obtient l'état global
 * @returns {Object} L'état global
 */
function getState() {
    return globalState;
}

/**
 * Met à jour l'état global
 * @param {Object} newState - Nouvel état
 */
function setState(newState) {
    globalState = { ...globalState, ...newState };
}

/**
 * Met à jour une partie spécifique de l'état
 * @param {string} path - Chemin vers la propriété (ex: 'invoice.company.name')
 * @param {*} value - Nouvelle valeur
 */
function updateState(path, value) {
    const keys = path.split('.');
    let current = globalState;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

/**
 * Génère un nouvel ID unique
 * @returns {string} ID unique
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getState,
        setState,
        updateState,
        generateId
    };
}