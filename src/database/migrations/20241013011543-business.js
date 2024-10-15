module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('business', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // cnpj: {
            //     type: Sequelize.STRING(14),
            //     allowNull: true,
            //     unique: true,
            // },
            address: {
                type: Sequelize.STRING(60),
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(2), // SP, RJ
                allowNull: true,
            },
            cep: {
                type: Sequelize.STRING(8),
                allowNull: true,
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            telefone: {
                type: Sequelize.STRING(14),
                allowNull: true,
            },
            user_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                unique: true,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('business');
    },
};
