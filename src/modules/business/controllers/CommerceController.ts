import { Request, Response } from 'express';
import AuthService from '../../auth/services/AuthService';
// import { receberIdPeloToken } from '../../../utils/DecodeToken';
// import { ComercioBodyProps } from '../interface/BodyRequest';
import ComercioService from '../services/ComercioService';

import { Business } from '../entities/Business';
import { User } from '../../users/entities/User';
// import { Produto } from '../entities/Products';

class CommerceController {
    protected authService: AuthService;
    private comercioService: ComercioService;

    constructor() {
        this.authService = new AuthService();
        this.comercioService = new ComercioService();
        this.index = this.index.bind(this);

        // this.createComercio = this.createComercio.bind(this);
        this.trazerDadosDoUsuarioCompleto = this.trazerDadosDoUsuarioCompleto.bind(this);
    }

    public async trazerDadosDoUsuarioCompleto(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        console.log(userLogged);

        const user = await User.findByPk(userLogged?.id, {
            include: {
                model: Business,
            },
        });

        if (!user) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const userJson = user.toJSON();

        const userRetorned = {
            ...userJson,
            password: undefined,
            created_at: undefined,
            updated_at: undefined,
            Business: {
                ...userJson.Business,
                user_id: undefined,
                created_at: undefined,
                updated_at: undefined,
            },
        };

        res.json(userRetorned);
    }

    index(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        /* obtem o id e a permissao, valida a permissao e deixa passasr para validar o resto no service
        aqui verifica a permissao de costumer e admin pode ter acesso a essa rota */
        if (userLogged) {
            console.log(userLogged.id, userLogged.permission);
            res.json('hello Admin');
        } else {
            res.status(401).json({ message: 'Usuário não autenticado' });
        }
    }

    // usuarioAutenticado(req: Request) {
    //     const authHeader = req.headers.authorization;

    //     if (authHeader === undefined) return 'error o token é undefined ';

    //     const userLogged = receberIdPeloToken(authHeader);

    //     console.log(userLogged);
    //     console.log(userLogged?.id, userLogged?.permission);

    //     return userLogged;
    // }
}

export default new CommerceController();
