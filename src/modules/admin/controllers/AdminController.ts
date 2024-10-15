import { Request, Response } from 'express';
import { receberIdPeloToken } from '../../../utils/DecodeToken';
import AuthService from '../../auth/services/AuthService';

class AdminController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.index = this.index.bind(this);
    }

    index(req: Request, res: Response) {
        // const userLogged = this.authService.usuarioAutenticado(req);
        // // obtem o id e a permissao, valida a permissao e deixa passasr para validar o resto no service
        // if (userLogged) {
        //     console.log(userLogged.id, userLogged.permission);
        //     res.json('hello Admin');
        // } else {
        //     res.status(401).json({ message: 'Usuário não autenticado' });
        // }

        res.json('hello admin');
    }

    usuarioAutenticado(req: Request) {
        const authHeader = req.headers.authorization;

        if (authHeader === undefined) return 'error o token é undefined ';

        const userLogged = receberIdPeloToken(authHeader);

        console.log(userLogged);
        console.log(userLogged?.id, userLogged?.permission);

        return userLogged;
    }

    // async criarPermissao(req: Request, res: Response) {
    //     const { name, description } = req.body;

    //     if (!name || !description) {
    //         return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
    //     }

    //     const obj: IPermission = {
    //         name,
    //         description,
    //     };

    //     const result = await Permission.create(obj);

    //     res.json(result);
    // }

    // dashBoard(req: Request, res: Response) {}
}

export default new AdminController();
