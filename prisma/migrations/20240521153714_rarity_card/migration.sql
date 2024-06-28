/*
  Warnings:

  - You are about to drop the column `rarityId` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_rarityId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "rarityId";

-- CreateTable
CREATE TABLE "RarityCard" (
    "id" TEXT NOT NULL,
    "RarityId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "RarityCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RarityCard" ADD CONSTRAINT "RarityCard_RarityId_fkey" FOREIGN KEY ("RarityId") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RarityCard" ADD CONSTRAINT "RarityCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
