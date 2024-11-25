import {
    ColumnDef,
    SortingState,
    getSortedRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from "react";
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "createdAt", desc: true }
    ])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [selectedItem, setSelectedItem] = React.useState<TData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const handleRowClick = (item: TData) => {
        console.log(item)
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Busque pelo cliente..."
                    value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("user")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleRowClick(row.original)}
                                    className="cursor-pointer hover:bg-zinc-200"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próxima
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalhes do Pedido</DialogTitle>
                        <DialogDescription>
                            Informações do cliente e itens do pedido.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold">Dados do Cliente</h2>
                                <p><strong>Nome:</strong> {selectedItem.user.name}</p>
                                <p><strong>Endereço:</strong> {selectedItem.user.address}</p>
                                <p><strong>Telefone:</strong> {selectedItem.user.phone}</p>
                                <p><strong>E-mail:</strong> {selectedItem.user.email}</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Itens do Pedido</h2>
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-2 py-1 text-left">Produto</th>
                                        <th className="border border-gray-300 px-2 py-1 text-right">Quantidade</th>
                                        <th className="border border-gray-300 px-2 py-1 text-right">Preço</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedItem.orderItem.map((item) => (
                                        <tr key={item.id}>
                                            <td className="border border-gray-300 px-2 py-1">{item.Product.name}</td>
                                            <td className="border border-gray-300 px-2 py-1 text-right">{item.quantity}</td>
                                            <td className="border border-gray-300 px-2 py-1 text-right">
                                                R$ {(item.Product.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <p className="mt-4 text-right text-lg font-semibold">
                                    <strong>Total:</strong> R$ {selectedItem.totalPrice.toFixed(2)}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Outras Informações</h2>
                                <p><strong>Status do Pedido:</strong> {selectedItem.status}</p>
                                <p><strong>Data de Criação:</strong> {new Date(selectedItem.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsDialogOpen(false)}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>

    )
}
