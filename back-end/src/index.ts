import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"
import {PrismaClient} from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient()
const app: Express = express();



const port = process.env.PORT || 3000;

app.get('/', (_,res: Response) => {
    res.send('server running...')
});

app.post('/api/auth/register', async (req, res) => {

    const {name, email, address, phone } = req.body

    const user = await prisma.post.create({
        data: {
            name,
            email,
            address,
            phone
        }
    })

    res.json(user)
})

app.post('/api/products',async (req, res) => {

    const {name, price, category, description, imageUrl} = req.body

    const product = await prisma.post.create({
        data: {
            name, price, category, description, imageUrl
        }
    })

    res.json(product)
})

app.get('/api/products', async (req, res) => {

    const products = await prisma.products.findMany({

    })
})

app.get('/api/products/:id',() => {

})

app.put('/api/products/:id',() => {

})

app.delete('/api/products/:id',() => {

})

app.post('/api/orders',() => {

})

app.post('/api/orders/:id', () => {

})




app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})


