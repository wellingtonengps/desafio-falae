import { prisma } from "../index";
import { OrderRepository, OrderRequest, OrderResponse } from "../dto/orderDto";

const createOrder= async ({  orderItem, userId}: OrderRequest) =>{
    // Start a transaction to ensure all operations are executed atomically
    const order= await prisma.$transaction(async (prisma) => {
        // Create the order
        const createdOrder = await prisma.order.create({
            data: {
                totalPrice: 0, // We'll update this after creating the order items
                status: 'pending', // Assuming the initial status is 'pending'
                userId: userId,
                OrderItem: {
                    create: orderItem.map(item => ({
                        quantity: item.quantity,
                        productId: item.productId,
                    })),
                },
            },
        });

        // Calculate the total price
        const totalPrice = await Promise.all(
            orderItem.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId ?? undefined },
                });
                return (product?.price || 0) * item.quantity;
            })
        ).then(prices => prices.reduce((sum, price) => sum + price, 0));

        // Update the order with the calculated total price
        const updatedOrder = await prisma.order.update({
            where: { id: createdOrder.id },
            data: { totalPrice },
        });

        return updatedOrder;
    });

    // Get the OrderItem details along with the associated Product information
    const orderItems = await prisma.orderItem.findMany({
        where: { orderId: order.id },
        include: {
            Product: true, // Include the related product details
        },
    });

    // Return the final order response
    return {
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        orderItem: orderItems,
    };
};

const updateOrder = async ({ id, status, totalPrice, orderItem }: OrderResponse): Promise<OrderResponse> => {
    // Start a transaction to ensure atomic updates
    const updatedOrder = await prisma.$transaction(async (prisma) => {
        // Update the main Order record with new status and total price
        const order = await prisma.order.update({
            where: { id },
            data: {
                status: status ?? undefined, // Only update status if provided
                totalPrice: totalPrice ?? undefined, // Only update totalPrice if provided
            },
        });

        // If order items are provided, we need to update or create them
        if (orderItem && orderItem.length > 0) {
            await Promise.all(
                orderItem.map(async (item) => {
                    if (item.id) {
                        // If the order item exists (id is provided), update it
                        await prisma.orderItem.update({
                            where: { id: item.id },
                            data: {
                                quantity: item.quantity,
                                productId: item.productId,
                            },
                        });
                    } else {
                        // If the order item does not exist, create a new one
                        await prisma.orderItem.create({
                            data: {
                                orderId: id,
                                quantity: item.quantity,
                                productId: item.productId,
                            },
                        });
                    }
                })
            );
        }

        // Return the updated order object
        return order;
    });

    // Fetch the updated order details including OrderItems and Product details
    const updatedOrderItems = await prisma.orderItem.findMany({
        where: { orderId: updatedOrder.id },
        include: {
            Product: true, // Include Product details for each order item
        },
    });

    // Return the final updated OrderResponse
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
    // Fetch all orders with associated order items and products
    const orders = await prisma.order.findMany({
        include: {
            OrderItem: {
                include: {
                    Product: true, // Include product details for each order item
                },
            },
        },
    });

    // Map through the fetched orders and format them into the OrderResponse structure
    return orders.map((order) => ({
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
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
    // Fetch the order by its ID, including the related order items and product details
    const order = await prisma.order.findUnique({
        where: { id }, // Find the order by ID
        include: {
            OrderItem: {
                include: {
                    Product: true, // Include product details for each order item
                },
            },
        },
    });

    // If the order is not found, return null
    if (!order) {
        throw new Error('Pedido não encontrado');
    }

    // Format the order and return the response
    return {
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
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
