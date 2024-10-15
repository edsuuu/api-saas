import express, { Express } from 'express';
import dotenv from 'dotenv';
// import helmet from 'helmet';
import morgan from 'morgan';

import { sequelizeConnection } from './config/db/database';
import { adminRoute } from './modules/admin/routes/adminRoute';
import { commerceRoute } from './modules/business/routes/commerceRoute';
import { authRoute } from './modules/auth/routes/authRoute';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { reportsRoute } from './modules/reports/routes/reportsRoute';
import { usersRoute } from './modules/users/routes/usersRoute';
import { CorsConfig } from './config/cors/CorsConfig';
import { IApp } from './types/IApp';
import { Logger } from './utils/Logger';

dotenv.config();

const whitelist: string[] = [process.env.WHITELIST1 as string, process.env.WHITELIST2 as string, process.env.WHITELIST3 as string];

export class App extends Logger implements IApp {
    public app: Express;
    private versionApiV1: string = '/api/v1';
    private corsConfig: CorsConfig;

    constructor() {
        super();
        this.corsConfig = new CorsConfig(whitelist);
        this.connectionDatabase();
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(this.corsConfig.getCorsMiddleware());
        //usar helmet em producao
        // this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(`${this.versionApiV1}/admin`, adminRoute);
        this.app.use(`${this.versionApiV1}/auth`, authRoute);
        this.app.use(`${this.versionApiV1}/commerce`, commerceRoute);
        this.app.use(`${this.versionApiV1}/reports`, reportsRoute);
        this.app.use(`${this.versionApiV1}/users`, usersRoute);
    }

    private async connectionDatabase(): Promise<void> {
        try {
            await sequelizeConnection.authenticate();
            console.log('[server]: Connection database success');
            this.info('Banco de dados Conectado ');
        } catch (err) {
            console.error('[server]: Error connecting database', err);
            this.warn('Banco de dados ruim');
        }
    }

    public server(port: number): void {
        this.app.listen(port, () => {
            console.log(`[server]: Server is running in http://localhost:${port}`);
        });

        this.info('Servidor Iniciado');
    }
}
