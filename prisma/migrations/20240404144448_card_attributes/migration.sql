/*
  Warnings:

  - Changed the type of `attribute` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "attribute",
ADD COLUMN     "attribute" TEXT NOT NULL;
