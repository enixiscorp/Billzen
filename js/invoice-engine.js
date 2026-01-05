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
    // Upload de logo d'entreprise
    const logoInput = document.getElementById('company-logo');
    const logoDisplay = document.getElementById('company-logo-display');
    
    if (logoInput) {
        logoInput.addEventListener('change', handleLogoUpload);
    }
    
    // Permettre de cliquer sur la zone de logo pour ouvrir le sélecteur de fichier
    if (logoDisplay && logoInput) {
        logoDisplay.addEventListener('click', () => {
            logoInput.click();
        });
    }
    
    console.log('Écouteurs d\'événements configurés');
}

/**
 * Gère l'upload du logo d'entreprise
 * @param {Event} event - Événement de changement de fichier
 */
async function handleLogoUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        // Aucun fichier sélectionné, supprimer le logo existant
        invoiceManager.removeLogo();
        return;
    }
    
    try {
        // Afficher un indicateur de chargement (optionnel)
        showLogoLoadingState();
        
        // Uploader le logo via le gestionnaire
        const success = await invoiceManager.uploadLogo(file);
        
        if (success) {
            console.log('Logo uploadé avec succès:', file.name);
            showLogoSuccessState();
        } else {
            console.error('Échec de l\'upload du logo');
            showLogoErrorState('Erreur lors de l\'upload du logo. Vérifiez le format et la taille du fichier.');
            // Réinitialiser l'input
            event.target.value = '';
        }
    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
        showLogoErrorState('Erreur inattendue lors de l\'upload du logo.');
        // Réinitialiser l'input
        event.target.value = '';
    }
}

/**
 * Affiche l'état de chargement du logo
 */
function showLogoLoadingState() {
    const logoDisplay = document.getElementById('company-logo-display');
    if (logoDisplay) {
        logoDisplay.classList.add('loading');
        logoDisplay.textContent = 'Chargement...';
    }
}

/**
 * Affiche l'état de succès du logo
 */
function showLogoSuccessState() {
    const logoDisplay = document.getElementById('company-logo-display');
    if (logoDisplay) {
        logoDisplay.classList.remove('loading');
        logoDisplay.textContent = '';
    }
}

/**
 * Affiche l'état d'erreur du logo
 * @param {string} message - Message d'erreur à afficher
 */
function showLogoErrorState(message) {
    const logoDisplay = document.getElementById('company-logo-display');
    if (logoDisplay) {
        logoDisplay.classList.remove('loading', 'has-logo');
        logoDisplay.style.backgroundImage = '';
        logoDisplay.textContent = 'Logo';
    }
    
    // Afficher le message d'erreur (peut être amélioré avec une notification)
    alert(message);
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