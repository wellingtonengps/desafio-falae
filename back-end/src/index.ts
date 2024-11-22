import express, {Express} from "express";
import dotenv from "dotenv"
import {PrismaClient} from "@prisma/client";
import cors from "cors"
import Routers from "./routes";

dotenv.config();

export const prisma = new PrismaClient()
const app: Express = express();

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000;

app.use(Routers)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})


