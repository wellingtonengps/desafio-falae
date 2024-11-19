import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
import {useEffect, useState} from "react";

async function getData(): Promise<Order[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            totalPrice: 56.99,
            status: "Pendente",
            createdAt: new Date("2024-11-06T12:34:56Z"),
            userId: "Wellington Pereira"
        },
        {
            id: 2,
            totalPrice: 62.99,
            status: "Entregue",
            createdAt: new Date("2024-11-06T12:34:56Z"),
            userId: "Gabriela Souza"
        },
        {
            id: 2,
            totalPrice: 62.99,
            status: "Entregue",
            createdAt: new Date("2024-12-06T12:34:56Z"),
            userId: "Samuel Torres"
        },
        {
            id: 2,
            totalPrice: 15.99,
            status: "Entregue",
            createdAt: new Date("2024-12-03T12:34:56Z"),
            userId: "Vanessa Silva"
        },
        {
            id: 2,
            totalPrice: 15.99,
            status: "Entregue",
            createdAt: new Date("2024-12-07T12:34:56Z"),
            userId: "Pedro Carlos"
        },
    ]
}

function Orders() {

    const [data, setData] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getData()
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
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Orders
