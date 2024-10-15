export interface IUser {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Business?: any;
    id?: number;
    name: string;
    last_name: string;
    email: string;
    email_verified?: boolean;
    password: string;

    documents: string;
    photo: string;
    active: boolean;

    last_login: Date;
    data_nasc: Date;
    permission: string;
    api_key?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface BodyReceived {
    name: string;
    last_name: string;
    name_business: string;
    email: string;
    password: string;
}

export interface ErrorsProtocol {
    message: string;
    campo: string;
}
