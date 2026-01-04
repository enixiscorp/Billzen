/**
 * Tests pour le calculateur d'articles
 */

const { test } = require('node:test');
const assert = require('node:assert');
const { fc, generators } = require('../setup');

// Import du module à tester
const ItemCalculator = require('../../js/calculators/ItemCalculator');

test('ItemCalculator - Tests unitaires', async (t) => {
    await t.test('calculateLineTotal avec valeurs de base', () => {
        const total = ItemCalculator.calculateLineTotal(2, 10, 0, 0);
        assert.strictEqual(total, 20);
    });
    
    await t.test('calculateLineTotal avec remise', () => {
        const total = ItemCalculator.calculateLineTotal(2, 10, 10, 0); // 10% de remise
        assert.strictEqual(total, 18);
    });
    
    await t.test('calculateLineTotal avec TVA', () => {
        const total = ItemCalculator.calculateLineTotal(2, 10, 0, 20); // 20% de TVA
        assert.strictEqual(total, 24);
    });
    
    await t.test('calculateLineTotal avec remise et TVA', () => {
        const total = ItemCalculator.calculateLineTotal(2, 10, 10, 20); // 10% remise, 20% TVA
        assert.strictEqual(total, 21.6); // (20 - 2) * 1.2 = 21.6
    });
    
    await t.test('calculateLineTotal avec quantité zéro retourne zéro', () => {
        const total = ItemCalculator.calculateLineTotal(0, 10, 0, 0);
        assert.strictEqual(total, 0);
    });
    
    await t.test('calculateLineTotal avec prix négatif retourne zéro', () => {
        const total = ItemCalculator.calculateLineTotal(2, -10, 0, 0);
        assert.strictEqual(total, 0);
    });
});

test('ItemCalculator - Tests de propriétés', async (t) => {
    await t.test('Property: calculateLineTotal est toujours positif ou zéro', () => {
        fc.assert(fc.property(
            fc.float({ min: 0, max: 1000, noNaN: true }),
            fc.float({ min: 0, max: 1000, noNaN: true }),
            fc.float({ min: 0, max: 100, noNaN: true }),
            fc.float({ min: 0, max: 50, noNaN: true }),
            (quantity, unitPrice, discount, vatRate) => {
                const total = ItemCalculator.calculateLineTotal(quantity, unitPrice, discount, vatRate);
                return total >= 0;
            }
        ));
    });
    
    await t.test('Property: calculateSubtotal est la somme des sous-totaux', () => {
        fc.assert(fc.property(
            fc.array(generators.validItem(), { minLength: 1, maxLength: 10 }),
            (items) => {
                const calculatedSubtotal = ItemCalculator.calculateSubtotal(items);
                
                const expectedSubtotal = items.reduce((total, item) => {
                    const subtotal = item.quantity * item.unitPrice;
                    const discountAmount = subtotal * (item.discount / 100);
                    return total + (subtotal - discountAmount);
                }, 0);
                
                return Math.abs(calculatedSubtotal - expectedSubtotal) < 0.01;
            }
        ));
    });
    
    await t.test('Property: calculateTotalVAT est cohérent avec les calculs individuels', () => {
        fc.assert(fc.property(
            fc.array(generators.validItem(), { minLength: 1, maxLength: 10 }),
            (items) => {
                const calculatedVAT = ItemCalculator.calculateTotalVAT(items);
                
                const expectedVAT = items.reduce((total, item) => {
                    const subtotal = item.quantity * item.unitPrice;
                    const discountAmount = subtotal * (item.discount / 100);
                    const subtotalAfterDiscount = subtotal - discountAmount;
                    const vatAmount = subtotalAfterDiscount * (item.vatRate / 100);
                    return total + vatAmount;
                }, 0);
                
                return Math.abs(calculatedVAT - expectedVAT) < 0.01;
            }
        ));
    });
});