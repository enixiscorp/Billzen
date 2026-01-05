/**
 * Tests de propriété pour le système réactif
 * Valide la réactivité des calculs selon les exigences 5.5
 */

// Import du framework de test
if (typeof require !== 'undefined') {
    const fc = require('fast-check');
    const ReactiveSystem = require('../js/reactive-system.js');
}

/**
 * Générateurs pour les tests de propriété
 */
const generators = {
    /**
     * Générateur d'article valide
     */
    validItem: () => fc.record({
        id: fc.string({ minLength: 1, maxLength: 20 }),
        reference: fc.string({ minLength: 1, maxLength: 50 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        quantity: fc.float({ min: 0.01, max: 1000 }),
        unitPrice: fc.float({ min: 0.01, max: 10000 }),
        discount: fc.float({ min: 0, max: 100 }),
        vatRate: fc.float({ min: 0, max: 50 })
    }),
    
    /**
     * Générateur de prestation horaire valide
     */
    validHourlyItem: () => fc.record({
        id: fc.string({ minLength: 1, maxLength: 20 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        hours: fc.float({ min: 0.1, max: 1000 }),
        hourlyRate: fc.float({ min: 1, max: 1000 })
    }),
    
    /**
     * Générateur de liste d'articles
     */
    itemList: () => fc.array(generators.validItem(), { minLength: 0, maxLength: 20 }),
    
    /**
     * Générateur de liste de prestations horaires
     */
    hourlyItemList: () => fc.array(generators.validHourlyItem(), { minLength: 0, maxLength: 20 })
};

/**
 * Tests de propriété pour la réactivité des calculs
 * **Feature: invoice-generator, Property 12: Réactivité des calculs**
 * **Valide: Exigences 5.5**
 */

/**
 * Propriété 12: Réactivité des calculs
 * Pour toute modification d'un élément de facture, tous les totaux doivent être recalculés et mis à jour immédiatement
 */
function testCalculationReactivity() {
    console.log('Test de la propriété 12: Réactivité des calculs');
    
    fc.assert(fc.property(
        generators.itemList(),
        generators.hourlyItemList(),
        generators.validItem(),
        (initialItems, initialHourlyItems, newItem) => {
            // Simuler l'état initial
            const initialState = {
                invoice: {
                    items: initialItems,
                    hourlyItems: initialHourlyItems,
                    totals: { subtotalHT: 0, totalDiscount: 0, totalVAT: 0, totalTTC: 0 }
                }
            };
            
            // Calculer les totaux initiaux
            const initialTotals = TotalCalculator.calculateFinalTotals(initialItems, initialHourlyItems);
            
            // Ajouter un nouvel article
            const updatedItems = [...initialItems, newItem];
            
            // Calculer les nouveaux totaux
            const updatedTotals = TotalCalculator.calculateFinalTotals(updatedItems, initialHourlyItems);
            
            // Vérifier que les totaux ont changé de manière cohérente
            const itemLineTotal = ItemCalculator.calculateLineTotal(
                newItem.quantity,
                newItem.unitPrice,
                newItem.discount,
                newItem.vatRate
            );
            
            const itemSubtotal = newItem.quantity * newItem.unitPrice;
            const itemDiscount = itemSubtotal * (newItem.discount / 100);
            const itemSubtotalAfterDiscount = itemSubtotal - itemDiscount;
            const itemVAT = itemSubtotalAfterDiscount * (newItem.vatRate / 100);
            
            // Les totaux doivent refléter l'ajout du nouvel article
            const expectedSubtotalHT = initialTotals.subtotalHT + itemSubtotalAfterDiscount;
            const expectedTotalDiscount = initialTotals.totalDiscount + itemDiscount;
            const expectedTotalVAT = initialTotals.totalVAT + itemVAT;
            const expectedTotalTTC = expectedSubtotalHT + expectedTotalVAT;
            
            // Vérifier avec une tolérance pour les erreurs de précision flottante
            const tolerance = 0.01;
            
            return Math.abs(updatedTotals.subtotalHT - expectedSubtotalHT) < tolerance &&
                   Math.abs(updatedTotals.totalDiscount - expectedTotalDiscount) < tolerance &&
                   Math.abs(updatedTotals.totalVAT - expectedTotalVAT) < tolerance &&
                   Math.abs(updatedTotals.totalTTC - expectedTotalTTC) < tolerance;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Propriété 12 validée: Les calculs sont réactifs aux modifications');
}

/**
 * Test de la réactivité des modifications d'articles existants
 */
function testItemModificationReactivity() {
    console.log('Test de la réactivité aux modifications d\'articles');
    
    fc.assert(fc.property(
        generators.itemList().filter(items => items.length > 0),
        fc.float({ min: 0.01, max: 1000 }),
        fc.float({ min: 0.01, max: 10000 }),
        (items, newQuantity, newUnitPrice) => {
            if (items.length === 0) return true;
            
            // Calculer les totaux initiaux
            const initialTotals = TotalCalculator.calculateFinalTotals(items, []);
            
            // Modifier le premier article
            const modifiedItems = [...items];
            const originalItem = modifiedItems[0];
            modifiedItems[0] = {
                ...originalItem,
                quantity: newQuantity,
                unitPrice: newUnitPrice
            };
            
            // Calculer les nouveaux totaux
            const updatedTotals = TotalCalculator.calculateFinalTotals(modifiedItems, []);
            
            // Calculer la différence attendue
            const originalLineSubtotal = originalItem.quantity * originalItem.unitPrice;
            const originalDiscount = originalLineSubtotal * (originalItem.discount / 100);
            const originalSubtotalAfterDiscount = originalLineSubtotal - originalDiscount;
            const originalVAT = originalSubtotalAfterDiscount * (originalItem.vatRate / 100);
            
            const newLineSubtotal = newQuantity * newUnitPrice;
            const newDiscount = newLineSubtotal * (originalItem.discount / 100);
            const newSubtotalAfterDiscount = newLineSubtotal - newDiscount;
            const newVAT = newSubtotalAfterDiscount * (originalItem.vatRate / 100);
            
            const expectedSubtotalHT = initialTotals.subtotalHT - originalSubtotalAfterDiscount + newSubtotalAfterDiscount;
            const expectedTotalDiscount = initialTotals.totalDiscount - originalDiscount + newDiscount;
            const expectedTotalVAT = initialTotals.totalVAT - originalVAT + newVAT;
            const expectedTotalTTC = expectedSubtotalHT + expectedTotalVAT;
            
            // Vérifier avec tolérance
            const tolerance = 0.01;
            
            return Math.abs(updatedTotals.subtotalHT - expectedSubtotalHT) < tolerance &&
                   Math.abs(updatedTotals.totalDiscount - expectedTotalDiscount) < tolerance &&
                   Math.abs(updatedTotals.totalVAT - expectedTotalVAT) < tolerance &&
                   Math.abs(updatedTotals.totalTTC - expectedTotalTTC) < tolerance;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Réactivité aux modifications d\'articles validée');
}

/**
 * Test de la réactivité des prestations horaires
 */
function testHourlyItemReactivity() {
    console.log('Test de la réactivité des prestations horaires');
    
    fc.assert(fc.property(
        generators.hourlyItemList(),
        generators.validHourlyItem(),
        (initialHourlyItems, newHourlyItem) => {
            // Calculer les totaux initiaux
            const initialTotals = TotalCalculator.calculateFinalTotals([], initialHourlyItems);
            
            // Ajouter une nouvelle prestation
            const updatedHourlyItems = [...initialHourlyItems, newHourlyItem];
            
            // Calculer les nouveaux totaux
            const updatedTotals = TotalCalculator.calculateFinalTotals([], updatedHourlyItems);
            
            // Calculer la différence attendue
            const hourlyTotal = HourlyCalculator.calculateHourlyTotal(newHourlyItem.hours, newHourlyItem.hourlyRate);
            const expectedSubtotalHT = initialTotals.subtotalHT + hourlyTotal;
            const expectedTotalTTC = expectedSubtotalHT + initialTotals.totalVAT; // Les prestations horaires n'ont pas de TVA dans ce modèle
            
            // Vérifier avec tolérance
            const tolerance = 0.01;
            
            return Math.abs(updatedTotals.subtotalHT - expectedSubtotalHT) < tolerance &&
                   updatedTotals.totalDiscount === initialTotals.totalDiscount && // Pas de remise sur les prestations
                   updatedTotals.totalVAT === initialTotals.totalVAT && // Pas de TVA sur les prestations
                   Math.abs(updatedTotals.totalTTC - expectedTotalTTC) < tolerance;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Réactivité des prestations horaires validée');
}

/**
 * Test de la cohérence des calculs mixtes (articles + prestations)
 */
function testMixedCalculationReactivity() {
    console.log('Test de la réactivité des calculs mixtes');
    
    fc.assert(fc.property(
        generators.itemList(),
        generators.hourlyItemList(),
        (items, hourlyItems) => {
            // Calculer les totaux avec les deux types d'éléments
            const totals = TotalCalculator.calculateFinalTotals(items, hourlyItems);
            
            // Calculer séparément pour vérification
            const itemsSubtotal = ItemCalculator.calculateSubtotal(items);
            const itemsDiscount = ItemCalculator.calculateTotalDiscount(items);
            const itemsVAT = ItemCalculator.calculateTotalVAT(items);
            const hourlySubtotal = HourlyCalculator.calculateHourlySubtotal(hourlyItems);
            
            const expectedSubtotalHT = itemsSubtotal + hourlySubtotal;
            const expectedTotalTTC = expectedSubtotalHT + itemsVAT;
            
            // Vérifier la cohérence
            const tolerance = 0.01;
            
            return Math.abs(totals.subtotalHT - expectedSubtotalHT) < tolerance &&
                   Math.abs(totals.totalDiscount - itemsDiscount) < tolerance &&
                   Math.abs(totals.totalVAT - itemsVAT) < tolerance &&
                   Math.abs(totals.totalTTC - expectedTotalTTC) < tolerance;
        }
    ), { numRuns: 100 });
    
    console.log('✓ Cohérence des calculs mixtes validée');
}

/**
 * Exécution de tous les tests de propriété
 */
function runReactivityPropertyTests() {
    console.log('=== Tests de Propriété: Réactivité des Calculs ===');
    console.log('**Feature: invoice-generator, Property 12: Réactivité des calculs**');
    console.log('**Valide: Exigences 5.5**');
    console.log('');
    
    try {
        testCalculationReactivity();
        testItemModificationReactivity();
        testHourlyItemReactivity();
        testMixedCalculationReactivity();
        
        console.log('');
        console.log('✅ Tous les tests de réactivité des calculs ont réussi');
        return true;
    } catch (error) {
        console.error('❌ Échec des tests de réactivité:', error.message);
        return false;
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runReactivityPropertyTests,
        testCalculationReactivity,
        testItemModificationReactivity,
        testHourlyItemReactivity,
        testMixedCalculationReactivity,
        generators
    };
}

// Exécution automatique si le fichier est chargé directement
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Attendre que tous les scripts soient chargés
        setTimeout(runReactivityPropertyTests, 1000);
    });
}