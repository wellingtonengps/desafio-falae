import { prisma } from "../index";
import { OrderRepository, OrderRequest, OrderResponse } from "../dto/orderDto";
import {productService} from "../service/productService";

const createOrder = async ({ userId, products }: OrderRequest) => {

    /*
    const productIds = products.map(product => product.productId);

    const dbProducts = await productService.getAllProduct();

    const productMap = dbProducts.reduce((map, product) => {
        map[product.id] = product;
        return map;
    }, {} as { [key: number]: { price: number } });

    const totalPrice = products.reduce((acc, product) => {
        const productFromDb = productMap[product.productId];
        if (productFromDb) {
            return acc + (product.quantity * productFromDb.price);
        }
        return acc;
    }, 0);

   return prisma.order.create({
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
    });*/
};

const updateOrder = async ({ id, OrderItem }: OrderResponse) => {
    return prisma.order.update({
        where: { id },
        data: {
            OrderItem: {
                upsert: OrderItem.map(item => ({
                    where: { id: item.id },
                    create: {
                        productId: item.productId!,
                        quantity: item.quantity,
                    },
                    update: {
                        quantity: item.quantity,
                    },
                })),
            },
        },
        include: {
            OrderItem: {
                include: {
                    Product: true,
                },
            },
        },
    });
};

const deleteOrder = async (id: number): Promise<void> => {
    await prisma.order.delete({
        where: { id },
    });
};

const getAllOrders = async () => {
   return prisma.order.findMany({
        include: {
            OrderItem: {
                include: {
                    Product: true,
                },
            },
        },
    });
};

const getOrder = async (id: number) => {
    return prisma.order.findUnique({
        where: { id },
        include: {
            OrderItem: {
                include: {
                    Product: true,
                },
            },
        },
    });

};

export const orderRepositories: OrderRepository = {
    //createOrder,
    //updateOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
};
