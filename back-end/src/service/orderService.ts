import {productRepositories} from "../repositories/productRepository";
import {orderRepositories} from "../repositories/orderRepository";
import {OrderRequest, OrderResponse, OrderService} from "../dto/orderDto";




/*
const createOrder  = async ({userId, products
                                 }: OrderRequest): Promise<OrderResponse> => {

    return await orderRepositories.createOrder({userId, products})
}

const updateOrder  = async ({
                                  id,
                                OrderItem, status, createdAt, totalPrice}: OrderResponse) => {

    return await  orderRepositories.updateOrder({  id, OrderItem, status, createdAt, totalPrice})
}*/

const deleteOrder = async (
    id: number) => {

    await orderRepositories.deleteOrder(id)
}

const getAllOrders = async () => {
    return await orderRepositories.getAllOrders();
}

const getOrder = async (id: number) => {
    const order =  await orderRepositories.getOrder(id)

    if(!order){
        throw new Error("Produto não encontrado")
    }

    return order
}

export const orderService : OrderService = {
    //createOrder,
    //updateOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
}