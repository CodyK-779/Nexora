-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."order" ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING';
