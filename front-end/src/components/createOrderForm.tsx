"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {CreateItemForm} from "@/components/createItemForm.tsx";

// Esquema de validação para o formulário
const formSchema = z.object({
    userId: z.number().optional(), // O ID do usuário selecionado
    username: z.string().optional(), // Para criar um novo usuário
    orderItem: z
        .array(
            z.object({
                productId: z.number().min(1, "Selecione um produto válido."),
                quantity: z.number().min(1, "Quantidade deve ser maior que 0."),
            })
        )
        .nonempty("Adicione ao menos um item ao pedido."),
});

// Dados simulados de usuários e produtos
const mockUsers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];

const mockProducts = [
    { id: 1, name: "Produto A" },
    { id: 2, name: "Produto B" },
    { id: 3, name: "Produto C" },
];

export function CreateOrderForm({ onClose }: { onClose: () => void}) {

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderItem: [{ productId: 0, quantity: 0 }], // Valor inicial para itens do pedido
        },
    });

    const { control, handleSubmit, setValue } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "orderItem",
    });

    const searchUsers = () => {
        const result = mockUsers.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(result);
    };


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        onClose();
        alert("Pedido criado com sucesso!");
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {!isCreatingUser ? (
                    <>
                        <FormField
                            control={control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Selecionar Usuário</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Pesquisar nome..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        onClick={searchUsers}
                                        className="mt-2"
                                    >
                                        Pesquisar
                                    </Button>
                                    <FormDescription>
                                        Escolha um usuário já existente ou crie um novo.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />


                        {filteredUsers.length > 0 && (
                            <ul className="mt-2">
                                {filteredUsers.map((user) => (
                                    <li
                                        key={user.id}
                                        className="cursor-pointer hover:bg-gray-100 p-2 bg-amber-500"
                                        onClick={() => {
                                            setValue("userId", user.id);
                                            setSearchQuery(user.name);
                                            setFilteredUsers([]);
                                        }}
                                    >
                                        {user.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Button
                            type="button"
                            onClick={() => setIsCreatingUser(true)}
                            variant="outline"
                            className="mt-4"
                        >
                            Criar Novo Usuário
                        </Button>
                    </>
                ) : (
                    <FormField
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Criar Novo Usuário</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do Usuário" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Digite o nome do novo usuário.
                                </FormDescription>
                                <Button
                                    type="button"
                                    onClick={() => setIsCreatingUser(false)}
                                    variant="outline"
                                    className="mt-2"
                                >
                                    Voltar à Seleção
                                </Button>
                            </FormItem>
                        )}
                    />
                )}

                <Button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="mt-2 bg-red"
                >
                   Escolhe itens
                </Button>

                <CreateItemForm onOpenChange={setIsModalOpen} isOpen={isModalOpen} title="Escolha seus itens"/>

                <Button type="submit" className="w-full">
                    Criar Pedido
                </Button>
            </form>
        </Form>
    );
}
