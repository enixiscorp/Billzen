/**
 * Configuration des tests avec fast-check
 * Setup global pour les tests basés sur les propriétés
 */

// Import des modules pour les tests Node.js
const fc = require('fast-check');

// Configuration globale de fast-check
fc.configureGlobal({
    numRuns: 100, // Minimum 100 itérations par test de propriété
    verbose: true,
    seed: 42 // Seed fixe pour la reproductibilité
});

// Générateurs personnalisés pour le domaine des factures
const generators = {
    /**
     * Générateur d'articles valides
     */
    validItem: () => fc.record({
        reference: fc.string({ minLength: 1, maxLength: 20 }),
        description: fc.string({ minLength: 1, maxLength: 100 }),
        quantity: fc.integer({ min: 1, max: 1000 }),
        unitPrice: fc.float({ min: 0.01, max: 10000, noNaN: true }),
        discount: fc.float({ min: 0, max: 100, noNaN: true }),
        vatRate: fc.float({ min: 0, max: 50, noNaN: true })
    }),
    
    /**
     * Générateur de prestations horaires valides
     */
    validHourlyItem: () => fc.record({
        description: fc.string({ minLength: 1, maxLength: 100 }),
        hours: fc.float({ min: 0.1, max: 1000, noNaN: true }),
        hourlyRate: fc.float({ min: 1, max: 1000, noNaN: true })
    }),
    
    /**
     * Générateur d'informations d'entreprise
     */
    companyInfo: () => fc.record({
        name: fc.string({ minLength: 1, maxLength: 100 }),
        address: fc.string({ minLength: 1, maxLength: 200 }),
        phone: fc.string({ minLength: 10, maxLength: 20 }),
        email: fc.emailAddress(),
        legalInfo: fc.string({ maxLength: 500 })
    }),
    
    /**
     * Générateur de codes de devise ISO 4217
     */
    currencyCode: () => fc.constantFrom(
        'EUR', 'USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'SEK', 'NOK'
    ),
    
    /**
     * Générateur de couleurs hexadécimales
     */
    hexColor: () => fc.hexaString({ minLength: 6, maxLength: 6 }).map(s => `#${s}`)
};

// Export des générateurs pour utilisation dans les tests
module.exports = {
    fc,
    generators
};