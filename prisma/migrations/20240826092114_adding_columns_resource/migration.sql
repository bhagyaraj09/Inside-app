/*
  Warnings:

  - You are about to drop the column `leaveId` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `description` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceId` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_leaveId_fkey";

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "leaveId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "resourceId" VARCHAR(30) NOT NULL;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
