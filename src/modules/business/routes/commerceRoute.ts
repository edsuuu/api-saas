import { Router } from 'express';
import { authenticateToken } from '../../../middleware/AuthPermission';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import CommerceController from '../controllers/CommerceController';
import ProductsController from '../controllers/ProductsController';
import { Role } from '../../../types/Enums';

const commerceRoute = Router();

commerceRoute.get('/usuario', authenticateToken([Role.Admin, Role.Costumer]), AuthLoginRequired, CommerceController.trazerDadosDoUsuarioCompleto);

commerceRoute.post('/cadastrar-produtos', AuthLoginRequired, authenticateToken([Role.Costumer, Role.Admin]), ProductsController.cadastrarProdutos);

commerceRoute.get('/meus-produtos-cadastrados', AuthLoginRequired, authenticateToken([Role.Costumer]), ProductsController.trazerProdutosDoCostumer);

commerceRoute.post('/realizar-vendas', AuthLoginRequired, authenticateToken([Role.Costumer]), ProductsController.realizarVendaDeProduto);

commerceRoute.put('/atualizar-produto/:id', AuthLoginRequired, authenticateToken([Role.Costumer]), ProductsController.atualizarProduto);

commerceRoute.delete('/deletar-produto/:id', AuthLoginRequired, authenticateToken([Role.Costumer]), ProductsController.deletarProduto);

export { commerceRoute };
