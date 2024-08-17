import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
    const authorization: string | undefined = req.headers.authorization;

    const cookietoken: string | undefined = req.headers.cookie;

    // console.log('vindo do authloginrequired: authorization', authorization);
    // console.log('vindo do authloginrequired: cookietoken', cookietoken);

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1];

        try {
            jwt.verify(token, process.env.TOKEN_SECRET as string);
            return next();
        } catch (e) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }

    if (cookietoken) {
        const tokenCokkie = cookietoken.split('=')[1];
        try {
            jwt.verify(tokenCokkie, process.env.TOKEN_SECRET as string);
            return next();
        } catch (e) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }

    return res.status(401).json({ error: 'Token não fornecido' });
};
