-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "monsterInvocationId" TEXT;

-- DropEnum
DROP TYPE "MonsterInvocations";

-- DropEnum
DROP TYPE "MonsterPrimaryTypes";

-- CreateTable
CREATE TABLE "MonsterInvocations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MonsterInvocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterPrimaryTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MonsterPrimaryTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterPrimaryTypesCard" (
    "id" TEXT NOT NULL,
    "monsterPrimaryTypeId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "MonsterPrimaryTypesCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonsterInvocations_name_key" ON "MonsterInvocations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MonsterPrimaryTypes_name_key" ON "MonsterPrimaryTypes"("name");

-- AddForeignKey
ALTER TABLE "MonsterPrimaryTypesCard" ADD CONSTRAINT "MonsterPrimaryTypesCard_monsterPrimaryTypeId_fkey" FOREIGN KEY ("monsterPrimaryTypeId") REFERENCES "MonsterPrimaryTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterPrimaryTypesCard" ADD CONSTRAINT "MonsterPrimaryTypesCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_monsterInvocationId_fkey" FOREIGN KEY ("monsterInvocationId") REFERENCES "MonsterInvocations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
