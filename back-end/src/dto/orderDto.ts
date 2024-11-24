import {UserResponse} from "./userDto";

interface OrderResponse {
    id: number;
    status: string,
    totalPrice: number,
    createdAt: Date,
    orderItem: OrderItem[];
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

type OrderRequest = {
    userId: number,
    orderItem: OrderItem[]
}


interface OrderRepository {
    createOrder({userId, orderItem}: OrderRequest): Promise<OrderResponse>;
    updateOrder({id, orderItem, createdAt, totalPrice, status}: OrderResponse): Promise<OrderResponse>;
    deleteOrder(id: number): Promise<void>;
    getAllOrders(): Promise<OrderResponse[]>;
    getOrder(id: number): Promise<OrderResponse | null>;
}

interface OrderService {
    createOrder({userId, orderItem}: OrderRequest): Promise<OrderResponse>;
    updateOrder({id, orderItem, createdAt, totalPrice, status}: OrderResponse): Promise<OrderResponse>;
    deleteOrder(id: number): Promise<void>;
    getAllOrders(): Promise<OrderResponse[]>;
    getOrder(id: number): Promise<OrderResponse | null>;
}

export {OrderResponse, OrderRequest, OrderRepository, OrderService}