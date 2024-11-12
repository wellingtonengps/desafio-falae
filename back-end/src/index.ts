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

app.post('/api/auth/register',() => {

})

app.post('/api/products',() => {

})

app.get('/api/products',() => {

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


