import { Request, Response } from "express";
import {productService} from "../service/productService";

const getAllProducts = async (req: Request, res: Response) => {

    try {
        const products =  await productService.getAllProduct()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar os produtos' });
    }
};

const getProduct =  async (req: Request, res: Response) => {
    const id  = parseInt(req.params.id);

    try {
        const product = await productService.getProduct(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar o produto' });
    }
};

const createProduct = async (req: Request, res: Response) => {

    const { name, price, category, description, imageUrl } = req.body;

    try {
        const product = await productService.createProduct({name, price, category, description, imageUrl})
        res.status(201).json(product);
    }catch (e) {
        res.status(500).json({ error: 'Falha ao criar o produto' });
    }
};

const updateProduct =  async (req: Request, res: Response) => {
    const id  = parseInt(req.params.id);
    const { name, price, category, description, imageUrl } = req.body;

    try {
        const product = await productService.updateProduct({id, name, price, category, description, imageUrl})
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ error: 'Falha ao atualizar o produto' });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    const id  = parseInt(req.params.id);

    try {
        await productService.deleteProduct(id);
        res.status(204).json();
    } catch (e) {
        res.status(500).json({ error: 'Falha ao deletar o produto' });
    }
}

export default {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}