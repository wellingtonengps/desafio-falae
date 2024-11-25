import {AxiosResponse} from "axios";
import {api} from "@/services/api.ts";
import {UserResponse} from "@/services/UserServices.ts";

export interface OrderResponse {
    id: number;
    status: string,
    totalPrice?: number,
    createdAt?: Date,
    orderItem?: OrderItem[],
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
    id?: number
    productId?: number | null,
    quantity: number
    orderId?: number | null,
    Product?: Product | null
}

type OrderRequest = {
    userId: number,
    orderItem: OrderItem[]
}


interface OrderService {
    getAllOrders(): Promise<OrderResponse[]>;
    createOrder({userId, orderItem}: OrderRequest): Promise<OrderResponse>
    updateOrder({id, orderItem, createdAt, totalPrice, status}: OrderResponse): Promise<OrderResponse>;
}


const getAllOrders = async (): Promise<OrderResponse[]> => {
    try {
        const response: AxiosResponse<OrderResponse[]> = await api.get("/api/orders");
        return response.data
    }catch (error) {
        throw error;
    }
}

const createOrder = async ({userId, orderItem}: OrderRequest): Promise<OrderResponse> => {
    try {
        const response: AxiosResponse<OrderResponse> = await api.post("/api/orders", {userId, orderItem});
        return response.data
    }catch (error) {
        throw error;
    }
}

const updateOrder = async ({
                               id,
                               orderItem, status, createdAt, totalPrice}: OrderResponse) => {
    try {
        const response: AxiosResponse<OrderResponse> = await api.put(`/api/orders/${id}`, {
            orderItem, status, createdAt, totalPrice});
        return response.data
    }catch (error) {
        throw error;
    }
}


export const orderService : OrderService = {
    getAllOrders,
    createOrder,
    updateOrder
}