-- CreateEnum
CREATE TYPE "MonsterInvocations" AS ENUM ('RITUAL', 'FUSION', 'SYNCHRO', 'XYZ', 'PENDULUM', 'LINK');

-- CreateEnum
CREATE TYPE "MonsterPrimaryTypes" AS ENUM ('NORMAL', 'EFFECT', 'PENDULUM');

-- CreateEnum
CREATE TYPE "MonsterSecondaryTypes" AS ENUM ('TUNER');

-- CreateEnum
CREATE TYPE "MonsterAbility" AS ENUM ('FLIP', 'TOON', 'SPIRIT', 'UNION', 'GEMINI');

-- CreateEnum
CREATE TYPE "Attributes" AS ENUM ('LIGHT', 'DARK', 'WATER', 'FIRE', 'EARTH', 'WIND', 'DIVINE');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('Spellcaster', 'Dragon', 'Zombie', 'Warrior', 'BeastWarrior', 'Beast', 'WingedBeast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile', 'Fish', 'SeaSerpent', 'Aqua', 'Pyro', 'Thunder', 'Rock', 'Plant', 'Machine', 'Psychic', 'DivineBeast', 'Wyrm', 'Cyberse');

-- CreateEnum
CREATE TYPE "LinkArrows" AS ENUM ('TopLeft', 'TopCenter', 'TopRight', 'MiddleLeft', 'MiddleRight', 'BottomLeft', 'BottomCenter', 'BottomRight');

-- CreateEnum
CREATE TYPE "SpellTypes" AS ENUM ('Continuous', 'Equip', 'Field', 'Normal', 'QuickPlay', 'Ritual');

-- CreateEnum
CREATE TYPE "TrapTypes" AS ENUM ('Continuous', 'Counter', 'Normal');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('normal', 'rare');

-- CreateTable
CREATE TABLE "TypeOfCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeOfCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cardText" TEXT,
    "password" TEXT,
    "attribute" "Attributes" NOT NULL,
    "type" "Types" NOT NULL,
    "MonsterInvocation" "MonsterInvocations" NOT NULL,
    "MonsterPrimaryTypes" "MonsterPrimaryTypes"[] DEFAULT ARRAY[]::"MonsterPrimaryTypes"[],
    "MonsterSecondaryTypes" "MonsterSecondaryTypes" NOT NULL,
    "MonsterAbility" "MonsterAbility" NOT NULL,
    "level" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "link" INTEGER NOT NULL,
    "attack_points" TEXT NOT NULL,
    "defense_points" TEXT NOT NULL,
    "pendulumEffect" TEXT NOT NULL,
    "pendulumScale" INTEGER NOT NULL,
    "linkArrows" "LinkArrows"[] DEFAULT ARRAY[]::"LinkArrows"[],
    "SpellType" "SpellTypes" NOT NULL,
    "TrapType" "TrapTypes" NOT NULL,
    "price" DOUBLE PRECISION DEFAULT 0,
    "rarity" "Rarity",
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "typeOfCardId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeOfCard_name_key" ON "TypeOfCard"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_typeOfCardId_fkey" FOREIGN KEY ("typeOfCardId") REFERENCES "TypeOfCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
