import { Request, Response } from "express";
import {prisma} from "../index";
import {orderService} from "../service/orderService";
import {OrderRequest} from "../dto/orderDto";
import {productService} from "../service/productService";


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
    /*
    const { userId, products }: OrderRequest = req.body;

    try {

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }*/
};

const updateOrder = async (req: Request, res: Response) => {
    /*const id = parseInt(req.params.id);

    const { userId, products }: OrderRequest = req.body;

    try {
        const existingOrder = await prisma.order.findUnique({
            where: { id },
            include: { OrderItem: true },
        });

        if (!existingOrder) {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }

        const productIds = products.map(product => product.productId);

        const dbProducts = await prisma.product.findMany({
            where: {
                id: { in: productIds },
            },
        });

        const productMap = dbProducts.reduce((map, product) => {
            map[product.id] = product;
            return map;
        }, {} as { [key: number]: { price: number } });


        const totalPrice = products.reduce((acc, product) => {
            const productFromDb = productMap[product.productId];
            if (productFromDb) {
                return acc + product.quantity * productFromDb.price;
            }
            return acc;
        }, 0);

        const updatedOrder = await prisma.order.update({
            where: { id},
            data: {
                userId: userId,
                totalPrice: totalPrice,
                status: status,
                OrderItem: {
                    deleteMany: {},
                    create: products.map(product => ({
                        quantity: product.quantity,
                        Product: {
                            connect: { id: product.productId },
                        },
                    })),
                },
            },
            include: {
                OrderItem: {
                    include: { Product: true },
                },
            },
        });

        const formattedOrder = {
            id: updatedOrder.id,
            totalPrice: updatedOrder.totalPrice,
            status: updatedOrder.status,
            createdAt: updatedOrder.createdAt.toISOString(),
            products: updatedOrder.OrderItem.map(item => ({
                name: item.Product?.name,
                quantity: item.quantity,
                price: item.Product?.price,
            })),
        };

        res.json(formattedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update order' });
    }*/
};

const deleteOrder = async (req: Request, res: Response) => {
    /*const orderId = parseInt(req.params.id, 10);

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
    }*/
}

export default  {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}