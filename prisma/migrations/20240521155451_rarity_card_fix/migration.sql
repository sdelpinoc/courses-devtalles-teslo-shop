/*
  Warnings:

  - You are about to drop the column `RarityId` on the `RarityCard` table. All the data in the column will be lost.
  - Added the required column `rarityId` to the `RarityCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RarityCard" DROP CONSTRAINT "RarityCard_RarityId_fkey";

-- AlterTable
ALTER TABLE "RarityCard" DROP COLUMN "RarityId",
ADD COLUMN     "rarityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RarityCard" ADD CONSTRAINT "RarityCard_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
