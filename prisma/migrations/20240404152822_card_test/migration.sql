/*
  Warnings:

  - You are about to drop the column `MonsterAbility` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `MonsterInvocation` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `MonsterPrimaryTypes` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `MonsterSecondaryTypes` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `SpellType` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `TrapType` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `linkArrows` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "MonsterAbility",
DROP COLUMN "MonsterInvocation",
DROP COLUMN "MonsterPrimaryTypes",
DROP COLUMN "MonsterSecondaryTypes",
DROP COLUMN "SpellType",
DROP COLUMN "TrapType",
DROP COLUMN "linkArrows";
