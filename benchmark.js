#!/usr/bin/env node

const {performance} = require('perf_hooks');

// Import validation libraries
const {predicates: p} = require('./dist/index.js');
const zod = require('zod');
const joi = require('joi');
const yup = require('yup');
// Removed AJV - it's a JSON Schema validator, not a programmatic validation library

// Test data
const validUser = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    phone: '(555) 123-4567',
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
    },
    tags: ['developer', 'typescript', 'nodejs'],
};

const invalidUser = {
    name: '',
    email: 'invalid-email',
    age: -5,
    phone: 'not-a-phone',
    address: {
        street: '',
        city: '',
        state: 'INVALID',
        zip: 'not-a-zip',
    },
    tags: [],
};

// Define schemas for each library
const runtypSchema = p.object({
    name: p.string({len: {min: 1, max: 100}}),
    email: p.email(),
    age: p.number({range: {min: 0, max: 150}}),
    phone: p.regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'must be valid phone format'),
    address: p.object({
        street: p.string({len: {min: 1}}),
        city: p.string({len: {min: 1}}),
        state: p.string({len: {min: 2, max: 2}}),
        zip: p.regex(/^\d{5}$/, 'must be 5 digits'),
    }),
    tags: p.array(p.string(), {len: {min: 1}}),
});

const zodSchema = zod.object({
    name: zod.string().min(1).max(100),
    email: zod.string().email(),
    age: zod.number().min(0).max(150),
    phone: zod.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/),
    address: zod.object({
        street: zod.string().min(1),
        city: zod.string().min(1),
        state: zod.string().length(2),
        zip: zod.string().regex(/^\d{5}$/),
    }),
    tags: zod.array(zod.string()).min(1),
});

const joiSchema = joi.object({
    name: joi.string().min(1).max(100)
        .required(),
    email: joi.string().email().required(),
    age: joi.number().min(0).max(150)
        .required(),
    phone: joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
    address: joi.object({
        street: joi.string().min(1).required(),
        city: joi.string().min(1).required(),
        state: joi.string().length(2).required(),
        zip: joi.string().pattern(/^\d{5}$/).required(),
    }).required(),
    tags: joi.array().items(joi.string()).min(1)
        .required(),
});

const yupSchema = yup.object({
    name: yup.string().min(1).max(100)
        .required(),
    email: yup.string().email().required(),
    age: yup.number().min(0).max(150)
        .required(),
    phone: yup.string().matches(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
    address: yup.object({
        street: yup.string().min(1).required(),
        city: yup.string().min(1).required(),
        state: yup.string().length(2).required(),
        zip: yup.string().matches(/^\d{5}$/).required(),
    }).required(),
    tags: yup.array().of(yup.string()).min(1)
        .required(),
});

// Removed AJV schema definition

// Benchmark function
function benchmark(name, fn, iterations = 100000) {

    console.log(`\nBenchmarking ${name}...`);

    // Warm up
    for (let i = 0; i < 1000; i++) {

        fn(validUser);

    }

    // Benchmark valid data
    const validStart = performance.now();

    for (let i = 0; i < iterations; i++) {

        fn(validUser);

    }
    const validEnd = performance.now();
    const validTime = validEnd - validStart;

    // Benchmark invalid data
    const invalidStart = performance.now();

    for (let i = 0; i < iterations; i++) {

        fn(invalidUser);

    }
    const invalidEnd = performance.now();
    const invalidTime = invalidEnd - invalidStart;

    const avgValidTime = validTime / iterations;
    const avgInvalidTime = invalidTime / iterations;

    console.log(`  Valid data: ${avgValidTime.toFixed(4)}ms per validation`);
    console.log(`  Invalid data: ${avgInvalidTime.toFixed(4)}ms per validation`);
    console.log(`  Total time: ${(validTime + invalidTime).toFixed(2)}ms`);

    return {
        name,
        validTime: avgValidTime,
        invalidTime: avgInvalidTime,
        totalTime: validTime + invalidTime,
    };

}

// Validation functions
const runtypValid = (data) => runtypSchema(data);
const zodValid = (data) => {

    try {

        zodSchema.parse(data);
        return true;

    } catch {

        return false;

    }

};
const joiValid = (data) => {

    const result = joiSchema.validate(data);

    return !result.error;

};
const yupValid = (data) => {

    try {

        yupSchema.validateSync(data);
        return true;

    } catch {

        return false;

    }

};
// Removed AJV validation function

// Run benchmarks
console.log('🚀 Validation Library Performance Benchmark');
console.log('==========================================');
console.log('Testing with 100,000 iterations each...');

const results = [
    benchmark('runtyp', runtypValid),
    benchmark('zod', zodValid),
    benchmark('joi', joiValid),
    benchmark('yup', yupValid),
];

// Sort by total time (fastest first)
results.sort((a, b) => a.totalTime - b.totalTime);

console.log('\n📊 Results (fastest to slowest):');
console.log('================================');
results.forEach((result, index) => {

    const speedup = results[0].totalTime / result.totalTime;

    console.log(`${index + 1}. ${result.name}: ${result.totalTime.toFixed(2)}ms ${speedup > 1 ? `(${speedup.toFixed(1)}x slower)` : '(fastest)'}`);

});

console.log('\n✅ Benchmark complete!');
