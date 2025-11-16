-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "s3Keys" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Motorcycle" ADD COLUMN     "s3Keys" TEXT[] DEFAULT ARRAY[]::TEXT[];
