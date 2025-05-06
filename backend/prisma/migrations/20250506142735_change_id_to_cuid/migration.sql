/*
  Warnings:

  - The primary key for the `friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friendId` on the `friend` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `friend` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `room_user` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `room_user` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `time_log` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `time_log` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomCuid,userCuid]` on the table `room_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendCuid` to the `friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerCuid` to the `room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCuid` to the `room_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `room_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCuid` to the `time_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `time_log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `friend` DROP FOREIGN KEY `friend_friendId_fkey`;

-- DropForeignKey
ALTER TABLE `friend` DROP FOREIGN KEY `friend_userId_fkey`;

-- DropForeignKey
ALTER TABLE `refresh_token` DROP FOREIGN KEY `refresh_token_userId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `room_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `room_user` DROP FOREIGN KEY `room_user_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `room_user` DROP FOREIGN KEY `room_user_userId_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_userId_fkey`;

-- DropForeignKey
ALTER TABLE `time_log` DROP FOREIGN KEY `time_log_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `time_log` DROP FOREIGN KEY `time_log_userId_fkey`;

-- DropIndex
DROP INDEX `friend_friendId_fkey` ON `friend`;

-- DropIndex
DROP INDEX `refresh_token_userId_fkey` ON `refresh_token`;

-- DropIndex
DROP INDEX `room_ownerId_fkey` ON `room`;

-- DropIndex
DROP INDEX `room_user_roomId_userId_key` ON `room_user`;

-- DropIndex
DROP INDEX `room_user_userId_fkey` ON `room_user`;

-- DropIndex
DROP INDEX `schedule_userId_fkey` ON `schedule`;

-- DropIndex
DROP INDEX `time_log_roomId_fkey` ON `time_log`;

-- DropIndex
DROP INDEX `time_log_userId_fkey` ON `time_log`;

-- AlterTable
ALTER TABLE `friend` DROP PRIMARY KEY,
    DROP COLUMN `friendId`,
    DROP COLUMN `userId`,
    ADD COLUMN `friendCuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `userCuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userCuid`, `friendCuid`);

-- AlterTable
ALTER TABLE `refresh_token` DROP COLUMN `userId`,
    ADD COLUMN `userCuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `ownerId`,
    ADD COLUMN `ownerCuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room_user` DROP COLUMN `roomId`,
    DROP COLUMN `userId`,
    ADD COLUMN `roomCuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `userCuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `userId`,
    ADD COLUMN `userCuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `time_log` DROP COLUMN `roomId`,
    DROP COLUMN `userId`,
    ADD COLUMN `roomCuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `userCuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `room_user_roomCuid_userCuid_key` ON `room_user`(`roomCuid`, `userCuid`);

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_ownerCuid_fkey` FOREIGN KEY (`ownerCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_user` ADD CONSTRAINT `room_user_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_user` ADD CONSTRAINT `room_user_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_log` ADD CONSTRAINT `time_log_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_log` ADD CONSTRAINT `time_log_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend` ADD CONSTRAINT `friend_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend` ADD CONSTRAINT `friend_friendCuid_fkey` FOREIGN KEY (`friendCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
