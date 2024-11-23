import {UserRequest, UserResponse, UserService} from "../dto/userDto";
import {userRepositories} from "../repositories/userRepository";


const createUser  = async ({
                                  name, email, address, phone}: UserRequest): Promise<UserResponse> => {

    return await userRepositories.createUser({name, email, address, phone})
}

const updateUser  = async ({
                                  id,
                                  name,
                                 phone,
                              email,
                            address
                              }: UserResponse) => {

    return await  userRepositories.updateUser({   id,
        name,
        phone,
        email,
        address})
}

const deleteUser = async (
    id: number) => {

    await userRepositories.deleteUser(id)
}

const   getAllUser = async () => {
    return await userRepositories.getAllUser();
}

const getUser = async (id: number) => {
    const user =  await userRepositories.getUser(id)

    if(!user){
        throw new Error("User não encontrado")
    }

    return user
}

export const userService : UserService = {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUser,
}