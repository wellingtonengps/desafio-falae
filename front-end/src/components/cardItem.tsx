import React, {useState} from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {OrderItem} from "@/components/ItemForm.tsx";

interface CardItemProps {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
    imageUrl?: string;
    setOrderItem:  React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export function CardItem({id, name, category, price, description, imageUrl, setOrderItem }: CardItemProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);


    const handleChangeItem = () => {
        setOrderItem((prevOrder) => {
            const existingItemIndex = prevOrder.findIndex((item) => item.productId === id);
            if (existingItemIndex !== -1) {
                return prevOrder.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: quantity + 1 }
                        : item
                );
            }
            return [...prevOrder, { productId: id, price, quantity: quantity + 1, name }];
        });
    }


    return (
        <>
            <div
                className={`border rounded-lg p-4 shadow-md flex flex-col h-[200px] w-[180px] items-center hover:shadow-lg transition cursor-pointer ${
                    quantity > 0 ? "border-red border-2" : "border-gray-300"
                }`}
                onClick={() => setIsDialogOpen(true)}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-24 h-24 object-cover rounded-md"
                    />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md">
                        <span className="text-gray-500 text-2xl">📦</span>
                    </div>
                )}
                <h3 className="mt-4 text-sm font-semibold">{name}</h3>
                <p className="text-sm font-bold text-green-600">R$ {price.toFixed(2)}</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[300px] max-h-[500px]">
                    <div className="flex flex-col items-center">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        ) : (
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md">
                                <span className="text-gray-500 text-4xl">📦</span>
                            </div>
                        )}
                        <h2 className="mt-4 text-xl font-bold">{name}</h2>
                        <p className="text-sm text-gray-500 mb-2">{category}</p>
                        <p className="text-sm text-gray-700 text-center px-4">{description}</p>
                        <p className="mt-4 text-lg font-bold text-green-600">
                            Preço: R$ {price.toFixed(2)}
                        </p>

                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                onClick={() => {
                                    setQuantity(quantity-1)
                                    handleChangeItem()
                                }}
                                className="px-3 py-1 bg-red rounded-md"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                onClick={() => {
                                    setQuantity(quantity+1)
                                    handleChangeItem()
                                }}
                                className="px-3 py-1 bg-red rounded-md"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
