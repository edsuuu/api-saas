/* eslint-disable @typescript-eslint/no-var-requires */
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert(
            'plans',
            [
                {
                    id: uuidv4(),
                    name: 'Premium',
                    description: 'Gerencia tudo',
                    price: 20.93,
                    duration_time: 30,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Master',
                    description: 'Gerencia tudo',
                    price: 45.99,
                    duration_time: 30,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('plans', null, {});
    },
};
