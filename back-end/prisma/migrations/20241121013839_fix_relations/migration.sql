/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderItemId_fkey";

-- DropIndex
DROP INDEX "Product_orderItemId_key";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderItemId";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
