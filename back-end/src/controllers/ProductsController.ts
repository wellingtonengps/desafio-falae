import { Request, Response } from "express";
import {prisma} from "../index";


type productType = {
    productId: number,
    quantity: number
}



const getAllProducts = async (req: Request, res: Response) => {

    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProduct =  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });
        
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const createProduct = async (req: Request, res: Response) => {

    const { name, price, category, description, imageUrl } = req.body;

    try {
        const product = await prisma.product.create({
            data: {
                name, price, category, description, imageUrl
            }
        });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const updateProduct =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, category, description, imageUrl } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, price, category, description, imageUrl }
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

export default {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}