import { Router } from 'express';
import { UserController } from '../controllers/UsersController';
import UserService from '../services/UserService';
import { ValidationUser } from '../middleware/ValidationsUser';
// import { authenticateToken } from '../../../middleware/AuthPermission';
// import { Role } from '../Permissions';
// import AuthLoginRequired from '../../../middleware/AuthLoginRequired';

const validationUser = new ValidationUser();

const userService = new UserService();

const userController = new UserController(userService);

const usersRoute = Router();

usersRoute.post('/create-user', validationUser.registroUsuario, (req, res) => userController.createUserWithBunisess(req, res));

// apenas user admin pode criar admin
// usersRoute.post('/cadastrar-admin', AuthLoginRequired, UsersController.createUserAdmin);

// usersRoute.post('/cadastrar-comercio', UsersRoute.createUserAdmin);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserAdmin);

export { usersRoute };
