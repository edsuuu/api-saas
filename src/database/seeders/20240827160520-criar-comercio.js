// /* eslint-disable @typescript-eslint/no-var-requires */
// 'use strict';

// const { v4: uuidv4 } = require('uuid');

// module.exports = {
//     async up(queryInterface, Sequelize) {
//         try {
//             const user = await queryInterface.sequelize.query(`SELECT id FROM tb_users WHERE email IN ('mercado@norte.com');`, { type: Sequelize.QueryTypes.SELECT });

//             if (!user.length) {
//                 throw new Error('Usuário não encontrado');
//             }

//             return queryInterface.bulkInsert(
//                 'tb_comercio',
//                 [
//                     {
//                         id: uuidv4(),
//                         comercio_name: 'Mercadinho',
//                         cpf_cpnj: '123.123.123-00',
//                         endereco: 'av teste',
//                         usuario_id: user[0].id,
//                         created_at: new Date(),
//                         updated_at: new Date(),
//                     },
//                 ],
//                 {},
//             );
//         } catch (error) {
//             console.error('Erro ao executar a migração:', error);
//             throw error;
//         }
//     },
//     async down(queryInterface, Sequelize) {
//         return queryInterface.bulkDelete('tb_comercio', {
//             comercio_name: {
//                 [Sequelize.Op.in]: ['Mercadinho'],
//             },
//         });
//     },
// };
