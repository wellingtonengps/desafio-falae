import React from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CardItem} from "@/components/cardItem.tsx";



type DialogCustomProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children?: React.ReactNode;
}

export function CreateItemForm({ isOpen, onOpenChange, title, children }: DialogCustomProps) {

    const handleQuantityChange = (quantity: number) => {
        console.log("Quantidade selecionada:", quantity);
    };

    const items = [
        { id: 1, name: "Produto A", quantity: 2, price: 50 },
        { id: 2, name: "Produto B", quantity: 1, price: 100 },
        { id: 3, name: "Produto C", quantity: 3, price: 30 },
    ];

    const item = {
        id: 1,
        name: "Pizza Margherita",
        category: "Prato Principal",
        price: 25.99,
        description: "Clássica pizza italiana",
    };

    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px] h-[600px]">
                <div className="flex">
                    <div className="bg-blue h-full w-full">
                        <CardItem {...item} onQuantityChange={handleQuantityChange}/>
                    </div>
                    <div className="bg-amber-500 h-full w-[400px] border-l-2">
                        <h2 className="text-lg my-6 text-center">Meu pedido</h2>
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between items-center bg-gray-100 px-3"
                                >
                                    <div className="flex">
                                        <p>{item.name}</p>
                                        <p className="text-neutral-700 ml-4">
                                            x{item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        R$ {(item.quantity * item.price).toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 bg-gray-200 rounded-md text-right font-bold text-lg">
                            Total: R$ {total.toFixed(2)}
                        </div>
                        <div className="flex w-full justify-center mt-4">
                            <Button className="bg-green w-48" variant="outline" onClick={() => {}}>Fechar pedido</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
