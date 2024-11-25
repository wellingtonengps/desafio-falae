import {AxiosResponse} from "axios";
import {api} from "@/services/api.ts";

export type ProductResponse = {
    id: number
    name: string,
    price: number,
    category: string,
    description: string | null,
    imageUrl: string | null,
}


interface ProductsService {
    getAllProducts(): Promise<ProductResponse[]>;
}


const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response: AxiosResponse<ProductResponse[]> = await api.get("/api/products");
        return response.data
    }catch (error) {
        throw error;
    }
}



export const productsService : ProductsService = {
    getAllProducts,
}