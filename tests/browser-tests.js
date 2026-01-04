/**
 * Tests pour le générateur de factures - Version navigateur
 */

// Tests pour le gestionnaire d'état
testFramework.test('État global - getState retourne un objet valide', () => {
    const state = getState();
    testFramework.assert(state.invoice, 'L\'état doit contenir une facture');
    testFramework.assert(state.invoice.company, 'La facture doit contenir des informations d\'entreprise');
    testFramework.assert(Array.isArray(state.invoice.items), 'Les articles doivent être un tableau');
    testFramework.assert(Array.isArray(state.invoice.hourlyItems), 'Les prestations horaires doivent être un tableau');
});

testFramework.test('État global - updateState met à jour correctement', () => {
    updateState('invoice.company.name', 'Test Company');
    const state = getState();
    testFramework.assertEqual(state.invoice.company.name, 'Test Company');
});

testFramework.test('État global - generateId génère des IDs uniques', () => {
    const id1 = generateId();
    const id2 = generateId();
    testFramework.assert(id1 !== id2, 'Les IDs doivent être uniques');
    testFramework.assert(typeof id1 === 'string', 'L\'ID doit être une chaîne');
    testFramework.assert(id1.length > 0, 'L\'ID ne doit pas être vide');
});

// Tests pour ItemCalculator
testFramework.test('ItemCalculator - calculateLineTotal basique', () => {
    const total = ItemCalculator.calculateLineTotal(2, 10, 0, 0);
    testFramework.assertEqual(total, 20);
});

testFramework.test('ItemCalculator - calculateLineTotal avec remise', () => {
    const total = ItemCalculator.calculateLineTotal(2, 10, 10, 0); // 10% de remise
    testFramework.assertEqual(total, 18);
});

testFramework.test('ItemCalculator - calculateLineTotal avec TVA', () => {
    const total = ItemCalculator.calculateLineTotal(2, 10, 0, 20); // 20% de TVA
    testFramework.assertEqual(total, 24);
});

testFramework.test('ItemCalculator - calculateLineTotal avec remise et TVA', () => {
    const total = ItemCalculator.calculateLineTotal(2, 10, 10, 20); // 10% remise, 20% TVA
    testFramework.assertAlmostEqual(total, 21.6); // (20 - 2) * 1.2 = 21.6
});

testFramework.test('ItemCalculator - valeurs invalides retournent zéro', () => {
    testFramework.assertEqual(ItemCalculator.calculateLineTotal(0, 10, 0, 0), 0);
    testFramework.assertEqual(ItemCalculator.calculateLineTotal(2, -10, 0, 0), 0);
});

// Tests pour HourlyCalculator
testFramework.test('HourlyCalculator - calculateHourlyTotal basique', () => {
    const total = HourlyCalculator.calculateHourlyTotal(8, 50);
    testFramework.assertEqual(total, 400);
});

testFramework.test('HourlyCalculator - calculateHourlyTotal avec décimales', () => {
    const total = HourlyCalculator.calculateHourlyTotal(7.5, 60);
    testFramework.assertEqual(total, 450);
});

testFramework.test('HourlyCalculator - valeurs invalides retournent zéro', () => {
    testFramework.assertEqual(HourlyCalculator.calculateHourlyTotal(0, 50), 0);
    testFramework.assertEqual(HourlyCalculator.calculateHourlyTotal(8, -50), 0);
});

testFramework.test('HourlyCalculator - calculateHourlySubtotal', () => {
    const hourlyItems = [
        { hours: 8, hourlyRate: 50 },
        { hours: 4, hourlyRate: 75 },
        { hours: 2, hourlyRate: 100 }
    ];
    const subtotal = HourlyCalculator.calculateHourlySubtotal(hourlyItems);
    testFramework.assertEqual(subtotal, 900); // 400 + 300 + 200
});

// Tests de propriétés simplifiés
testFramework.test('Property - ItemCalculator toujours positif', () => {
    testFramework.property(
        () => ({
            quantity: testFramework.randomFloat(0, 100),
            unitPrice: testFramework.randomFloat(0, 1000),
            discount: testFramework.randomFloat(0, 100),
            vatRate: testFramework.randomFloat(0, 50)
        }),
        (data) => {
            const total = ItemCalculator.calculateLineTotal(
                data.quantity, data.unitPrice, data.discount, data.vatRate
            );
            return total >= 0;
        },
        50 // 50 itérations pour les tests de propriétés
    );
});

testFramework.test('Property - HourlyCalculator multiplication correcte', () => {
    testFramework.property(
        () => ({
            hours: testFramework.randomFloat(0.1, 100),
            hourlyRate: testFramework.randomFloat(1, 1000)
        }),
        (data) => {
            const total = HourlyCalculator.calculateHourlyTotal(data.hours, data.hourlyRate);
            const expected = data.hours * data.hourlyRate;
            return Math.abs(total - expected) < 0.01;
        },
        50
    );
});

testFramework.test('Property - generateId génère des IDs uniques', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
        const id = generateId();
        testFramework.assert(!ids.has(id), `ID dupliqué trouvé: ${id}`);
        ids.add(id);
    }
});

// Exécution des tests au chargement
document.addEventListener('DOMContentLoaded', () => {
    console.log('Démarrage des tests...');
    testFramework.runAll().then(() => {
        console.log('Tests terminés');
    });
});