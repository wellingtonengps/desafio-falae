import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
import {useEffect, useState} from "react";
import {getAllProducts} from "@/services/api.ts";



function Orders() {

    const [data, setData] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getAllProducts()
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
