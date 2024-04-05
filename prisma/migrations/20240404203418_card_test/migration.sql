/*
  Warnings:

  - You are about to drop the column `raritiesId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `spellTypesId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `trapTypesId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Rarities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpellTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrapTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_raritiesId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_spellTypesId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_trapTypesId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "raritiesId",
DROP COLUMN "spellTypesId",
DROP COLUMN "trapTypesId",
ADD COLUMN     "rarityId" TEXT,
ADD COLUMN     "spellTypeId" TEXT,
ADD COLUMN     "trapTypeId" TEXT;

-- DropTable
DROP TABLE "Rarities";

-- DropTable
DROP TABLE "SpellTypes";

-- DropTable
DROP TABLE "TrapTypes";

-- CreateTable
CREATE TABLE "SpellType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SpellType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrapType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrapType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpellType_name_key" ON "SpellType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrapType_name_key" ON "TrapType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_spellTypeId_fkey" FOREIGN KEY ("spellTypeId") REFERENCES "SpellType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_trapTypeId_fkey" FOREIGN KEY ("trapTypeId") REFERENCES "TrapType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
