import {AxiosResponse} from "axios";
import {api} from "@/services/api.ts";

export type UserRequest = {
    name: string,
    email: string,
    address: string,
    phone?: string,
}

export type UserResponse = {
    id: number
    name: string,
    email: string,
    address: string,
    phone?: string,
}


interface UserService {
    getUser(id: number): Promise<UserResponse | null>;
    createUser(userRequest : UserRequest): Promise<UserResponse>;
}

const createUser = async (userRequest: UserRequest ): Promise<UserResponse> => {
    try {
        const response: AxiosResponse<UserResponse> = await api.post("/api/auth/register", userRequest);
        console.log(response.data)

        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

const getUser = async  (id: number) => {
    try {
        const response: AxiosResponse<UserResponse> = await api.get(`/api/auth/register${id}`,);
        console.log(response.data)
        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}


export const userService : UserService = {
    getUser,
    createUser
}