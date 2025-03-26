/*
  Warnings:

  - You are about to drop the column `verifyExpire` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_verifyToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyExpire",
DROP COLUMN "verifyToken";

-- CreateTable
CREATE TABLE "EmailVerifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerifications_email_key" ON "EmailVerifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerifications_token_key" ON "EmailVerifications"("token");
