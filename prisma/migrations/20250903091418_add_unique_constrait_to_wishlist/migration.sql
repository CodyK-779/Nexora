/*
  Warnings:

  - A unique constraint covering the columns `[wishListId,productId]` on the table `wishListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wishListItem_wishListId_productId_key" ON "public"."wishListItem"("wishListId", "productId");
