/*
  Warnings:

  - Added the required column `state` to the `org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org" ADD COLUMN     "state" TEXT NOT NULL;
