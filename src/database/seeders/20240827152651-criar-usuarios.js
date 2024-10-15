/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert(
            'tb_users',
            [
                // {
                //     id: uuidv4(),
                //     first_name: 'Edsu',
                //     last_name: 'admin',
                //     email: 'edsu@edsu.com',
                //     password:
                //     roles: 'admin',
                //     created_at: new Date(),
                //     updated_at: new Date(),
                // },
                {
                    id: uuidv4(),
                    name: 'Edsu',
                    last_name: 'Silva',
                    email: 'asdadsad.silasdasdava@example.com',
                    password: await bcrypt.hash('123456', 10),
                    cpf: '123.456.789-00',
                    cnpj: null,
                    photo: 'https://example.com/photos/asdasdad.jpg',
                    active: true,
                    number_phone: '+5511999999999',
                    last_login: new Date(),
                    email_verified: true,
                    data_nasc: new Date('1990-05-15'),
                    api_key: 'dasdadau9hd17h3ujdha97^T^@#@2',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tb_users', {
            email: {
                [Sequelize.Op.in]: ['asdadsad.silasdasdava@example.com'],
            },
        });
    },
};
