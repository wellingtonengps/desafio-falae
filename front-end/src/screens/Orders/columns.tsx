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
import {OrderResponse, orderService} from "@/services/OrdersServices.ts";


export const columns: ColumnDef<OrderResponse>[] = [
    {
        accessorKey: "id",
        header: "Código",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "user",
        header: "Cliente",
        cell: ({ row }) => {
            const user = row.getValue("user") as { name: string };
            return <div>{user.name}</div>;
        },
        filterFn: (row, columnId, filterValue) => {
            const user = row.getValue(columnId) as { name: string };
            return user.name.toLowerCase().includes(filterValue.toLowerCase());
        },
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
                            onClick={async () => {
                                await orderService.updateOrder({
                                    id: row.getValue("id"),
                                    status: "Pendente",
                                })
                            }}
                        >
                            Pendente
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async  () => {
                                await orderService.updateOrder({
                                    id: row.getValue("id"),
                                    status: "Em preparo",
                                })
                            }}
                        >
                            Em preparo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                await orderService.updateOrder({
                                    id: row.getValue("id"),
                                    status: "Entregue",
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