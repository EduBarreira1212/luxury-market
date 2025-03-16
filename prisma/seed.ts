import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const sellerId = faker.string.uuid();

    await prisma.seller.create({
        data: {
            id: sellerId,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('Test12345@', 10),
            address: faker.location.streetAddress(),
            phoneNumber: faker.phone.number(),
            about: faker.lorem.sentence(),
        },
    });

    await prisma.buyer.create({
        data: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('Test12345@', 10),
            phoneNumber: faker.phone.number(),
        },
    });

    await prisma.car.createMany({
        data: [
            {
                id: faker.string.uuid(),
                sellerId: sellerId,
                model: faker.vehicle.model(),
                brand: faker.vehicle.manufacturer(),
                year: faker.number.int({ min: 1990, max: new Date().getFullYear() }),
                mileage: faker.number.int({ min: 0, max: 300000 }),
                condition: 'NEW',
                price: faker.number.float({
                    min: 5000,
                    max: 1000000,
                }),
                fuel: 'GASOLINE',
                gearbox: 'AUTOMATIC',
                about: faker.lorem.sentence(),
            },
            {
                id: faker.string.uuid(),
                sellerId: sellerId,
                model: faker.vehicle.model(),
                brand: faker.vehicle.manufacturer(),
                year: faker.number.int({ min: 1990, max: new Date().getFullYear() }),
                mileage: faker.number.int({ min: 0, max: 300000 }),
                condition: 'USED',
                price: faker.number.float({
                    min: 5000,
                    max: 1000000,
                }),
                fuel: 'ETHANOL',
                gearbox: 'MANUAL',
                about: faker.lorem.sentence(),
            },
            {
                id: faker.string.uuid(),
                sellerId: sellerId,
                model: faker.vehicle.model(),
                brand: faker.vehicle.manufacturer(),
                year: faker.number.int({ min: 1990, max: new Date().getFullYear() }),
                mileage: faker.number.int({ min: 0, max: 300000 }),
                condition: 'NEW',
                price: faker.number.float({
                    min: 5000,
                    max: 1000000,
                }),
                fuel: 'ELECTRIC',
                gearbox: 'AUTOMATIC',
                about: faker.lorem.sentence(),
            },
        ],
    });

    await prisma.motorcycle.createMany({
        data: [
            {
                id: faker.string.uuid(),
                sellerId: sellerId,
                model: faker.vehicle.model(),
                brand: faker.vehicle.manufacturer(),
                year: faker.number.int({ min: 1990, max: new Date().getFullYear() }),
                mileage: faker.number.int({ min: 0, max: 100000 }),
                condition: 'NEW',
                price: faker.number.float({
                    min: 2000,
                    max: 50000,
                }),
                cc: faker.number.int({ min: 100, max: 2000 }),
                about: faker.lorem.sentence(),
            },
            {
                id: faker.string.uuid(),
                sellerId: sellerId,
                model: faker.vehicle.model(),
                brand: faker.vehicle.manufacturer(),
                year: faker.number.int({ min: 1990, max: new Date().getFullYear() }),
                mileage: faker.number.int({ min: 0, max: 100000 }),
                condition: 'USED',
                price: faker.number.float({
                    min: 2000,
                    max: 50000,
                }),
                cc: faker.number.int({ min: 100, max: 2000 }),
                about: faker.lorem.sentence(),
            },
            {
                id: faker.string.uuid(),
                sellerId: sellerId,
                model: faker.vehicle.model(),
                brand: faker.vehicle.manufacturer(),
                year: faker.number.int({ min: 1990, max: new Date().getFullYear() }),
                mileage: faker.number.int({ min: 0, max: 100000 }),
                condition: 'USED',
                price: faker.number.float({
                    min: 2000,
                    max: 50000,
                }),
                cc: faker.number.int({ min: 100, max: 2000 }),
                about: faker.lorem.sentence(),
            },
        ],
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((error) => {
        console.error('Error seeding database:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
