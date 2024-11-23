import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
import React, {useEffect, useState} from "react";
import {getAllOrders} from "@/services/api.ts";
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input.tsx";
import {getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table";

import {DialogCustom} from "@/components/dialogCustom.tsx";
import {CreateUserForm} from "@/components/createUserForm.tsx";


function Orders() {

    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getAllOrders()
                console.log(fetchedData)
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex py-4 justify-start">
                <div className="flex items-center">
                    <Input
                        placeholder="Buscar por cliente..."
                        value={(table.getColumn("userId")?.getFilterValue() as string) ?? ""}

                        onChange={(event) =>
                            table.getColumn("userId")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm w-80"
                    />
                </div>
                <Button className="ml-10 bg-red" variant="outline" onClick={() => setIsModalOpen(true)}>Criar pedido</Button>
            </div>
            <DataTable columns={columns} data={data}/>
            <DialogCustom isOpen={isModalOpen} onOpenChange={setIsModalOpen} title="Criar usuário">
                <CreateUserForm onClose={() => setIsModalOpen(false)}/>
            </DialogCustom>
        </div>
    )
}

export default Orders
