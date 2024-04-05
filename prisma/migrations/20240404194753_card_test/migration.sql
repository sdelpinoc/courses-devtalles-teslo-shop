/*
  Warnings:

  - You are about to drop the `_CardToMonsterAbility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardToMonsterSecondaryTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToMonsterAbility" DROP CONSTRAINT "_CardToMonsterAbility_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToMonsterAbility" DROP CONSTRAINT "_CardToMonsterAbility_B_fkey";

-- DropForeignKey
ALTER TABLE "_CardToMonsterSecondaryTypes" DROP CONSTRAINT "_CardToMonsterSecondaryTypes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToMonsterSecondaryTypes" DROP CONSTRAINT "_CardToMonsterSecondaryTypes_B_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "monsterAbilityId" TEXT,
ADD COLUMN     "monsterSecondaryTypesId" TEXT;

-- DropTable
DROP TABLE "_CardToMonsterAbility";

-- DropTable
DROP TABLE "_CardToMonsterSecondaryTypes";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_monsterSecondaryTypesId_fkey" FOREIGN KEY ("monsterSecondaryTypesId") REFERENCES "MonsterSecondaryTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_monsterAbilityId_fkey" FOREIGN KEY ("monsterAbilityId") REFERENCES "MonsterAbility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
