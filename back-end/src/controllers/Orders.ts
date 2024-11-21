import { Request, Response } from "express";
import {prisma} from "../index";
//todo: adicionar prisma


const getAllOrders = async (req, res) => {

    try {
        const orders =await prisma.order.findMany({
            include: {
                OrderItem: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        const formattedOrder = orders.map(order => ({
            id: order!.id,
            totalPrice: order!.totalPrice,
            status: order!.status,
            createdAt: order!.createdAt.toISOString(),
            products: order!.OrderItem.map(item => ({
                name: item.Product!.name,
                quantity: item.quantity,
                price: item.Product!.price,
            })),
        }));

        res.json(formattedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getOrder =  async (req, res) => {
    const { id } = req.params;

    try{
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                OrderItem: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        const formattedOrder = {
            id: order!.id,
            totalPrice: order!.totalPrice,
            status: order!.status,
            createdAt: order!.createdAt.toISOString(),
            products: order!.OrderItem.map(item => ({
                name: item.Product!.name,
                quantity: item.quantity,
                price: item.Product!.price,
            })),
        };


        res.json(formattedOrder);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

const createOrder = async (req,res) => {

    const { userId, products }: { userId: number; products: productType[] } = req.body;

    try {

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
                return acc + (product.quantity * productFromDb.price); // Multiplica a quantidade pelo preço do produto
            }
            return acc;
        }, 0);

        const order = await prisma.order.create({
            data: {
                userId: userId,
                totalPrice: totalPrice,
                status: "Pendente",
                OrderItem: {
                    create: products.map(product => ({
                        quantity: product.quantity,
                        Product: {
                            connect: { id: product.productId },
                        },
                    })),
                },
            }
        });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

const updateOrder = async (req, res) => {
    const orderId = parseInt(req.params.id);
    const { userId, products }: { userId: number; products: productType[] } = req.body;

    try {
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId },
            include: { OrderItem: true },
        });

        if (!existingOrder) {
            res.status(404).json({ error: 'Order not found' });
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
            where: { id: orderId },
            data: {
                userId: userId,
                totalPrice: totalPrice,
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
    }
};

const deleteOrder = async (req, res) => {
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