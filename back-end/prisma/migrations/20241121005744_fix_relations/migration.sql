/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderItemId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderItemId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productId",
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderItemId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_orderItemId_key" ON "Product"("orderItemId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
