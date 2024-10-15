import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import { sequelizeConnection } from '../../../config/db/database';
import { Role } from '../../../types/Enums';

class User extends Model<IUser> {
    static isValidPassword: (password: string, hash: string) => boolean;
    static hashPassword: (password: string) => string;
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        // email_verified: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     allowNull: false,
        // },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            set(value: string) {
                const hash = bcrypt.hashSync(value, 16);
                this.setDataValue('password', hash);
            },
        },
        documents: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        data_nasc: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        permission: {
            type: DataTypes.STRING(10),
            defaultValue: Role.Costumer,
            allowNull: false,
        },
        // api_key: {
        //     type: DataTypes.STRING(128),
        //     allowNull: false,
        // },
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

User.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(18));
};

User.isValidPassword = function (password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
};

export { User };
