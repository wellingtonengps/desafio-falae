import {prisma} from "../index";


const getAllProducts = async (req, res) => {

    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProduct =  async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!product) {
            res.status(404).send({ error: 'Product not found' });
        }

        return res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const createProduct = async (req, res) => {

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

const updateProduct =  async (req, res) => {
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

const deleteProduct = async (req, res) => {
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