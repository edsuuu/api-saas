module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subscriptions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            plan_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'plans',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            activation_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            expiration_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'),
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('ATIVO', 'CAMCELADO', 'EXPIRADO'),
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            cancellation_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
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
        await queryInterface.dropTable('subscriptions');
    },
};
