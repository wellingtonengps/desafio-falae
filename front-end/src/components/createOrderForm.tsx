"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useState} from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {ItemForm} from "@/components/ItemForm.tsx";
import {UserResponse, userService} from "@/services/UserServices.ts";
import {CreateUserForm} from "@/components/createUserForm.tsx";
import {DialogCustom} from "@/components/dialogCustom.tsx";

const formSchema = z.object({
    userId: z.number().optional(),
    username: z.string().optional(),
    orderItem: z
        .array(
            z.object({
                productId: z.number().min(1, "Selecione um produto válido."),
                quantity: z.number().min(1, "Quantidade deve ser maior que 0."),
            })
        )
        .nonempty("Adicione ao menos um item ao pedido."),
});

export function CreateOrderForm({ onClose }: { onClose: () => void }) {
    const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isItemFormOpen, setIsItemFormOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { control, handleSubmit, setValue, watch } = form;

    const selectedUserId = watch("userId");

    const searchUsers = async () => {
        if (!searchQuery.trim()) {
            setFilteredUsers([]);
            return;
        }

        try {
            const users = await userService.getAllUser(); // Faz a busca no serviço
            const result = users.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(result);
        } catch (error) {
            console.error("Falha ao buscar usuários:", error);
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        onClose();
        alert("Pedido criado com sucesso!");
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={control}
                    name="userId"
                    render={() => (
                        <FormItem>
                            <FormLabel>Selecionar Cliente</FormLabel>
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
                                Escolha um cliente já existente ou crie um novo.
                            </FormDescription>
                        </FormItem>
                    )}
                />

                {filteredUsers.length > 0 && (
                    <ul className="mt-2">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                className="cursor-pointer hover:bg-zinc-200 p-2"
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

                <div className="flex flex-col">
                    <Button
                        type="button"
                        onClick={() => setIsCreatingUser(true)}
                        variant="outline"
                        className="mt-4"
                    >
                        Criar Novo Usuário
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setIsItemFormOpen(true)}
                        variant="outline"
                        className="mt-2 bg-yellow hover:bg-red "
                        disabled={!selectedUserId}
                    >
                        Escolher itens
                    </Button>
                </div>

                <DialogCustom isOpen={isCreatingUser} onOpenChange={setIsCreatingUser}>
                    <CreateUserForm onClose={() => setIsCreatingUser(false)} />
                </DialogCustom>
                <ItemForm onOpenChange={setIsItemFormOpen} isOpen={isItemFormOpen} userId={selectedUserId} />
            </form>
        </Form>
    );
}
