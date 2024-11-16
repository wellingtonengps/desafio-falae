import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"
import {PrismaClient} from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient()
const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_,res: Response) => {
    res.send('server running...')
});

app.post('/api/auth/register', async (req, res) => {

    const { name, email, address, phone } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                address,
                phone,
            }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
})

app.post('/api/products',async (req, res) => {

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
})

app.get('/api/products', async (req, res) => {

    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
})


app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});


app.put('/api/products/:id', async (req, res) => {
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
});

app.delete('/api/products/:id', async (req, res) => {
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
});

app.post('/api/orders',() => {

})

app.post('/api/orders/:id', () => {

})




app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})


