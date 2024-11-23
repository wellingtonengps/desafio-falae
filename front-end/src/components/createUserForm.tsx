import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {createUser, UserRequest} from "@/services/UserServices.ts";


const formSchema = z.object({
    name: z.string().min(2, { message: "Não é permitido nome com 2 caracteres" }),
    email: z
        .string()
        .email({ message: "E-mail inválido" })
        .nonempty({ message: "E-mail é obrigatório" }),
    address: z.string().nonempty({ message: "Endereço obrigatório" }),
    phone: z
        .string()
        .min(9, { message: "O número de telefone tem que ser maior que 9" })
        .max(15, { message: "O número de telefone é menor que 15" }),
})

export function CreateUserForm({ onClose }: { onClose: () => void}) {

    const form  = useForm<UserRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            phone: "",
        },
    })

    async function onSubmit(values: UserRequest) {
        try {
            await createUser(values);
            onClose();
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data?.error;

                if (errorMessage === "Esse e-mail já esta sendo utilizado") {
                    form.setError("email", { type: "manual", message: errorMessage });
                }
            } else {
                console.error("Error ao criar o usuário:", error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                                <Input placeholder="Rua Fictícia, 123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Criar</Button>
            </form>
        </Form>
    )
}
