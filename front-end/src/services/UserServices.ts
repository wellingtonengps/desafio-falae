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


export async function createUser(userRequest: UserRequest ): Promise<UserResponse> {
    try {
        const response: AxiosResponse<UserResponse> = await api.post("/api/auth/register", userRequest);
        console.log(response.data)

        return response.data
    }catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}