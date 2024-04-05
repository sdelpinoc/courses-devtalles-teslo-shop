-- DropEnum
DROP TYPE "MonsterAbility";

-- DropEnum
DROP TYPE "MonsterSecondaryTypes";

-- CreateTable
CREATE TABLE "MonsterSecondaryTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MonsterSecondaryTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterAbility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MonsterAbility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToMonsterSecondaryTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CardToMonsterAbility" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MonsterSecondaryTypes_name_key" ON "MonsterSecondaryTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MonsterAbility_name_key" ON "MonsterAbility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToMonsterSecondaryTypes_AB_unique" ON "_CardToMonsterSecondaryTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToMonsterSecondaryTypes_B_index" ON "_CardToMonsterSecondaryTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToMonsterAbility_AB_unique" ON "_CardToMonsterAbility"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToMonsterAbility_B_index" ON "_CardToMonsterAbility"("B");

-- AddForeignKey
ALTER TABLE "_CardToMonsterSecondaryTypes" ADD CONSTRAINT "_CardToMonsterSecondaryTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToMonsterSecondaryTypes" ADD CONSTRAINT "_CardToMonsterSecondaryTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "MonsterSecondaryTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToMonsterAbility" ADD CONSTRAINT "_CardToMonsterAbility_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToMonsterAbility" ADD CONSTRAINT "_CardToMonsterAbility_B_fkey" FOREIGN KEY ("B") REFERENCES "MonsterAbility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
