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
        const response: AxiosResponse<Order[]> = await  api.get("/api/orders");
        console.log(response.data)

        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function deleteOrder(id: number): Promise<Order[]> {
    try {
        const response = await api.delete(`/api/orders/${id}`);
        console.log(response.data)

        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}


export async function updateOrder(
    id: number,
    updateData: { userId?: number; status?: string; products?: { productId: number; quantity: number }[] }
): Promise<Order> {
    try {
        // Merge the existing data with the updated data
        const updatedOrder = {
            "userId": updateData.userId,
            "status": updateData.status,
            "products": [
            {
                "productId": 3,
                "quantity": 3
            },
            {
                "productId": 2,
                "quantity": 10
            }
            ]
        };

        // Send the updated order data to the API
        const response = await api.put(`/api/orders/${id}`, updatedOrder);

        console.log(response.data)

        console.log("Updated Order:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
}



