/*
  Warnings:

  - You are about to drop the column `mimetype` on the `Upload` table. All the data in the column will be lost.
  - You are about to drop the column `ratio` on the `Upload` table. All the data in the column will be lost.
  - Added the required column `type` to the `Upload` table without a default value. This is not possible if the table is not empty.
  - Made the column `width` on table `Upload` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Upload` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UploadPurpose" AS ENUM ('MessageAttachment', 'ArtifactData');

-- AlterTable
ALTER TABLE "Upload" DROP COLUMN "mimetype",
DROP COLUMN "ratio",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "purpose" "UploadPurpose",
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL;
