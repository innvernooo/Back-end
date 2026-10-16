-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ADMIN');

-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STAFF';
