/*
  Warnings:

  - Made the column `body` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "s3_Etag" TEXT,
ALTER COLUMN "body" SET NOT NULL;
