import { columns } from "./columns"
import { DataTable } from "./data-table"
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"

import {DialogCustom} from "@/components/dialogCustom.tsx";
import {OrderResponse, orderService} from "@/services/OrdersServices.ts";
import {CreateOrderForm} from "@/components/createOrderForm.tsx";


function Orders() {

    const [data, setData] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await orderService.getAllOrders()
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
                <Button className="bg-red" variant="outline" onClick={() => setIsModalOpen(true)}>Criar pedido</Button>
            </div>
            <DataTable columns={columns} data={data}/>
            <DialogCustom isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <CreateOrderForm onClose={() => setIsModalOpen(false)}/>
            </DialogCustom>
        </div>
    )
}

export default Orders
