/**
 * Tests pour le calculateur de prestations horaires
 */

const { test } = require('node:test');
const assert = require('node:assert');
const { fc, generators } = require('../setup');

// Import du module à tester
const HourlyCalculator = require('../../js/calculators/HourlyCalculator');

test('HourlyCalculator - Tests unitaires', async (t) => {
    await t.test('calculateHourlyTotal avec valeurs de base', () => {
        const total = HourlyCalculator.calculateHourlyTotal(8, 50);
        assert.strictEqual(total, 400);
    });
    
    await t.test('calculateHourlyTotal avec heures décimales', () => {
        const total = HourlyCalculator.calculateHourlyTotal(7.5, 60);
        assert.strictEqual(total, 450);
    });
    
    await t.test('calculateHourlyTotal avec heures zéro retourne zéro', () => {
        const total = HourlyCalculator.calculateHourlyTotal(0, 50);
        assert.strictEqual(total, 0);
    });
    
    await t.test('calculateHourlyTotal avec taux négatif retourne zéro', () => {
        const total = HourlyCalculator.calculateHourlyTotal(8, -50);
        assert.strictEqual(total, 0);
    });
    
    await t.test('calculateHourlySubtotal avec plusieurs prestations', () => {
        const hourlyItems = [
            { hours: 8, hourlyRate: 50 },
            { hours: 4, hourlyRate: 75 },
            { hours: 2, hourlyRate: 100 }
        ];
        const subtotal = HourlyCalculator.calculateHourlySubtotal(hourlyItems);
        assert.strictEqual(subtotal, 900); // 400 + 300 + 200
    });
});

test('HourlyCalculator - Tests de propriétés', async (t) => {
    await t.test('Property: calculateHourlyTotal est toujours positif ou zéro', () => {
        fc.assert(fc.property(
            fc.float({ min: 0, max: 1000, noNaN: true }),
            fc.float({ min: 0, max: 1000, noNaN: true }),
            (hours, hourlyRate) => {
                const total = HourlyCalculator.calculateHourlyTotal(hours, hourlyRate);
                return total >= 0;
            }
        ));
    });
    
    await t.test('Property: calculateHourlyTotal respecte la multiplication', () => {
        fc.assert(fc.property(
            fc.float({ min: 0.1, max: 100, noNaN: true }),
            fc.float({ min: 1, max: 1000, noNaN: true }),
            (hours, hourlyRate) => {
                const total = HourlyCalculator.calculateHourlyTotal(hours, hourlyRate);
                const expected = hours * hourlyRate;
                return Math.abs(total - expected) < 0.01;
            }
        ));
    });
    
    await t.test('Property: calculateHourlySubtotal est la somme des totaux individuels', () => {
        fc.assert(fc.property(
            fc.array(generators.validHourlyItem(), { minLength: 1, maxLength: 10 }),
            (hourlyItems) => {
                const calculatedSubtotal = HourlyCalculator.calculateHourlySubtotal(hourlyItems);
                
                const expectedSubtotal = hourlyItems.reduce((total, item) => {
                    return total + HourlyCalculator.calculateHourlyTotal(item.hours, item.hourlyRate);
                }, 0);
                
                return Math.abs(calculatedSubtotal - expectedSubtotal) < 0.01;
            }
        ));
    });
});