// /* eslint-disable @typescript-eslint/no-var-requires */
// 'use strict';

// const { v4: uuidv4 } = require('uuid');

// module.exports = {
//     async up(queryInterface, Sequelize) {
//         const comercio = await queryInterface.sequelize.query(`SELECT id FROM tb_comercio WHERE cpf_cpnj IN ('123.123.123-00');`, { type: Sequelize.QueryTypes.SELECT });

//         return queryInterface.bulkInsert(
//             'tb_produtos',
//             [
//                 {
//                     id: uuidv4(),
//                     product_name: 'Limão',
//                     price: 20.0,
//                     quantidade: 10,
//                     comercio_id: comercio[0].id,
//                     created_at: new Date(),
//                     updated_at: new Date(),
//                 },
//                 {
//                     id: uuidv4(),
//                     product_name: 'Peixe',
//                     price: 22.0,
//                     quantidade: 5,
//                     comercio_id: comercio[0].id,
//                     created_at: new Date(),
//                     updated_at: new Date(),
//                 },
//                 {
//                     id: uuidv4(),
//                     product_name: 'Arroz',
//                     price: 12.99,
//                     quantidade: 2,
//                     comercio_id: comercio[0].id,
//                     created_at: new Date(),
//                     updated_at: new Date(),
//                 },
//                 {
//                     id: uuidv4(),
//                     product_name: 'Feijão',
//                     price: 13.44,
//                     quantidade: 23,
//                     comercio_id: comercio[0].id,
//                     created_at: new Date(),
//                     updated_at: new Date(),
//                 },
//                 {
//                     id: uuidv4(),
//                     product_name: 'Salgadinho',
//                     price: 12.01,
//                     quantidade: 16,
//                     comercio_id: comercio[0].id,
//                     created_at: new Date(),
//                     updated_at: new Date(),
//                 },
//             ],
//             {},
//         );
//     },
//     async down(queryInterface) {
//         return queryInterface.bulkDelete('tb_produtos', null, {});
//     },
// };
