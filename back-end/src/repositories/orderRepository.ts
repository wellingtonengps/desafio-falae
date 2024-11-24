import {prisma} from "../index";
import {OrderRepository, OrderRequest, OrderResponse} from "../dto/orderDto";

const createOrder= async ({  orderItem, userId}: OrderRequest) =>{
    const order= await prisma.$transaction(async (prisma) => {
        const createdOrder = await prisma.order.create({
            data: {
                totalPrice: 0,
                status: "Pendente",
                user: {
                    connect: {
                        id: userId
                    }
                },
                OrderItem: {
                    create: orderItem.map(item => ({
                        quantity: item.quantity,
                        productId: item.productId,
                    })),
                },
            },
        });

        const totalPrice = await Promise.all(
            orderItem.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId ?? undefined },
                });
                return (product?.price || 0) * item.quantity;
            })
        ).then(prices => prices.reduce((sum, price) => sum + price, 0));

        return prisma.order.update({
            where: {id: createdOrder.id},
            data: {totalPrice},
            include: {
                user: true
            }
        });
    });

    const orderItems = await prisma.orderItem.findMany({
        where: { orderId: order.id },
        include: {
            Product: true,
        },
    });

    return {
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        orderItem: orderItems,
        user: order.user,
    };
};

const updateOrder = async ({ id, status, totalPrice, orderItem }: OrderResponse): Promise<OrderResponse> => {
    const updatedOrder = await prisma.$transaction(async (prisma) => {

        const order = await prisma.order.update({
            where: { id },
            data: {
                status: status ?? undefined,
                totalPrice: totalPrice ?? undefined,
            },
        });

        if (orderItem && orderItem.length > 0) {
            await Promise.all(
                orderItem.map(async (item) => {
                    if (!item.id) {
                        console.log('Item não encotrado no pedido');
                        return;
                    }

                    const existingOrderItem = await prisma.orderItem.findUnique({
                        where: { id: item.id },
                    });

                    if (existingOrderItem) {
                        await prisma.orderItem.update({
                            where: { id: item.id },
                            data: {
                                quantity: item.quantity,
                                productId: item.productId,
                            },
                        });
                    }
                })
            );
        }

        const updatedTotalPrice = await Promise.all(
            orderItem.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId ?? undefined },
                });
                return (product?.price || 0) * item.quantity;
            })
        ).then(prices => prices.reduce((sum, price) => sum + price, 0));


        return prisma.order.update({
            where: {id: order.id},
            data: {totalPrice: updatedTotalPrice},
        });
    });


    const updatedOrderItems = await prisma.orderItem.findMany({
        where: { orderId: updatedOrder.id },
        include: {
            Product: true,
        },
    });

    return {
        id: updatedOrder.id,
        status: updatedOrder.status,
        totalPrice: updatedOrder.totalPrice,
        createdAt: updatedOrder.createdAt,
        orderItem: updatedOrderItems,
    };
};




const deleteOrder = async (id: number): Promise<void> => {
    await prisma.order.delete({
        where: { id },
    });
};

const getAllOrders = async (): Promise<OrderResponse[]> => {
    const orders = await prisma.order.findMany({
        include: {
            OrderItem: {
                include: {
                    Product: true,
                },
            },
            user: true
        },
    });

    return orders.map((order) => ({
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        user: order.user,
        orderItem: order.OrderItem.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            orderId: item.orderId,
            Product:item.Product ? {
                id: item.Product.id,
                name: item.Product.name,
                price: item.Product.price,
                category: item.Product.category,
                description: item.Product.description,
                imageUrl: item.Product.imageUrl,
            } : null,
        })),
    }));
};


const getOrder = async (id: number): Promise<OrderResponse | null> => {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            OrderItem: {
                include: {
                    Product: true,
                },
            },
            user: true
        },
    });

    if (!order) {
        throw new Error('Pedido não encontrado');
    }

    return {
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        user: order.user,
        orderItem: order.OrderItem.map((item) => ({
            id: item.id,
            productId: item.productId || null,
            quantity: item.quantity,
            orderId: item.orderId,
            Product: item.Product?.id ? {
                id: item.Product.id,
                name: item.Product.name,
                price: item.Product.price,
                category: item.Product.category,
                description: item.Product.description,
                imageUrl: item.Product.imageUrl
            } : null,
        })),
    };
};


export const orderRepositories: OrderRepository = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
};
