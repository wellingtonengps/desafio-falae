import {prisma} from "../index";
import {Product} from "@prisma/client";
import {ProductRepository, ProductRequest, ProductResponse} from "../dto/productDto";


const createProduct = async ({name, price, category, description, imageUrl}: ProductRequest) => {
    return prisma.product.create({
        data: {
            name, price, category, description, imageUrl
        }
    });

}

const updateProduct = async ({id, name, price, category, description, imageUrl}:ProductResponse) => {
    return prisma.product.update({
        where: {id},
        data: {name, price, category, description, imageUrl}
    });
}

const deleteProduct  = async (id: number) => {
    await prisma.product.delete({
        where: { id}
    })
}

const getAllProduct = async () => {
    return prisma.product.findMany();
}

const getProduct = async (id: number) => {
    return prisma.product.findUnique({
        where: {
            id
        }
    });
}


export const productRepositories : ProductRepository = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProduct
}