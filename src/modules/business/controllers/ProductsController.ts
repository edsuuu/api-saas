import { Request, Response } from 'express';
import AuthService from '../../auth/services/AuthService';

import { Business } from '../entities/Business';
import { Produto } from '../entities/Products';

interface Produtos {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
}
class ProductsController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.cadastrarProdutos = this.cadastrarProdutos.bind(this);
        this.trazerProdutosDoCostumer = this.trazerProdutosDoCostumer.bind(this);
        this.deletarProduto = this.deletarProduto.bind(this);
        this.atualizarProduto = this.atualizarProduto.bind(this);
        this.realizarVendaDeProduto = this.realizarVendaDeProduto.bind(this);
    }

    async cadastrarProdutos(req: Request, res: Response) {
        // const userLogged = this.authService.usuarioAutenticado(req);

        // console.log(userLogged?.id);

        // const buscarRestaurante = await Business.findOne({
        //     where: { usuario_id: userLogged?.id },
        // });

        // const idRestaurante = buscarRestaurante?.dataValues.id;

        // const { product_name, price, quantidade } = req.body;

        // const produto = await Produto.create({
        //     product_name,
        //     price,
        //     quantidade,
        //     comercio_id: idRestaurante,
        // });

        // res.json({ produto });
        res.json('falta editar a criacao do produto');
    }

    async trazerProdutosDoCostumer(req: Request, res: Response) {
        try {
            const userLogged = this.authService.usuarioAutenticado(req);

            console.log('res.locals.user', res.locals.user);

            if (!userLogged) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            console.log(userLogged.id);

            const buscarRestaurante = await Business.findOne({
                where: { user_id: userLogged.id },
            });

            if (!buscarRestaurante) {
                return res.status(404).json({ error: 'Você não tem restaurante cadastrado' });
            }

            const idRestaurante = buscarRestaurante.dataValues?.id;
            console.log(idRestaurante);

            const produtos = await Produto.findAll({ where: { business_id: idRestaurante } });

            res.json({ todosProdutos: produtos });
        } catch (error) {
            console.error('Erro ao trazer produtos do cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async realizarVendaDeProduto(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        if (!userLogged) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        const produtos: Array<Produtos> = req.body;

        console.log(produtos);

        res.json(produtos);
    }

    async atualizarProduto(req: Request, res: Response) {
        try {
            const userLogged = this.authService.usuarioAutenticado(req);

            if (!userLogged) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const produtoParam = req.params.id;

            if (!produtoParam) {
                return res.status(400).json({ error: 'ID do produto não fornecido' });
            }

            const { product_name, price, quantidade } = req.body;

            if (!product_name || !price || !quantidade) {
                return res.status(400).json({ error: 'Preencha todos os campos' });
            }

            const buscarRestaurante = await Business.findOne({
                where: { usuario_id: userLogged.id },
            });

            if (!buscarRestaurante) {
                return res.status(404).json({ error: 'Você não tem restaurante cadastrado' });
            }

            const idRestaurante = buscarRestaurante.dataValues?.id;

            const produto = await Produto.findOne({
                where: {
                    id: produtoParam,
                    comercio_id: idRestaurante,
                },
            });

            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado ou não pertence ao seu restaurante' });
            }
            console.log(produto);

            const produtoAtualizado = await produto.update({
                product_name,
                price,
                quantidade,
            });

            return res.json({ msg: 'Produto atualizado', produtoAtualizado });
        } catch (error) {
            console.error('Erro ao processar a requisição:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async deletarProduto(req: Request, res: Response) {
        try {
            const userLogged = this.authService.usuarioAutenticado(req);

            if (!userLogged) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const produtoParam = req.params.id;

            const buscarRestaurante = await Business.findOne({
                where: { usuario_id: userLogged.id },
            });

            if (!buscarRestaurante) {
                return res.status(404).json({ error: 'Você não tem restaurante cadastrado' });
            }

            const idRestaurante = buscarRestaurante.dataValues?.id;

            const produto = await Produto.findOne({
                where: {
                    id: produtoParam,
                    comercio_id: idRestaurante,
                },
            });

            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado ou não pertence ao seu restaurante' });
            }
            console.log(produto);

            await produto.destroy();

            return res.json({ msg: 'produto deletado' });
        } catch (error) {
            console.error('Erro ao processar a requisição:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new ProductsController();
