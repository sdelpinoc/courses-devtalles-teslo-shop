-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "linkArrowsId" TEXT;

-- DropEnum
DROP TYPE "LinkArrows";

-- CreateTable
CREATE TABLE "LinkArrows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LinkArrows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkArrows_name_key" ON "LinkArrows"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_linkArrowsId_fkey" FOREIGN KEY ("linkArrowsId") REFERENCES "LinkArrows"("id") ON DELETE SET NULL ON UPDATE CASCADE;
