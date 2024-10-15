/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../entities/User';
// import { IUser } from '../interfaces/IUser';

export class UserRepository {
    constructor(private readonly user = User) {}

    async createUserNormal(nameReceived: string, last_nameReceived: string, emailReceived: string, passwordReceived: string, permissionReceived: string) {
        try {
            const usuarioRecebido: any = { name: nameReceived, last_name: last_nameReceived, email: emailReceived, password: passwordReceived, permission: permissionReceived };

            // if ((await this.validaEmailNoBanco(usuarioRecebido.email)) === true) return 'Email ja existe';

            const { dataValues } = await this.user.create(usuarioRecebido);

            const { id, name, email } = dataValues;

            return { mensagem: 'Usuario created ', userCreated: { id, name, email } };
        } catch (error) {
            console.log(error);
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
        }
    }

    async createUserAdminG(nameReceived: string, last_nameReceived: string, emailReceived: string, passwordReceived: string, permissionReceived: string) {
        try {
            const usuarioRecebido: any = { nameReceived, last_nameReceived, emailReceived, passwordReceived, permissionReceived };

            console.log(usuarioRecebido);

            this.validaEmailNoBanco(usuarioRecebido.email);

            await this.user.create(usuarioRecebido);

            return { mensagem: 'Admin created', userCreated: { nameReceived, last_nameReceived, emailReceived, passwordReceived } };
        } catch (error) {
            // console.log(error);
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
        }
    }

    async validaEmailNoBanco(emailParam: string) {
        const user = await this.user.findOne({
            where: { email: emailParam },
        });

        if (user) {
            return true;
        } else {
            return false;
        }
    }

    async findByEmailAuth(emailParam: string) {
        try {
            const user = await User.findOne({
                where: { email: emailParam },
            });

            if (!user) return null;

            const data = user.dataValues;

            const { id, name, email, password, permission } = data;

            return { id, name, email, password, permission };
        } catch (error) {
            throw new Error(`Unable to find user: ${error}`);
        }
    }
}
