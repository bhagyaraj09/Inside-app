/*
  Warnings:

  - You are about to drop the column `vacationLeaves` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `vacationLeavesAvailable` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `vacationLeavesConsumed` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickLeaves` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickLeavesAvailable` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickLeavesConsumed` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vactionLeaveNoticePeriod` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocationLeaveNoticePeriod` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocationLeaves` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocationLeavesAvailable` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocationLeavesConsumed` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "vacationLeaves",
DROP COLUMN "vacationLeavesAvailable",
DROP COLUMN "vacationLeavesConsumed",
ADD COLUMN     "sickLeaves" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sickLeavesAvailable" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sickLeavesConsumed" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vactionLeaveNoticePeriod" INTEGER NOT NULL,
ADD COLUMN     "vocationLeaveNoticePeriod" INTEGER NOT NULL,
ADD COLUMN     "vocationLeaves" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vocationLeavesAvailable" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vocationLeavesConsumed" DOUBLE PRECISION NOT NULL;
