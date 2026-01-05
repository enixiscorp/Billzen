/**
 * Script de validation de l'interface utilisateur
 * Point de contrôle pour vérifier que tous les composants fonctionnent
 */

console.log('🧪 Validation de l\'interface utilisateur - Point de contrôle');
console.log('='.repeat(60));

// Fonction utilitaire pour les tests
function testElement(selector, name) {
    const element = document.querySelector(selector);
    if (element) {
        console.log(`✅ ${name}: OK`);
        return true;
    } else {
        console.log(`❌ ${name}: MANQUANT (${selector})`);
        return false;
    }
}

function testClass(className, name) {
    try {
        const instance = new window[className]();
        console.log(`✅ ${name}: OK`);
        return true;
    } catch (error) {
        console.log(`❌ ${name}: ERREUR (${error.message})`);
        return false;
    }
}

function testFunction(funcName, name) {
    if (typeof window[funcName] === 'function') {
        console.log(`✅ ${name}: OK`);
        return true;
    } else {
        console.log(`❌ ${name}: MANQUANT`);
        return false;
    }
}

// Variables pour compter les résultats
let totalTests = 0;
let passedTests = 0;

function runTest(testFunc, ...args) {
    totalTests++;
    if (testFunc(...args)) {
        passedTests++;
    }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('\n📋 1. STRUCTURE HTML DE BASE');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#app', 'Container principal');
    runTest(testElement, '.app-header', 'En-tête application');
    runTest(testElement, '.app-main', 'Zone principale');
    runTest(testElement, '#invoice-container', 'Container de facture');
    runTest(testElement, '.invoice-preview', 'Zone de prévisualisation');
    runTest(testElement, '.invoice-controls', 'Zone de contrôles');

    console.log('\n🏢 2. INFORMATIONS ENTREPRISE');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#company-name', 'Champ nom entreprise');
    runTest(testElement, '#company-logo', 'Upload logo');
    runTest(testElement, '#company-address', 'Champ adresse');
    runTest(testElement, '#company-phone', 'Champ téléphone');
    runTest(testElement, '#company-email', 'Champ email');
    runTest(testElement, '#legal-info', 'Champ infos légales');
    runTest(testElement, '#invoice-number', 'Champ numéro facture');

    console.log('\n📄 3. AFFICHAGE FACTURE');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#company-name-display', 'Affichage nom entreprise');
    runTest(testElement, '#company-address-display', 'Affichage adresse');
    runTest(testElement, '#company-phone-display', 'Affichage téléphone');
    runTest(testElement, '#company-email-display', 'Affichage email');
    runTest(testElement, '#company-logo-display', 'Affichage logo');
    runTest(testElement, '#invoice-number-display', 'Affichage numéro facture');
    runTest(testElement, '#invoice-date-display', 'Affichage date facture');

    console.log('\n📦 4. GESTION ARTICLES');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#item-reference', 'Champ référence article');
    runTest(testElement, '#item-description', 'Champ description article');
    runTest(testElement, '#item-quantity', 'Champ quantité');
    runTest(testElement, '#item-unit-price', 'Champ prix unitaire');
    runTest(testElement, '#item-discount', 'Champ remise');
    runTest(testElement, '#item-vat', 'Champ TVA');
    runTest(testElement, '#add-item', 'Bouton ajouter article');
    runTest(testElement, '#items-list', 'Liste des articles');

    console.log('\n⏰ 5. PRESTATIONS HORAIRES');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#hourly-description', 'Champ description prestation');
    runTest(testElement, '#hourly-hours', 'Champ heures');
    runTest(testElement, '#hourly-rate', 'Champ taux horaire');
    runTest(testElement, '#add-hourly-item', 'Bouton ajouter prestation');
    runTest(testElement, '#hourly-items-list', 'Liste des prestations');

    console.log('\n💰 6. TOTAUX');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#subtotal-ht-display', 'Affichage sous-total HT');
    runTest(testElement, '#total-discount-display', 'Affichage total remises');
    runTest(testElement, '#total-vat-display', 'Affichage total TVA');
    runTest(testElement, '#total-ttc-display', 'Affichage total TTC');

    console.log('\n🎨 7. PERSONNALISATION');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#currency-select', 'Sélecteur devise');
    runTest(testElement, '#theme-select', 'Sélecteur thème');
    runTest(testElement, '#text-color', 'Sélecteur couleur texte');
    runTest(testElement, '#background-color', 'Sélecteur couleur fond');
    runTest(testElement, '#primary-color', 'Sélecteur couleur primaire');
    runTest(testElement, '#accent-color', 'Sélecteur couleur accent');
    runTest(testElement, '#header-font', 'Sélecteur police en-tête');
    runTest(testElement, '#body-font', 'Sélecteur police corps');
    runTest(testElement, '#uppercase-toggle', 'Toggle majuscules');

    console.log('\n📤 8. EXPORT');
    console.log('-'.repeat(40));
    
    runTest(testElement, '#export-pdf', 'Bouton export PDF');
    runTest(testElement, '#export-jpg', 'Bouton export JPG');

    console.log('\n⚙️ 9. CLASSES JAVASCRIPT');
    console.log('-'.repeat(40));
    
    runTest(testClass, 'InvoiceManager', 'Gestionnaire de factures');
    runTest(testClass, 'ThemeManager', 'Gestionnaire de thèmes');
    runTest(testClass, 'CurrencyManager', 'Gestionnaire de devises');
    runTest(testClass, 'ItemCalculator', 'Calculateur d\'articles');
    runTest(testClass, 'HourlyCalculator', 'Calculateur horaire');
    runTest(testClass, 'TotalCalculator', 'Calculateur de totaux');
    runTest(testClass, 'PDFEngine', 'Moteur PDF');
    runTest(testClass, 'ImageEngine', 'Moteur d\'images');

    console.log('\n🔧 10. FONCTIONS GLOBALES');
    console.log('-'.repeat(40));
    
    runTest(testFunction, 'getState', 'Fonction getState');
    runTest(testFunction, 'setState', 'Fonction setState');
    runTest(testFunction, 'updateState', 'Fonction updateState');
    runTest(testFunction, 'generateId', 'Fonction generateId');

    console.log('\n🧪 11. TESTS FONCTIONNELS');
    console.log('-'.repeat(40));

    // Test de l'état initial
    try {
        const state = getState();
        if (state && state.invoice && state.invoice.company && Array.isArray(state.invoice.items)) {
            console.log('✅ État initial: OK');
            passedTests++;
        } else {
            console.log('❌ État initial: Structure invalide');
        }
        totalTests++;
    } catch (error) {
        console.log(`❌ État initial: ERREUR (${error.message})`);
        totalTests++;
    }

    // Test des thèmes
    try {
        const themeManager = new ThemeManager();
        const themes = themeManager.getAllThemes();
        const themeCount = Object.keys(themes).length;
        if (themeCount >= 5 && themeCount <= 10) {
            console.log(`✅ Nombre de thèmes: OK (${themeCount} thèmes)`);
            passedTests++;
        } else {
            console.log(`⚠️ Nombre de thèmes: ${themeCount} (attendu: 5-10)`);
        }
        totalTests++;
    } catch (error) {
        console.log(`❌ Test thèmes: ERREUR (${error.message})`);
        totalTests++;
    }

    // Test des devises
    try {
        const currencyManager = new CurrencyManager();
        const currencies = currencyManager.getAllCurrencies();
        const currencyCount = Object.keys(currencies).length;
        if (currencyCount >= 30) {
            console.log(`✅ Devises ISO 4217: OK (${currencyCount} devises)`);
            passedTests++;
        } else {
            console.log(`⚠️ Devises ISO 4217: ${currencyCount} (attendu: ≥30)`);
        }
        totalTests++;
    } catch (error) {
        console.log(`❌ Test devises: ERREUR (${error.message})`);
        totalTests++;
    }

    // Test de formatage
    try {
        const currencyManager = new CurrencyManager();
        const formatted = currencyManager.formatAmount(1234.56);
        if (typeof formatted === 'string' && formatted.includes('€')) {
            console.log(`✅ Formatage devise: OK (${formatted})`);
            passedTests++;
        } else {
            console.log('❌ Formatage devise: Format invalide');
        }
        totalTests++;
    } catch (error) {
        console.log(`❌ Formatage devise: ERREUR (${error.message})`);
        totalTests++;
    }

    // Résumé final
    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ DES TESTS');
    console.log('='.repeat(60));
    console.log(`Total des tests: ${totalTests}`);
    console.log(`Tests réussis: ${passedTests}`);
    console.log(`Tests échoués: ${totalTests - passedTests}`);
    console.log(`Taux de réussite: ${Math.round((passedTests / totalTests) * 100)}%`);

    if (passedTests === totalTests) {
        console.log('\n🎉 INTERFACE COMPLÈTEMENT FONCTIONNELLE!');
        console.log('Tous les composants sont présents et opérationnels.');
    } else if (passedTests / totalTests >= 0.8) {
        console.log('\n⚠️ INTERFACE MAJORITAIREMENT FONCTIONNELLE');
        console.log('La plupart des composants sont présents, quelques éléments à finaliser.');
    } else {
        console.log('\n❌ INTERFACE INCOMPLÈTE');
        console.log('Plusieurs composants manquent ou ne fonctionnent pas correctement.');
    }

    console.log('\n📝 RECOMMANDATIONS:');
    if (passedTests < totalTests) {
        console.log('• Vérifiez que tous les fichiers JavaScript sont correctement chargés');
        console.log('• Testez les fonctionnalités interactives manuellement');
        console.log('• Implémentez les éléments manquants identifiés ci-dessus');
    }
    console.log('• Testez l\'ajout d\'articles et de prestations horaires');
    console.log('• Vérifiez que les calculs se mettent à jour en temps réel');
    console.log('• Testez la personnalisation des thèmes et devises');
    console.log('• Vérifiez l\'upload de logo');

    console.log('\n✅ Point de contrôle terminé!');
});