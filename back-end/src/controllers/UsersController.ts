import { Request, Response } from "express";
import {prisma} from "../index";


const getAllUser = async (req: Request, res:Response) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const createUser =  async (req: Request, res: Response) => {

    const { name, email, address, phone } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                address,
                phone,
            }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email, address, phone } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
                address,
                phone,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export default {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
