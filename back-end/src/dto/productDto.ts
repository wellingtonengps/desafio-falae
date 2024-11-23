import {Product} from "@prisma/client";

type ProductResponse = {
    id: number
    name: string,
    price: number,
    category: string,
    description: string | null,
    imageUrl: string | null,
}

type ProductRequest = {
    name: string,
    price: number,
    category: string,
    description: string | null,
    imageUrl: string | null,
}


interface ProductRepository {
    createProduct({ name, price, category, description, imageUrl}: ProductRequest): Promise<ProductResponse>;
    updateProduct({ id, name, price, category, description, imageUrl}: ProductResponse): Promise<ProductResponse>;
    deleteProduct(id: number): Promise<void>;
    getAllProduct(): Promise<ProductResponse[]>;
    getProduct(id: number): Promise<ProductResponse | null>;
}

interface ProductService {
    createProduct({ name, price, category, description, imageUrl}: ProductRequest): Promise<ProductResponse>;
    updateProduct({ id, name, price, category, description, imageUrl}: ProductResponse): Promise<ProductResponse>;
    deleteProduct(id: number): Promise<void>;
    getAllProduct(): Promise<ProductResponse[]>;
    getProduct(id: number): Promise<ProductResponse>;
}

export {ProductResponse, ProductRequest, ProductRepository, ProductService}