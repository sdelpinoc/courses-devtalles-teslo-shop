-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_typeId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "attributeId" DROP NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
