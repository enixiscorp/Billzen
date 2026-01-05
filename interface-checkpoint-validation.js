/**
 * Script de validation pour le point de contrôle de l'interface utilisateur complète
 * Vérifie que tous les éléments de l'interface sont présents et fonctionnels
 */

console.log('🧪 Démarrage de la validation de l\'interface complète...');

// Test 1: Vérification de la structure HTML de base
function testHTMLStructure() {
    console.log('\n📋 Test 1: Structure HTML de base');
    
    const requiredElements = [
        '#app',
        '.app-header', 
        '.app-main',
        '#invoice-container',
        '.invoice-preview',
        '.invoice-controls'
    ];
    
    let passed = 0;
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ ${selector} - Présent`);
            passed++;
        } else {
            console.log(`❌ ${selector} - Manquant`);
        }
    });
    
    return { passed, total: requiredElements.length };
}

// Test 2: Vérification des éléments de prévisualisation
function testPreviewElements() {
    console.log('\n🖼️ Test 2: Éléments de prévisualisation');
    
    const previewElements = [
        '#company-name-display',
        '#company-address-display',
        '#company-phone-display', 
        '#company-email-display',
        '#company-logo-display',
        '#invoice-number-display',
        '#invoice-date-display',
        '#items-list',
        '#hourly-items-list',
        '#subtotal-ht-display',
        '#total-discount-display',
        '#total-vat-display',
        '#total-ttc-display'
    ];
    
    let passed = 0;
    previewElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ ${selector} - Présent`);
            passed++;
        } else {
            console.log(`❌ ${selector} - Manquant`);
        }
    });
    
    return { passed, total: previewElements.length };
}

// Test 3: Vérification des contrôles de saisie
function testInputControls() {
    console.log('\n📝 Test 3: Contrôles de saisie');
    
    const inputElements = [
        // Informations entreprise
        '#company-name',
        '#company-logo',
        '#company-address',
        '#company-phone',
        '#company-email',
        '#legal-info',
        '#invoice-number',
        
        // Articles
        '#item-reference',
        '#item-description',
        '#item-quantity',
        '#item-unit-price',
        '#item-discount',
        '#item-vat',
        '#add-item',
        
        // Prestations horaires
        '#hourly-description',
        '#hourly-hours',
        '#hourly-rate',
        '#add-hourly-item'
    ];
    
    let passed = 0;
    inputElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ ${selector} - Présent`);
            passed++;
        } else {
            console.log(`❌ ${selector} - Manquant`);
        }
    });
    
    return { passed, total: inputElements.length };
}

// Test 4: Vérification des contrôles de personnalisation
function testCustomizationControls() {
    console.log('\n🎨 Test 4: Contrôles de personnalisation');
    
    const customizationElements = [
        '#currency-select',
        '#theme-select',
        '#text-color',
        '#background-color',
        '#primary-color',
        '#accent-color',
        '#header-font',
        '#body-font',
        '#uppercase-toggle',
        '#payment-method',
        '#footer-text'
    ];
    
    let passed = 0;
    customizationElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ ${selector} - Présent`);
            passed++;
        } else {
            console.log(`❌ ${selector} - Manquant`);
        }
    });
    
    return { passed, total: customizationElements.length };
}

