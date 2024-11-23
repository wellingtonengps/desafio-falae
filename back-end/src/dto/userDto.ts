type UserResponse = {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string | null
}

type UserRequest = {
    name: string,
    email: string,
    address: string,
    phone: string | null
}


interface UserService {
    createUser({ name, email, address, phone}: UserRequest): Promise<UserResponse>;
    updateUser({ id, name, email, address, phone}: UserResponse): Promise<UserResponse>;
    deleteUser(id: number): Promise<void>;
    getAllUser(): Promise<UserResponse[]>;
    getUser(id: number): Promise<UserResponse | null>;
}

interface UserRepository {
    createUser({ name, email, address, phone}: UserRequest): Promise<UserResponse>;
    updateUser({ id, name, email, address, phone}: UserResponse): Promise<UserResponse>;
    deleteUser(id: number): Promise<void>;
    getAllUser(): Promise<UserResponse[]>;
    getUser(id: number): Promise<UserResponse | null>;
}

export {UserResponse, UserRequest, UserService, UserRepository}


