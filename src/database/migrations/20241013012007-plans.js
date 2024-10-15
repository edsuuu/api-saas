module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('plans', {
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
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: true,
                },
            },
            // falta o tipo se é mensal, trimestal, semestral, anual
            duration_time: {
                // dias ou meses ?
                type: Sequelize.INTEGER(3),
                allowNull: false,
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
        await queryInterface.dropTable('plans');
    },
};
