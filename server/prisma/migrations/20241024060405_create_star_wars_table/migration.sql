/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "StarWarsPeople" (
    "id" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "result" JSONB NOT NULL,

    CONSTRAINT "StarWarsPeople_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarWarsPeople_payload_key" ON "StarWarsPeople"("payload");
