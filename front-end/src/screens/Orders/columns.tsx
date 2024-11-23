import { ColumnDef } from "@tanstack/react-table"
import { LuArrowUpDown } from "react-icons/lu";

import { MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";
import {deleteOrder, updateOrder} from "@/services/api.ts";

export type Order = {
    id: number
    userId: number
    totalPrice: number
    status: "Pendente" | "Em Preparo" | "Entregue"
    createdAt: Date
}


export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "userId",
        header: "Cliente",
    },
    {
        accessorKey: "totalPrice",
        header: "Valor total",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalPrice"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return <div className="ml-4">{row.getValue("status")}</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data do pedido
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row }) => {

            const date = new Date(row.getValue("createdAt"));

            const formatted = new Intl.DateTimeFormat("en-US", {
                dateStyle: "short",
                timeStyle: "medium"
            }).format(date)

            return <div className="ml-4">{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                deleteOrder(parseInt(row.getValue("id")))
                            }}
                        >
                            Apagar pedido
                        </DropdownMenuItem>
                        <DropdownMenuItem

                        >
                            Editar pedido
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                updateOrder(row.getValue("id"), {
                                    status: "Pendente"
                                })
                            }}
                        >
                            Pendente
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                updateOrder(row.getValue("id"), {
                                    status: "Em preparo"
                                })
                            }}
                        >
                            Em preparo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                updateOrder(row.getValue("id"), {
                                    status: "Entregue"
                                })
                            }}
                        >
                            Entregue
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]