import {orderRepositories} from "../repositories/orderRepository";
import {OrderRequest, OrderResponse, OrderService} from "../dto/orderDto";


const createOrder  = async ({userId, orderItem
                                 }: OrderRequest): Promise<OrderResponse> => {

    return await orderRepositories.createOrder({orderItem, userId})
}

const updateOrder  = async ({
                                  id,
                                orderItem, status, createdAt, totalPrice}: OrderResponse): Promise<OrderResponse> => {

    return await  orderRepositories.updateOrder({ id,
        orderItem, status, createdAt, totalPrice})
}

const deleteOrder = async (
    id: number): Promise<void> => {

    await orderRepositories.deleteOrder(id)
}

const getAllOrders = async () :Promise<OrderResponse[]> => {
    return await orderRepositories.getAllOrders();
}

const getOrder = async (id: number): Promise<OrderResponse | null> => {
    return await orderRepositories.getOrder(id)
}

export const orderService : OrderService = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
}