//todo: verificar esse error aqui

import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"
import {PrismaClient} from "@prisma/client";
import cors from "cors"

dotenv.config();

const prisma = new PrismaClient()
const app: Express = express();

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000;

type productType = {
    productId: number,
    quantity: number
}

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

app.delete('/api/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

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

//todo: tratar o erro quando mando o id inválido
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

app.post('/api/orders', async (req,res) => {


    const { userId, products }: { userId: number; products: productType[] } = req.body;

    try {

        const productIds = products.map(product => product.productId);

        const dbProducts = await prisma.product.findMany({
            where: {
                id: { in: productIds },
            },
        });

        const productMap = dbProducts.reduce((map, product) => {
            map[product.id] = product;
            return map;
        }, {} as { [key: number]: { price: number } });

        const totalPrice = products.reduce((acc, product) => {
            const productFromDb = productMap[product.productId];
            if (productFromDb) {
                return acc + (product.quantity * productFromDb.price); // Multiplica a quantidade pelo preço do produto
            }
            return acc;
        }, 0);

        const order = await prisma.order.create({
            data: {
                userId: userId,
                totalPrice: totalPrice,
                status: "Pendente",
                OrderItem: {
                    create: products.map(product => ({
                        quantity: product.quantity,
                        Product: {
                            connect: { id: product.productId },
                        },
                    })),
                },
            }
        });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
})



app.get('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                OrderItem: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        res.json(order);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
})

app.get('/api/orders', async (req, res) => {

    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
})



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})


