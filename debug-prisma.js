const { PrismaClient } = require('@prisma/client');

console.log('Testing PrismaClient constructor...');
try {
    const prisma = new PrismaClient({ foo: 'bar' });
} catch (e) {
    console.log('Caught expected error:');
    console.log(e.message);
}
