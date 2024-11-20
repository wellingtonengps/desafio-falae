import axios, {AxiosResponse} from "axios"
import {Order} from "@/screens/Orders/columns.tsx";

//todo: colocar a porta em .env
export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    }
})


export async function getAllProducts(): Promise<Order[]> {
    try {

        const response: AxiosResponse<Order[]> = await  api.get("/api/products");
        console.log(response.data)

        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function getAllOrders(): Promise<Order[]> {
    try {

        const response: AxiosResponse<Order[]> = await  api.get("/api/products");
        console.log(response.data)

        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}



/*
async function getData(): Promise<Order[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            totalPrice: 56.99,
            status: "Pendente",
            createdAt: new Date("2024-11-06T12:34:56Z"),
            userId: "Wellington Pereira"
        },
        {
            id: 2,
            totalPrice: 62.99,
            status: "Entregue",
            createdAt: new Date("2024-11-06T12:34:56Z"),
            userId: "Gabriela Souza"
        },
        {
            id: 2,
            totalPrice: 62.99,
            status: "Entregue",
            createdAt: new Date("2024-12-06T12:34:56Z"),
            userId: "Samuel Torres"
        },
        {
            id: 2,
            totalPrice: 15.99,
            status: "Entregue",
            createdAt: new Date("2024-12-03T12:34:56Z"),
            userId: "Vanessa Silva"
        },
        {
            id: 2,
            totalPrice: 15.99,
            status: "Entregue",
            createdAt: new Date("2024-12-07T12:34:56Z"),
            userId: "Pedro Carlos"
        },
    ]
}*/