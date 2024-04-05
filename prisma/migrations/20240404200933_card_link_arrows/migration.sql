/*
  Warnings:

  - You are about to drop the column `linkArrowsId` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_linkArrowsId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "linkArrowsId";

-- CreateTable
CREATE TABLE "LinkArrowsCard" (
    "id" TEXT NOT NULL,
    "linkArrowsId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "LinkArrowsCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LinkArrowsCard" ADD CONSTRAINT "LinkArrowsCard_linkArrowsId_fkey" FOREIGN KEY ("linkArrowsId") REFERENCES "LinkArrows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkArrowsCard" ADD CONSTRAINT "LinkArrowsCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
