/**
 * Tests de propriété pour la performance des calculs
 * Valide que les calculs respectent les exigences de performance 9.1
 */

// Import du framework de test
if (typeof require !== 'undefined') {
    const fc = require('fast-check');
}

/**
 * Générateurs pour les tests de performance
 */
const performanceGenerators = {
    /**
     * Générateur d'article valide pour tests de performance
     */
    performanceItem: () => fc.record({
        id: fc.string({ minLength: 1, maxLength: 20 }),
        reference: fc.string({ minLength: 1, maxLength: 50 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        quantity: fc.float({ min: 0.01, max: 1000 }),
        unitPrice: fc.float({ min: 0.01, max: 10000 }),
        discount: fc.float({ min: 0, max: 100 }),
        vatRate: fc.float({ min: 0, max: 50 })
    }),
    
    /**
     * Générateur de prestation horaire pour tests de performance
     */
    performanceHourlyItem: () => fc.record({
        id: fc.string({ minLength: 1, maxLength: 20 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        hours: fc.float({ min: 0.1, max: 1000 }),
        hourlyRate: fc.float({ min: 1, max: 1000 })
    }),
    
    /**
     * Générateur de grande liste d'articles pour tests de charge
     */
    largeItemList: () => fc.array(performanceGenerators.performanceItem(), { minLength: 50, maxLength: 200 }),
    
    /**
     * Générateur de grande liste de prestations horaires
     */
    largeHourlyItemList: () => fc.array(performanceGenerators.performanceHourlyItem(), { minLength: 20, maxLength: 100 })
};

/**
 * Utilitaires de mesure de performance
 */
const PerformanceUtils = {
    /**
     * Mesure le temps d'exécution d'une fonction
     * @param {Function} fn - Fonction à mesurer
     * @returns {Object} Résultat avec temps d'exécution et valeur de retour
     */
    measureTime: (fn) => {
        const startTime = performance.now();
        const result = fn();
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        return {
            result,
            executionTime,
            withinLimit: executionTime < 100 // Exigence 9.1: < 100ms
        };
    },
    
    /**
     * Exécute plusieurs mesures et calcule les statistiques
     * @param {Function} fn - Fonction à mesurer
     * @param {number} iterations - Nombre d'itérations
     * @returns {Object} Statistiques de performance
     */
    measureMultiple: (fn, iterations = 10) => {
        const times = [];
        
        for (let i = 0; i < iterations; i++) {
            const measurement = PerformanceUtils.measureTime(fn);
            times.push(measurement.executionTime);
        }
        
        const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
        const maxTime = Math.max(...times);
        const minTime = Math.min(...times);
        
        return {
            averageTime: avgTime,
            maxTime,
            minTime,
            allWithinLimit: maxTime < 100,
            averageWithinLimit: avgTime < 100,
            times
        };
    }
};

/**
 * Tests de propriété pour la performance des calculs
 * **Feature: invoice-generator, Property 22: Performance des calculs**
 * **Valide: Exigences 9.1**
 */

/**
 * Propriété 22: Performance des calculs
 * Pour tout calcul effectué, le temps de traitement doit être inférieur à 100ms
 */
function testCalculationPerformance() {
    console.log('Test de la propriété 22: Performance des calculs');
    
    fc.assert(fc.property(
        performanceGenerators.largeItemList(),
        performanceGenerators.largeHourlyItemList(),
        (items, hourlyItems) => {
            // Mesurer le temps de calcul des totaux
            const measurement = PerformanceUtils.measureTime(() => {
                return TotalCalculator.calculateFinalTotals(items, hourlyItems);
            });
            
            // Log pour debugging si nécessaire
            if (!measurement.withinLimit) {
                console.log(`⚠️ Calcul lent détecté: ${measurement.executionTime.toFixed(2)}ms pour ${items.length} articles et ${hourlyItems.length} prestations`);
            }
            
            // Le calcul doit être terminé en moins de 100ms (exigence 9.1)
            return measurement.withinLimit;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Propriété 22 validée: Les calculs respectent la limite de 100ms');
}

/**
 * Test de performance pour les calculs d'articles individuels
 */
function testItemCalculationPerformance() {
    console.log('Test de performance des calculs d\'articles');
    
    fc.assert(fc.property(
        performanceGenerators.performanceItem(),
        (item) => {
            // Mesurer le calcul d'une ligne d'article
            const measurement = PerformanceUtils.measureTime(() => {
                return ItemCalculator.calculateLineTotal(
                    item.quantity,
                    item.unitPrice,
                    item.discount,
                    item.vatRate
                );
            });
            
            // Les calculs individuels doivent être très rapides (< 1ms)
            return measurement.executionTime < 1;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Performance des calculs d\'articles validée');
}

/**
 * Test de performance pour les calculs de prestations horaires
 */
function testHourlyCalculationPerformance() {
    console.log('Test de performance des calculs horaires');
    
    fc.assert(fc.property(
        performanceGenerators.performanceHourlyItem(),
        (hourlyItem) => {
            // Mesurer le calcul d'une prestation horaire
            const measurement = PerformanceUtils.measureTime(() => {
                return HourlyCalculator.calculateHourlyTotal(
                    hourlyItem.hours,
                    hourlyItem.hourlyRate
                );
            });
            
            // Les calculs horaires doivent être très rapides (< 1ms)
            return measurement.executionTime < 1;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Performance des calculs horaires validée');
}

/**
 * Test de performance sous charge (nombreux éléments)
 */
function testHighLoadPerformance() {
    console.log('Test de performance sous charge élevée');
    
    // Générer une grande quantité d'éléments
    const largeItemCount = 500;
    const largeHourlyCount = 200;
    
    const largeItems = Array.from({ length: largeItemCount }, (_, i) => ({
        id: `item-${i}`,
        reference: `REF-${i}`,
        description: `Article ${i}`,
        quantity: Math.random() * 100 + 1,
        unitPrice: Math.random() * 1000 + 1,
        discount: Math.random() * 20,
        vatRate: 20
    }));
    
    const largeHourlyItems = Array.from({ length: largeHourlyCount }, (_, i) => ({
        id: `hourly-${i}`,
        description: `Prestation ${i}`,
        hours: Math.random() * 40 + 1,
        hourlyRate: Math.random() * 200 + 50
    }));
    
    // Mesurer les performances avec plusieurs itérations
    const stats = PerformanceUtils.measureMultiple(() => {
        return TotalCalculator.calculateFinalTotals(largeItems, largeHourlyItems);
    }, 20);
    
    console.log(`📊 Statistiques de performance (${largeItemCount} articles, ${largeHourlyCount} prestations):`);
    console.log(`   Temps moyen: ${stats.averageTime.toFixed(2)}ms`);
    console.log(`   Temps max: ${stats.maxTime.toFixed(2)}ms`);
    console.log(`   Temps min: ${stats.minTime.toFixed(2)}ms`);
    
    // Vérifier que même sous charge, les performances restent acceptables
    const withinLimit = stats.maxTime < 100;
    
    if (!withinLimit) {
        console.log(`⚠️ Performance dégradée sous charge: ${stats.maxTime.toFixed(2)}ms > 100ms`);
    }
    
    return withinLimit;
}

/**
 * Test de performance des calculs de sous-totaux
 */
function testSubtotalPerformance() {
    console.log('Test de performance des sous-totaux');
    
    fc.assert(fc.property(
        performanceGenerators.largeItemList(),
        (items) => {
            // Mesurer les différents types de calculs de sous-totaux
            const subtotalMeasurement = PerformanceUtils.measureTime(() => {
                return ItemCalculator.calculateSubtotal(items);
            });
            
            const discountMeasurement = PerformanceUtils.measureTime(() => {
                return ItemCalculator.calculateTotalDiscount(items);
            });
            
            const vatMeasurement = PerformanceUtils.measureTime(() => {
                return ItemCalculator.calculateTotalVAT(items);
            });
            
            // Tous les calculs doivent être rapides
            return subtotalMeasurement.withinLimit && 
                   discountMeasurement.withinLimit && 
                   vatMeasurement.withinLimit;
        }
    ), { numRuns: 50 });
    
    console.log('✓ Performance des calculs de sous-totaux validée');
}

/**
 * Test de performance de la réactivité (simulation de mises à jour fréquentes)
 */
function testReactivityPerformance() {
    console.log('Test de performance de la réactivité');
    
    // Simuler des mises à jour fréquentes comme dans l'interface utilisateur
    const items = Array.from({ length: 50 }, (_, i) => ({
        id: `item-${i}`,
        reference: `REF-${i}`,
        description: `Article ${i}`,
        quantity: 1,
        unitPrice: 100,
        discount: 0,
        vatRate: 20
    }));
    
    // Simuler 100 modifications rapides (comme la saisie utilisateur)
    const updateCount = 100;
    const updateTimes = [];
    
    for (let i = 0; i < updateCount; i++) {
        // Modifier un article aléatoire
        const randomIndex = Math.floor(Math.random() * items.length);
        items[randomIndex].quantity = Math.random() * 10 + 1;
        
        // Mesurer le temps de recalcul
        const measurement = PerformanceUtils.measureTime(() => {
            return TotalCalculator.calculateFinalTotals(items, []);
        });
        
        updateTimes.push(measurement.executionTime);
    }
    
    const avgUpdateTime = updateTimes.reduce((sum, time) => sum + time, 0) / updateTimes.length;
    const maxUpdateTime = Math.max(...updateTimes);
    
    console.log(`📊 Performance de réactivité (${updateCount} mises à jour):`);
    console.log(`   Temps moyen par mise à jour: ${avgUpdateTime.toFixed(2)}ms`);
    console.log(`   Temps max par mise à jour: ${maxUpdateTime.toFixed(2)}ms`);
    
    // Pour la réactivité, on veut des mises à jour encore plus rapides (< 50ms)
    const reactivityLimit = 50;
    const withinReactivityLimit = maxUpdateTime < reactivityLimit;
    
    if (!withinReactivityLimit) {
        console.log(`⚠️ Réactivité dégradée: ${maxUpdateTime.toFixed(2)}ms > ${reactivityLimit}ms`);
    }
    
    return withinReactivityLimit;
}

/**
 * Exécution de tous les tests de performance
 */
function runPerformancePropertyTests() {
    console.log('=== Tests de Propriété: Performance des Calculs ===');
    console.log('**Feature: invoice-generator, Property 22: Performance des calculs**');
    console.log('**Valide: Exigences 9.1**');
    console.log('');
    console.log('Exigence 9.1: Les calculs doivent être effectués instantanément (< 100ms)');
    console.log('');
    
    try {
        testCalculationPerformance();
        testItemCalculationPerformance();
        testHourlyCalculationPerformance();
        testSubtotalPerformance();
        
        console.log('');
        console.log('Tests de charge et réactivité:');
        const highLoadResult = testHighLoadPerformance();
        const reactivityResult = testReactivityPerformance();
        
        console.log('');
        
        if (highLoadResult && reactivityResult) {
            console.log('✅ Tous les tests de performance ont réussi');
            console.log('✅ Les calculs respectent l\'exigence 9.1 (< 100ms)');
            return true;
        } else {
            console.log('⚠️ Certains tests de performance ont révélé des problèmes');
            if (!highLoadResult) {
                console.log('   - Performance dégradée sous charge élevée');
            }
            if (!reactivityResult) {
                console.log('   - Réactivité insuffisante pour l\'interface utilisateur');
            }
            return false;
        }
        
    } catch (error) {
        console.error('❌ Échec des tests de performance:', error.message);
        return false;
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runPerformancePropertyTests,
        testCalculationPerformance,
        testItemCalculationPerformance,
        testHourlyCalculationPerformance,
        testHighLoadPerformance,
        testSubtotalPerformance,
        testReactivityPerformance,
        performanceGenerators,
        PerformanceUtils
    };
}

// Exécution automatique si le fichier est chargé directement
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Attendre que tous les scripts soient chargés
        setTimeout(runPerformancePropertyTests, 1000);
    });
}