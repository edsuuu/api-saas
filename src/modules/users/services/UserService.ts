/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorException } from '../../../utils/ErrorException';

import validator from 'validator';
import { IUser } from '../interfaces/IUser';
import { UserRepository } from '../repository/UserRepository';
import { Role } from '../../../types/Enums';

type ErrorsProtocol = {
    message: string;
    campo: string;
};

export default class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUserNormal(userData: IUser) {
        const errors: Array<ErrorsProtocol> = [];

        console.log(userData);

        const firstName = userData.first_name?.trim() || '';
        const lastName = userData.last_name?.trim() || '';
        const email = userData.email?.trim() || '';
        const password = userData.password?.trim() || '';

        const fieldsToValidate = [
            { value: firstName, fieldName: 'Nome' },
            { value: lastName, fieldName: 'Sobrenome' },
            { value: email, fieldName: 'Email' },
            { value: password, fieldName: 'Senha' },
        ];

        fieldsToValidate.forEach((field) => {
            this.validateEmptyField(field.value, field.fieldName, errors);
        });

        if (firstName.length < 3) {
            errors.push({ message: 'Campo nome não pode ser menor que 3 caracteres', campo: 'Nome' });
        }
        if (lastName.length < 3) {
            errors.push({ message: 'Campo sobrenome não pode ser menor que 3 caracteres', campo: 'Sobrenome' });
        }
        if (email.length < 3) {
            errors.push({ message: 'Campo email não pode ser menor que 3 caracteres', campo: 'Email' });
        }
        if (password.length < 3) {
            errors.push({ message: 'Campo password não pode ser menor que 3 caracteres', campo: 'Senha' });
        }

        if (!validator.isEmail(email)) {
            errors.push({ message: 'Email invalido', campo: 'email' });
        }

        if (await this.userRepository.validaEmailNoBanco(email)) {
            errors.push({ message: 'Email já existe', campo: 'email' });
        }

        if (errors.length > 0) {
            throw new ErrorException(errors, 400);
        }

        const permission = Role.User;

        const user = await this.userRepository.createUserNormal(firstName, lastName, email, password, permission);

        return user;
    }

    public validateEmptyField(value: string, fieldName: string, errors: any[]) {
        if (value === '') {
            errors.push({ message: `Campo ${fieldName} não pode ficar vazio`, campo: fieldName });
        }
    }

    async createUserAdminGlobal(userData: IUser) {
        const errors: any = [];

        const firstName = userData.first_name?.trim() || '';
        const lastName = userData.last_name?.trim() || '';
        const email = userData.email?.trim() || '';
        const password = userData.password?.trim() || '';

        const fieldsToValidate = [
            { value: firstName, fieldName: 'Nome' },
            { value: lastName, fieldName: 'Sobrenome' },
            { value: email, fieldName: 'Email' },
            { value: password, fieldName: 'Senha' },
        ];

        fieldsToValidate.forEach((field) => {
            this.validateEmptyField(field.value, field.fieldName, errors);
        });

        if (firstName.length < 3) {
            errors.push({ message: 'Campo nome não pode ser menor que 3 caracteres', campo: 'Nome' });
        }
        if (lastName.length < 3) {
            errors.push({ message: 'Campo sobrenome não pode ser menor que 3 caracteres', campo: 'Sobrenome' });
        }
        if (email.length < 3) {
            errors.push({ message: 'Campo email não pode ser menor que 3 caracteres', campo: 'Email' });
        }
        if (password.length < 3) {
            errors.push({ message: 'Campo password não pode ser menor que 3 caracteres', campo: 'Senha' });
        }
        if (!validator.isEmail(email)) {
            errors.push({ message: 'Email invalido', campo: 'email' });
        }
        if (await this.userRepository.validaEmailNoBanco(email)) {
            errors.push({ message: 'Email já existe', campo: 'email' });
        }

        if (errors.length > 0) {
            throw new ErrorException(errors, 400);
        }

        const permission = Role.Admin;

        const user = await this.userRepository.createUserAdminG(firstName, lastName, email, password, permission);

        return user;
    }
}
