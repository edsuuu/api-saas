import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { authenticateToken } from '../../../middleware/AuthPermission';
import { Role } from '../../../types/Enums';

const adminRoute: Router = Router();

adminRoute.get('/', AuthLoginRequired, authenticateToken([Role.Admin]), AdminController.index);
// adminRoute.post('/permissions', AdminController.criarPermissao);

export { adminRoute };
