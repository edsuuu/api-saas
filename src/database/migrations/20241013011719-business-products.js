module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
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
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                },
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                },
            },
            category: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            business_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'business',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('products');
    },
};
