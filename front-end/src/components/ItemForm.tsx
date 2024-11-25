import React, {useEffect, useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CardItem} from "@/components/cardItem.tsx";
import {orderService} from "@/services/OrdersServices.ts";
import {ProductResponse, productsService} from "@/services/ProductsServices.ts";

type DialogCustomProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children?: React.ReactNode;
    userId: number | undefined
}

export type OrderItem = {
    productId: number,
    quantity: number,
    price: number,
    name: string,
}

export function ItemForm({ isOpen, onOpenChange, userId}: DialogCustomProps) {

    const [orderItem, setOrderItem] = useState<OrderItem[]>([]);
    const [products, setProducts] = useState<ProductResponse[]>([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await productsService.getAllProducts();
                setProducts(products);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);



    const handleCreateOrder = async () => {
        setIsLoading(true);

        try {
            const response = await orderService.createOrder({ userId, orderItem });

            if (response) {
                onOpenChange(false)
            } else {
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const total = orderItem.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[1000px] h-[600px] flex gap-0">
                <div className="grid grid-cols-3 w-full h-90 overflow-y-auto snap-y gap-y-5 ">
                    {products.map((item) => (
                        <CardItem key={item.id} {...item} setOrderItem={setOrderItem}/>
                    ))}
                </div>
                <div className=" h-full w-[320px] border-l-2 flex flex-col">
                    <h2 className="text-lg my-6 text-center">Meu pedido</h2>
                    <ul className="space-y-4">
                        {orderItem.map((item) => (
                            <li
                                key={item.productId}
                                className="flex justify-between items-center bg-gray-100 px-3"
                            >
                                <div className="flex">
                                    <p className="text-sm truncate w-28">{item.name}</p>
                                    <p className="text-sm text-neutral-700 ml-4">
                                        x{item.quantity}
                                    </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap">
                                    R$ {(item.quantity * item.price).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 p-4 bg-gray-200 rounded-md text-right font-bold text-lg">
                        Total: R$ {total.toFixed(2)}
                    </div>
                    <div className="flex w-full justify-center mt-4">
                        <Button type="submit" className="bg-green w-48 hover:bg-emerald-600" variant="outline" onClick={() => {
                            handleCreateOrder()
                        }}>{isLoading ? "Criando Pedido..." : "Fazer Pedido"}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
