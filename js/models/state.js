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

/**
 * Valide un article
 * @param {Object} item - Article à valider
 * @returns {boolean} True si l'article est valide
 */
function validateItem(item) {
    if (!item) return false;
    
    // Vérifier les champs obligatoires selon les exigences 3.1-3.4
    if (!item.reference || typeof item.reference !== 'string' || item.reference.trim() === '') {
        return false;
    }
    
    if (!item.description || typeof item.description !== 'string' || item.description.trim() === '') {
        return false;
    }
    
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return false;
    }
    
    if (typeof item.unitPrice !== 'number' || item.unitPrice <= 0) {
        return false;
    }
    
    return true;
}

/**
 * Valide une prestation horaire
 * @param {Object} hourlyItem - Prestation horaire à valider
 * @returns {boolean} True si la prestation est valide
 */
function validateHourlyItem(hourlyItem) {
    if (!hourlyItem) return false;
    
    // Vérifier les champs obligatoires selon les exigences 4.1-4.3
    if (!hourlyItem.description || typeof hourlyItem.description !== 'string' || hourlyItem.description.trim() === '') {
        return false;
    }
    
    if (typeof hourlyItem.hours !== 'number' || hourlyItem.hours <= 0) {
        return false;
    }
    
    if (typeof hourlyItem.hourlyRate !== 'number' || hourlyItem.hourlyRate <= 0) {
        return false;
    }
    
    return true;
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getState,
        setState,
        updateState,
        generateId,
        validateItem,
        validateHourlyItem
    };
}