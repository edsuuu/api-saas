module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            // email_verified: {
            //     type: Sequelize.BOOLEAN,
            //     allowNull: false,
            //     defaultValue: false,
            // },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // pensar numa flag cpf / cpnj e salvar nessa tabela, criar uma mascara
            documents: {
                type: Sequelize.STRING(18), // cpf com pontuacao 14 caracteres ou cpnj com pontuacao 18
                allowNull: true,
                unique: true,
                // validate: {
                //     is: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, // Valida o formato CNPJ: 00.000.000/0000-00
                // },
                // validate: {
                //     is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, // Valida o formato CPF: 000.000.000-00
                // },
                // validacao regex para cpf ou cpnj
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            number_phone: {
                type: Sequelize.STRING(15), // +5511912345678
                allowNull: true,
            },
            telephone: {
                type: Sequelize.STRING(15), // +551142345678
                allowNull: true,
            },
            last_login: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            data_nasc: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            permission: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            // planos_id: {
            //     // Chave estrangeira para a tabela de planos
            //     type: Sequelize.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: 'tb_planos',
            //         key: 'id',
            //     },
            //     onUpdate: 'CASCADE',
            //     onDelete: 'SET NULL',
            // },
            // api_key: {
            //     type: Sequelize.STRING(64),
            //     allowNull: true,
            //     unique: true,
            // },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    },
};
