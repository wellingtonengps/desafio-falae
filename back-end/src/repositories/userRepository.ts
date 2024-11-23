import {prisma} from "../index";
import {UserRepository, UserRequest, UserResponse} from "../dto/userDto";


const createUser = async ({name, email, address, phone} : UserRequest) => {
    return prisma.user.create({
        data: {
            name, email, address, phone
        }
    });

}

const updateUser = async ({id, name, email, address, phone}: UserResponse) => {
    return prisma.user.update({
        where: {id},
        data: {name, email, address, phone}
    });
}

const deleteUser  = async (id: number) => {
    await prisma.user.delete({
        where: { id}
    })
}

const getAllUser = async () => {
    return prisma.user.findMany();
}

const getUser = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}


export const userRepositories : UserRepository = {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUser
}