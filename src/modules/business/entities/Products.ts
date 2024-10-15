import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../../../config/db/database';
import { Business } from './Business';

class Produto extends Model {}

Produto.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        business_id: {
            type: DataTypes.UUID,
            references: {
                model: 'business',
                key: 'id',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        tableName: 'products',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

Business.hasMany(Produto, { foreignKey: 'business_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Produto.belongsTo(Business, { foreignKey: 'business_id' });

export { Produto };
