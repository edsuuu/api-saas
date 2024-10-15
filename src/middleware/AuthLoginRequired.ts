import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
    const authorization: string | undefined = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1];

        try {
            const data: string | JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET as string);

            const { id } = data as JwtPayload;

            console.log('Token válido:', data);
            res.locals.user = id;
            return next();
        } catch (e) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }

    return res.status(401).json({ error: 'Token não fornecido' });
};
