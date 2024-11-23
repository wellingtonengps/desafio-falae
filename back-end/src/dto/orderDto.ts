import {Product} from "@prisma/client";


interface OrderResponse {
    id?: number;
    status: string,
    totalPrice: number,
    createdAt: Date,
    OrderItem: {
        Product: {
            id: number;
            name: string;
            price: number;
            category: string;
            description: string | null;
            imageUrl: string | null;
        } | null;
        id: number;
        quantity: number;
        orderId: number | null;
        productId: number | null;
    }[];
}


type productType = {
    productId: number,
    quantity: number
}

type OrderRequest = {
    userId: number,
    products: productType[]
}


interface OrderRepository {
    //createOrder({userId, products}: OrderRequest): Promise<OrderResponse>;
    //updateOrder({OrderItem}: OrderResponse): Promise<OrderResponse>;
    deleteOrder(id: number): Promise<void>;
    getAllOrders(): Promise<OrderResponse[]>;
    getOrder(id: number): Promise<OrderResponse | null>;
}

interface OrderService {
    //createOrder({userId, products}: OrderRequest): Promise<OrderResponse>;
    //updateOrder({OrderItem}: OrderResponse): Promise<OrderResponse>;
    deleteOrder(id: number): Promise<void>;
    getAllOrders(): Promise<OrderResponse[]>;
    getOrder(id: number): Promise<OrderResponse>;
}

export {OrderResponse, OrderRequest, OrderRepository, OrderService}