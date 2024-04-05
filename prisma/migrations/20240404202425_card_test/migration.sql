/*
  Warnings:

  - You are about to drop the column `rarity` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "rarity",
ADD COLUMN     "raritiesId" TEXT,
ADD COLUMN     "spellTypesId" TEXT,
ADD COLUMN     "trapTypesId" TEXT;

-- DropEnum
DROP TYPE "Rarity";

-- DropEnum
DROP TYPE "SpellTypes";

-- DropEnum
DROP TYPE "TrapTypes";

-- CreateTable
CREATE TABLE "SpellTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SpellTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrapTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrapTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rarities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpellTypes_name_key" ON "SpellTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrapTypes_name_key" ON "TrapTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarities_name_key" ON "Rarities"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_spellTypesId_fkey" FOREIGN KEY ("spellTypesId") REFERENCES "SpellTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_trapTypesId_fkey" FOREIGN KEY ("trapTypesId") REFERENCES "TrapTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_raritiesId_fkey" FOREIGN KEY ("raritiesId") REFERENCES "Rarities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
