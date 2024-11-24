import {AxiosResponse} from "axios";
import {api} from "@/services/api.ts";
import {UserResponse} from "@/services/UserServices.ts";

export interface OrderResponse {
    id: number;
    status: string,
    totalPrice: number,
    createdAt: Date,
    orderItem: OrderItem[],
    user?: UserResponse
}

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string | null;
    imageUrl: string | null;
}

type OrderItem = {
    id: number
    productId: number | null,
    quantity: number
    orderId: number | null,
    Product: Product | null
}


interface OrderService {
    getAllOrders(): Promise<OrderResponse[]>;
}


const getAllOrders = async (): Promise<OrderResponse[]> => {
    try {
        const response: AxiosResponse<OrderResponse[]> = await api.get("/api/orders");
        return response.data
    }catch (error) {
        throw error;
    }
}

export const orderService : OrderService = {
    getAllOrders
}