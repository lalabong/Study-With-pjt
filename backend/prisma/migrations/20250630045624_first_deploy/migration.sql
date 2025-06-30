/*
  Warnings:

  - You are about to drop the column `createdAt` on the `friend` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `schedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Enum(EnumId(0))`.
  - You are about to drop the `room_user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerCuid]` on the table `room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `room_ownerCuid_fkey`;

-- DropForeignKey
ALTER TABLE `room_user` DROP FOREIGN KEY `room_user_roomCuid_fkey`;

-- DropForeignKey
ALTER TABLE `room_user` DROP FOREIGN KEY `room_user_userCuid_fkey`;

-- AlterTable
ALTER TABLE `friend` DROP COLUMN `createdAt`,
    ADD COLUMN `status` ENUM('pending', 'accepted') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `schedule` MODIFY `status` ENUM('대기중', '진행중', '완료', '취소') NOT NULL DEFAULT '대기중';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roomCuid` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `room_user`;

-- CreateIndex
CREATE UNIQUE INDEX `room_ownerCuid_key` ON `room`(`ownerCuid`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `time_log` RENAME INDEX `time_log_roomCuid_fkey` TO `time_log_roomCuid_idx`;
