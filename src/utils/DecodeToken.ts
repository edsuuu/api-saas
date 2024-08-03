import jwt from 'jsonwebtoken';
interface DecodedToken {
    idUser: string;
    nomeDoUsuario: string;
    emailDoUsuario: string;
    permission: string[];
    iat: number;
    exp: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedToken;
    } catch (error) {
        // console.log('Token decode error:', error);
        return null;
    }
};

interface IdAndPermission {
    id: string;
    permission: string[];
}

export const receberIdPeloToken = (authHeader: string): IdAndPermission | null | undefined => {
    const token = authHeader && authHeader.split(' ')[0];

    if (!token) {
        return undefined;
    }

    const decodedToken = decodeToken(token);

    if (decodedToken === undefined || decodedToken === null) return;

    const objIdAndPermission: IdAndPermission | null = {
        id: decodedToken.idUser,
        permission: decodedToken.permission,
    };

    return objIdAndPermission;
};
