/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ErrorException } from '../../../utils/ErrorException';

import validator from 'validator';
// import { IUser } from '../interfaces/IUser';
import { UserRepository } from '../repository/UserRepository';
// import { ErrorsProtocol } from '../interfaces/IUser';
import { BusinessRepository } from '../../business/repository/BusinessRepository';
import { Role } from '../../../types/Enums';

export interface IUserService {
    createUserNormal(userData: any): Promise<any>;
}

export default class UserService implements IUserService {
    private readonly userRepository: UserRepository;
    private readonly businessRepository: BusinessRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.businessRepository = new BusinessRepository();
    }

    async createUserNormal(userData: any) {
        const name = userData.name?.trim() || '';
        const lastName = userData.last_name?.trim() || '';
        const name_business = userData.last_name?.trim() || '';
        const email = userData.email?.trim() || '';
        const password = userData.password?.trim() || '';

        // falta rececber o nome do comercio e criar um
        // criar o business
        // setar o plano

        if (!name || !lastName || !name_business || !email || !password) {
            throw new Error('Campos não pode ficar vazio.');
        }

        if (!validator.isEmail(email)) {
            throw new Error('E-mail inválido.');
        }

        if (await this.userRepository.validaEmailNoBanco(email)) {
            throw new Error('E-mail já existe.');
        }

        const costumerPermission = Role.Costumer;

        const user = await this.userRepository.createUserNormal(name, lastName, email, password, costumerPermission);

        await this.businessRepository.createBusinessWithUser(String(user.userCreated.id), name_business);

        return user;
    }

    public validateEmptyField(value: string, fieldName: string, errors: any[]) {
        if (value === '') {
            errors.push({ message: `Campo ${fieldName} não pode ficar vazio`, campo: fieldName });
        }
    }

    async createUserAdminGlobal(userData: any) {
        const name = userData.name?.trim() || '';
        const lastName = userData.last_name?.trim() || '';
        const email = userData.email?.trim() || '';
        const password = userData.password?.trim() || '';

        const permission = Role.Admin;

        const user = await this.userRepository.createUserAdminG(name, lastName, email, password, permission);

        return user;
    }
}
