/*
  Warnings:

  - Made the column `name` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cardText` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rarity` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "cardText" SET NOT NULL,
ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "rank" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "attack_points" DROP NOT NULL,
ALTER COLUMN "defense_points" DROP NOT NULL,
ALTER COLUMN "pendulumEffect" DROP NOT NULL,
ALTER COLUMN "pendulumScale" DROP NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "rarity" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
