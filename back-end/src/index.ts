//todo: verificar esse error aqui

import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"
import {PrismaClient} from "@prisma/client";
import cors from "cors"

dotenv.config();

export const prisma = new PrismaClient()
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


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})


