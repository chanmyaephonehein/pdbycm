/*
  Warnings:

  - Added the required column `country` to the `EmailVerifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `EmailVerifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerifications" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
