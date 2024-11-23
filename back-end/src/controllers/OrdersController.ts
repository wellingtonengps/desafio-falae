import { Request, Response } from "express";
import {prisma} from "../index";
import {orderService} from "../service/orderService";


const getAllOrders = async (req: Request, res: Response) => {

    try {
        const order = await orderService.getAllOrders();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar os pedidos' });
    }
};

const getOrder =  async (req: Request, res: Response) => {
    const id  = parseInt(req.params.id);

    try{
        const order = await orderService.getOrder(id)
        res.status(200).json(order);
    }catch (error) {
        res.status(500).json({ error: 'Falha ao buscar o pedido' });
    }
};

const createOrder = async (req: Request, res: Response) => {

    const { userId, orderItem} = req.body;

    try {
        const order = await orderService.createOrder({userId, orderItem})
        console.log(order)
        res.status(201).json(order)
    }catch (error) {
        res.status(500).json({ error: 'Falha ao criar pedido' });
    }
};

const updateOrder = async (req: Request, res: Response) => {

    const id  = parseInt(req.params.id);
    const {  orderItem, totalPrice, createdAt, status } = req.body;

    try {
        const order = await orderService.updateOrder({id, orderItem, totalPrice, createdAt, status})
        res.status(201).json(order)
    }catch (error) {
        res.status(500).json({ error: 'Falha ao criar pedido' });
    }
};

const deleteOrder = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id, 10);

    try {
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!existingOrder) {
            res.status(404).json({ error: 'Order not found' });
        }

        await prisma.order.delete({
            where: { id: orderId },
        });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
}

export default  {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}