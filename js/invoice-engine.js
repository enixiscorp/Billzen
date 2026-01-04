/**
 * Moteur principal du générateur de factures
 * Initialise et coordonne tous les composants
 */

// Gestionnaires principaux
let invoiceManager;
let themeManager;
let currencyManager;

/**
 * Initialise l'application
 */
function initializeApp() {
    try {
        // Initialisation des gestionnaires
        invoiceManager = new InvoiceManager();
        themeManager = new ThemeManager();
        currencyManager = new CurrencyManager();
        
        // Configuration initiale
        setupInitialState();
        
        // Événements de l'interface (sera implémenté dans les tâches suivantes)
        setupEventListeners();
        
        console.log('Application initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

/**
 * Configure l'état initial
 */
function setupInitialState() {
    const state = getState();
    
    // Génération d'un ID de facture unique
    updateState('invoice.id', generateId());
    updateState('invoice.number', `FAC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`);
    
    console.log('État initial configuré');
}

/**
 * Configure les écouteurs d'événements
 */
function setupEventListeners() {
    // Sera implémenté dans les tâches d'interface utilisateur
    console.log('Écouteurs d\'événements - À implémenter');
}

/**
 * Met à jour l'affichage de la facture
 */
function updateInvoiceDisplay() {
    // Sera implémenté dans les tâches d'interface utilisateur
    console.log('Mise à jour affichage - À implémenter');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', initializeApp);