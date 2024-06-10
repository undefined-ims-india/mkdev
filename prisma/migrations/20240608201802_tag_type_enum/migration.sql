/*
  Warnings:

  - The values [postTag,userTag] on the enum `tagType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "tagType_new" AS ENUM ('post', 'user');
ALTER TABLE "Tags" ALTER COLUMN "tagType" TYPE "tagType_new" USING ("tagType"::text::"tagType_new");
ALTER TYPE "tagType" RENAME TO "tagType_old";
ALTER TYPE "tagType_new" RENAME TO "tagType";
DROP TYPE "tagType_old";
COMMIT;
