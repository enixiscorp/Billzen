/**
 * Tests pour le gestionnaire d'état global
 */

const { test } = require('node:test');
const assert = require('node:assert');
const { fc, generators } = require('../setup');

// Import du module à tester
const { getState, setState, updateState, generateId } = require('../../js/models/state');

test('État global - Tests unitaires', async (t) => {
    await t.test('getState retourne l\'état initial', () => {
        const state = getState();
        assert.ok(state.invoice);
        assert.ok(state.invoice.company);
        assert.ok(Array.isArray(state.invoice.items));
        assert.ok(Array.isArray(state.invoice.hourlyItems));
    });
    
    await t.test('setState met à jour l\'état global', () => {
        const newState = { test: 'value' };
        setState(newState);
        const state = getState();
        assert.strictEqual(state.test, 'value');
    });
    
    await t.test('updateState met à jour une propriété spécifique', () => {
        updateState('invoice.company.name', 'Test Company');
        const state = getState();
        assert.strictEqual(state.invoice.company.name, 'Test Company');
    });
    
    await t.test('generateId génère des IDs uniques', () => {
        const id1 = generateId();
        const id2 = generateId();
        assert.notStrictEqual(id1, id2);
        assert.ok(typeof id1 === 'string');
        assert.ok(id1.length > 0);
    });
});

test('État global - Tests de propriétés', async (t) => {
    await t.test('Property: updateState préserve les autres propriétés', () => {
        fc.assert(fc.property(
            fc.string({ minLength: 1 }),
            fc.anything(),
            (path, value) => {
                const initialState = JSON.parse(JSON.stringify(getState()));
                updateState(path, value);
                const newState = getState();
                
                // La nouvelle valeur doit être définie
                const pathParts = path.split('.');
                let current = newState;
                for (const part of pathParts.slice(0, -1)) {
                    current = current[part];
                }
                assert.strictEqual(current[pathParts[pathParts.length - 1]], value);
                
                return true;
            }
        ));
    });
    
    await t.test('Property: generateId génère toujours des chaînes non vides', () => {
        fc.assert(fc.property(
            fc.integer({ min: 1, max: 100 }),
            (count) => {
                const ids = [];
                for (let i = 0; i < count; i++) {
                    const id = generateId();
                    assert.ok(typeof id === 'string');
                    assert.ok(id.length > 0);
                    ids.push(id);
                }
                
                // Tous les IDs doivent être uniques
                const uniqueIds = new Set(ids);
                assert.strictEqual(uniqueIds.size, ids.length);
                
                return true;
            }
        ));
    });
});