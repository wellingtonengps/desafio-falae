import {productRepositories} from "../repositories/productRepository";
import {ProductRequest, ProductResponse, ProductService} from "../dto/productDto";





const createProduct  = async ({
                           name,
                           price,
                           category,
                           description,
                           imageUrl}: ProductRequest): Promise<ProductResponse> => {

    return await productRepositories.createProduct({name, price, category, description, imageUrl})
}

const updateProduct  = async ({
                           id,
                           name,
                           price,
                           category,
                           description,
                           imageUrl}: ProductResponse) => {

    return await  productRepositories.updateProduct({id,name, price, category, description, imageUrl})
}

const deleteProduct = async (
                           id: number) => {

    await productRepositories.deleteProduct(id)
}

const   getAllProduct = async () => {
    return await productRepositories.getAllProduct();
}

const getProduct = async (id: number) => {
    const product =  await productRepositories.getProduct(id)

    if(!product){
        throw new Error("Produto não encontrado")
    }

    return product
}

export const productService : ProductService = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
}