/**
 * Framework de test simple pour navigateur
 * Remplace fast-check pour les tests de base
 */

class SimpleTestFramework {
    constructor() {
        this.tests = [];
        this.results = [];
    }
    
    /**
     * Définit un test
     * @param {string} name - Nom du test
     * @param {Function} testFn - Fonction de test
     */
    test(name, testFn) {
        this.tests.push({ name, testFn });
    }
    
    /**
     * Assertion simple
     * @param {boolean} condition - Condition à vérifier
     * @param {string} message - Message d'erreur
     */
    assert(condition, message = 'Assertion failed') {
        if (!condition) {
            throw new Error(message);
        }
    }
    
    /**
     * Assertion d'égalité
     * @param {*} actual - Valeur actuelle
     * @param {*} expected - Valeur attendue
     * @param {string} message - Message d'erreur
     */
    assertEqual(actual, expected, message = `Expected ${expected}, got ${actual}`) {
        if (actual !== expected) {
            throw new Error(message);
        }
    }
    
    /**
     * Assertion d'égalité approximative pour les nombres
     * @param {number} actual - Valeur actuelle
     * @param {number} expected - Valeur attendue
     * @param {number} tolerance - Tolérance
     */
    assertAlmostEqual(actual, expected, tolerance = 0.01) {
        if (Math.abs(actual - expected) > tolerance) {
            throw new Error(`Expected ${expected} ± ${tolerance}, got ${actual}`);
        }
    }
    
    /**
     * Générateur de nombres aléatoires
     * @param {number} min - Minimum
     * @param {number} max - Maximum
     * @returns {number} Nombre aléatoire
     */
    randomFloat(min = 0, max = 100) {
        return Math.random() * (max - min) + min;
    }
    
    /**
     * Générateur d'entiers aléatoires
     * @param {number} min - Minimum
     * @param {number} max - Maximum
     * @returns {number} Entier aléatoire
     */
    randomInt(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Générateur de chaîne aléatoire
     * @param {number} length - Longueur
     * @returns {string} Chaîne aléatoire
     */
    randomString(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    /**
     * Test de propriété simple (version simplifiée de fast-check)
     * @param {Function} generator - Générateur de données
     * @param {Function} property - Propriété à tester
     * @param {number} iterations - Nombre d'itérations
     */
    property(generator, property, iterations = 100) {
        for (let i = 0; i < iterations; i++) {
            const data = generator();
            if (!property(data)) {
                throw new Error(`Property failed on iteration ${i + 1} with data: ${JSON.stringify(data)}`);
            }
        }
    }
    
    /**
     * Exécute tous les tests
     */
    async runAll() {
        this.results = [];
        
        for (const test of this.tests) {
            try {
                await test.testFn();
                this.results.push({ name: test.name, status: 'pass', error: null });
            } catch (error) {
                this.results.push({ name: test.name, status: 'fail', error: error.message });
            }
        }
        
        this.displayResults();
    }
    
    /**
     * Affiche les résultats
     */
    displayResults() {
        const resultsContainer = document.getElementById('test-results');
        const summaryContainer = document.getElementById('test-summary');
        
        resultsContainer.innerHTML = '';
        
        let passed = 0;
        let failed = 0;
        
        this.results.forEach(result => {
            const div = document.createElement('div');
            div.className = `test-result test-${result.status}`;
            
            if (result.status === 'pass') {
                div.textContent = `✓ ${result.name}`;
                passed++;
            } else {
                div.textContent = `✗ ${result.name}: ${result.error}`;
                failed++;
            }
            
            resultsContainer.appendChild(div);
        });
        
        summaryContainer.textContent = `Tests: ${passed + failed}, Passed: ${passed}, Failed: ${failed}`;
        summaryContainer.className = `test-summary ${failed === 0 ? 'test-pass' : 'test-fail'}`;
    }
}

// Instance globale
const testFramework = new SimpleTestFramework();