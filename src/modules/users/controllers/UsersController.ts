/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import IUserService from '../services/UserService';
import { BodyReceived } from '../interfaces/IUser';
import { Logger } from '../../../utils/Logger';
import { ErrorException } from '../../../utils/ErrorException';

interface IUserController {
    createUserWithBunisess(req: Request, res: Response): Promise<void>;
}

export class UserController extends Logger implements IUserController {
    private readonly userService: IUserService;

    constructor(userService: IUserService) {
        super();
        this.userService = userService;
    }

    async createUserWithBunisess(req: Request, res: Response): Promise<void> {
        // desestruturação de obj
        const { name, last_name, name_business, email, password }: BodyReceived = req.body;

        const createUser = { name, last_name, name_business, email, password };

        try {
            const user = await this.userService.createUserNormal(createUser);

            console.log(user);

            // controler > service > repository < model
            res.status(201).json({
                status: 201,
                response: user,
            });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorException) {
                res.status(error.statusCode).json({
                    status: error.statusCode,
                    error: error.errors,
                });
            } else {
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error',
                });
            }
        }
    }

    async createUserAdmin(req: Request, res: Response) {
        const { name, last_name, email, password }: BodyReceived = req.body;

        if (!name || !last_name || !email || !password) {
            return res.status(400).json({ status: 400, error: 'Todos os campos são obrigatórios' });
        }

        const obj = { name, last_name, email, password };

        try {
            const user = await this.userService.createUserAdminGlobal(obj);

            res.status(201).json({
                status: 201,
                response: user,
            });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorException) {
                res.status(error.statusCode).json({
                    status: error.statusCode,
                    error: error.errors,
                });
            } else {
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error',
                });
            }
        }
    }
}
