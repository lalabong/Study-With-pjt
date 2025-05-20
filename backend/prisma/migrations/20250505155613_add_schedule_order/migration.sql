/*
  Warnings:

  - You are about to drop the column `roomId` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_roomId_fkey`;

-- DropIndex
DROP INDEX `schedule_roomId_fkey` ON `schedule`;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `roomId`,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0;
