import { Request, Response, NextFunction } from 'express';
import { ErrorsProtocol } from '../interfaces/IUser';
import validator from 'validator';
import { UserRepository } from '../repository/UserRepository';

interface IValidationUser {
    registroUsuario(req: Request, res: Response, next: NextFunction): void;
}

export class ValidationUser implements IValidationUser {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.registroUsuario = this.registroUsuario.bind(this);
    }

    public async registroUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, last_name, name_business, email, password } = req.body;

            const errors: Array<ErrorsProtocol> = [];

            // const name = userData.name?.trim() || '';
            // const lastName = userData.last_name?.trim() || '';
            // const email = userData.email?.trim() || '';
            // const password = userData.password?.trim() || '';

            const fieldsToValidate = [
                { value: name, fieldName: 'Nome' },
                { value: last_name, fieldName: 'Sobrenome' },
                { value: name_business, fieldName: 'Nome do Comercio' },
                { value: email, fieldName: 'Email' },
                { value: password, fieldName: 'Senha' },
            ];

            fieldsToValidate.forEach((field) => {
                this.validateEmptyField(field.value, field.fieldName, errors);
            });

            if (name.length < 3) {
                errors.push({ message: 'Campo nome não pode ser menor que 3 caracteres', campo: 'Nome' });
            }
            if (last_name.length < 3) {
                errors.push({ message: 'Campo sobrenome não pode ser menor que 3 caracteres', campo: 'Sobrenome' });
            }

            if (name_business.length < 3) {
                errors.push({ message: 'Campo Nome do Comercio não pode ser menor que 3 caracteres', campo: 'Nome do Comercio' });
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
                return res.status(400).json({ errors });
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    private validateEmptyField(value: string, fieldName: string, errors: ErrorsProtocol[]) {
        if (value === '') {
            errors.push({ message: `Campo ${fieldName} não pode ficar vazio`, campo: fieldName });
        }
    }
}
