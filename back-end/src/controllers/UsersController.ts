import { Request, Response } from "express";
import {prisma} from "../index";
import {userService} from "../service/userService";


const getAllUser = async (req: Request, res:Response) => {
    try {
        const users= await userService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar os usuários' });
    }
};

const getUser = async (req: Request, res: Response) => {
    const id =  parseInt(req.params.id);

    try {
        const user = await userService.getUser(id)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar o usuário ' });
    }
};

const createUser =  async (req: Request, res: Response): Promise<void> => {

    const { name, email, address, phone } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({ error: "Esse e-mail já esta sendo utilizado" });
            return;
        }

        const user = await userService.createUser({name, email, address, phone});

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Falha ao criar o usuário" });
    }
}

const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email, address, phone } = req.body;

    try {
        const user = await userService.updateUser({id, name, email, address, phone })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao atualizar o usuário' });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const id  = parseInt(req.params.id);

    try {
        await userService.deleteUser(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar o usuário' });
    }
};

export default {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
