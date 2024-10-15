/* eslint-disable @typescript-eslint/no-var-requires */
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert(
            'permissions',
            [
                {
                    id: uuidv4(),
                    name: 'admin',
                    description: 'Gerencia tudo',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'costumer',
                    description: 'Gerencia apenas o comercio',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('permissions', null, {});
    },
};