// Test 5: Vérification des boutons d'export
function testExportButtons() {
    console.log('\n📤 Test 5: Boutons d\'export');
    
    const exportElements = [
        '#export-pdf',
        '#export-jpg'
    ];
    
    let passed = 0;
    exportElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ ${selector} - Présent`);
            passed++;
        } else {
            console.log(`❌ ${selector} - Manquant`);
        }
    });
    
    return { passed, total: exportElements.length };
}

// Test 6: Vérification des classes JavaScript
function testJavaScriptClasses() {
    console.log('\n⚙️ Test 6: Classes JavaScript');
    
    const classes = [
        'InvoiceManager',
        'ThemeManager', 
        'CurrencyManager',
        'ItemCalculator',
        'HourlyCalculator',
        'TotalCalculator',
        'PDFEngine',
        'ImageEngine'
    ];
    
    let passed = 0;
    classes.forEach(className => {
        try {
            if (typeof window[className] === 'function') {
                console.log(`✅ ${className} - Disponible`);
                passed++;
            } else {
                console.log(`❌ ${className} - Non disponible`);
            }
        } catch (error) {
            console.log(`❌ ${className} - Erreur: ${error.message}`);
        }
    });
    
    return { passed, total: classes.length };
}

// Test 7: Vérification des fonctions globales
function testGlobalFunctions() {
    console.log('\n🌐 Test 7: Fonctions globales');
    
    const functions = [
        'getState',
        'setState', 
        'updateState',
        'generateId'
    ];
    
    let passed = 0;
    functions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`✅ ${funcName} - Disponible`);
            passed++;
        } else {
            console.log(`❌ ${funcName} - Non disponible`);
        }
    });
    
    return { passed, total: functions.length };
}

// Test 8: Tests fonctionnels de base
function testBasicFunctionality() {
    console.log('\n🔧 Test 8: Fonctionnalité de base');
    
    let passed = 0;
    let total = 0;
    
    // Test de l'état initial
    total++;
    try {
        const state = getState();
        if (state && state.invoice && state.invoice.company && Array.isArray(state.invoice.items)) {
            console.log('✅ État initial - Valide');
            passed++;
        } else {
            console.log('❌ État initial - Structure invalide');
        }
    } catch (error) {
        console.log(`❌ État initial - Erreur: ${error.message}`);
    }
    
    // Test du gestionnaire de thèmes
    total++;
    try {
        const themeManager = new ThemeManager();
        const themes = themeManager.getAllThemes();
        const themeCount = Object.keys(themes).length;
        if (themeCount >= 5 && themeCount <= 10) {
            console.log(`✅ Gestionnaire de thèmes - ${themeCount} thèmes disponibles`);
            passed++;
        } else {
            console.log(`⚠️ Gestionnaire de thèmes - ${themeCount} thèmes (attendu: 5-10)`);
        }
    } catch (error) {
        console.log(`❌ Gestionnaire de thèmes - Erreur: ${error.message}`);
    }
    
    // Test du gestionnaire de devises
    total++;
    try {
        const currencyManager = new CurrencyManager();
        const currencies = currencyManager.getAllCurrencies();
        const currencyCount = Object.keys(currencies).length;
        if (currencyCount >= 30) {
            console.log(`✅ Gestionnaire de devises - ${currencyCount} devises disponibles`);
            passed++;
        } else {
            console.log(`⚠️ Gestionnaire de devises - ${currencyCount} devises (attendu: ≥30)`);
        }
    } catch (error) {
        console.log(`❌ Gestionnaire de devises - Erreur: ${error.message}`);
    }
    
    // Test de formatage des devises
    total++;
    try {
        const currencyManager = new CurrencyManager();
        const formatted = currencyManager.formatAmount(1234.56);
        if (typeof formatted === 'string' && formatted.includes('€')) {
            console.log(`✅ Formatage des devises - Exemple: ${formatted}`);
            passed++;
        } else {
            console.log('❌ Formatage des devises - Format invalide');
        }
    } catch (error) {
        console.log(`❌ Formatage des devises - Erreur: ${error.message}`);
    }
    
    return { passed, total };
}

// Fonction principale de validation
function runValidation() {
    console.log('🚀 Validation de l\'interface utilisateur complète');
    console.log('================================================');
    
    const results = [];
    
    results.push(testHTMLStructure());
    results.push(testPreviewElements());
    results.push(testInputControls());
    results.push(testCustomizationControls());
    results.push(testExportButtons());
    results.push(testJavaScriptClasses());
    results.push(testGlobalFunctions());
    results.push(testBasicFunctionality());
    
    // Calcul des totaux
    const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
    const totalTests = results.reduce((sum, result) => sum + result.total, 0);
    const successRate = Math.round((totalPassed / totalTests) * 100);
    
    console.log('\n📊 RÉSUMÉ DE LA VALIDATION');
    console.log('==========================');
    console.log(`Tests réussis: ${totalPassed}/${totalTests} (${successRate}%)`);
    
    if (successRate >= 95) {
        console.log('🎉 Interface complètement fonctionnelle!');
        return 'success';
    } else if (successRate >= 80) {
        console.log('⚠️ Interface largement fonctionnelle avec quelques éléments manquants');
        return 'warning';
    } else {
        console.log('❌ Interface incomplète - des éléments critiques manquent');
        return 'error';
    }
}

// Exporter pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runValidation };
} else {
    // Exécuter automatiquement si dans le navigateur
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runValidation, 1000); // Attendre que tout soit chargé
    });
}