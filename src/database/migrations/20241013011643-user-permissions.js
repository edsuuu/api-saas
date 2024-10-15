module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_permissions', {
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
            permission_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });

        // Adicionar restrição de unicidade para evitar duplicações
        await queryInterface.addConstraint('user_permissions', {
            fields: ['user_id', 'permission_id'],
            type: 'unique',
            name: 'unique_user_permission',
        });

        await queryInterface.addIndex('user_permissions', ['user_id']);
        await queryInterface.addIndex('user_permissions', ['permission_id']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user_permissions');
    },
};
