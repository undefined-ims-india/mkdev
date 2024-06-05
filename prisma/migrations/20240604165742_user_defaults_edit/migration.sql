-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "repoLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "follower_count" SET DEFAULT 0,
ALTER COLUMN "post_count" SET DEFAULT 0;
