// Quick test to verify validation functions
const { validateItem, validateHourlyItem } = require('./js/models/state.js');

console.log('Testing validateItem...');

// Valid item
const validItem = {
    reference: 'REF001',
    description: 'Test item',
    quantity: 2,
    unitPrice: 10.50
};
console.log('Valid item:', validateItem(validItem)); // Should be true

// Invalid item - missing reference
const invalidItem1 = {
    reference: '',
    description: 'Test item',
    quantity: 2,
    unitPrice: 10.50
};
console.log('Invalid item (empty reference):', validateItem(invalidItem1)); // Should be false

// Invalid item - negative quantity
const invalidItem2 = {
    reference: 'REF001',
    description: 'Test item',
    quantity: -1,
    unitPrice: 10.50
};
console.log('Invalid item (negative quantity):', validateItem(invalidItem2)); // Should be false

console.log('\nTesting validateHourlyItem...');

// Valid hourly item
const validHourlyItem = {
    description: 'Consultation',
    hours: 8,
    hourlyRate: 75
};
console.log('Valid hourly item:', validateHourlyItem(validHourlyItem)); // Should be true

// Invalid hourly item - missing description
const invalidHourlyItem1 = {
    description: '',
    hours: 8,
    hourlyRate: 75
};
console.log('Invalid hourly item (empty description):', validateHourlyItem(invalidHourlyItem1)); // Should be false

// Invalid hourly item - negative hours
const invalidHourlyItem2 = {
    description: 'Consultation',
    hours: -2,
    hourlyRate: 75
};
console.log('Invalid hourly item (negative hours):', validateHourlyItem(invalidHourlyItem2)); // Should be false

console.log('\nValidation tests completed!');