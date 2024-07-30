import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRoute = Router();

authRoute.get('/', AuthController.index);

export { authRoute };
