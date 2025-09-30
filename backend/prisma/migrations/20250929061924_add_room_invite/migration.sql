/*
  Warnings:

  - You are about to drop the column `roomCuid` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_roomCuid_fkey`;

-- DropIndex
DROP INDEX `room_ownerCuid_key` ON `room`;

-- DropIndex
DROP INDEX `user_roomCuid_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roomCuid`;

-- CreateTable
CREATE TABLE `room_participation` (
    `userCuid` VARCHAR(191) NOT NULL,
    `roomCuid` VARCHAR(191) NOT NULL,
    `joinedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `room_participation_roomCuid_fkey`(`roomCuid`),
    PRIMARY KEY (`userCuid`, `roomCuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_invite` (
    `id` VARCHAR(36) NOT NULL,
    `roomCuid` VARCHAR(191) NOT NULL,
    `inviterCuid` VARCHAR(191) NOT NULL,
    `inviteeCuid` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'accepted', 'declined') NOT NULL DEFAULT 'pending',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    INDEX `room_invite_inviteeCuid_fkey`(`inviteeCuid`),
    INDEX `room_invite_inviterCuid_fkey`(`inviterCuid`),
    INDEX `room_invite_roomCuid_fkey`(`roomCuid`),
    UNIQUE INDEX `room_invite_roomCuid_inviteeCuid_key`(`roomCuid`, `inviteeCuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `room_ownerCuid_fkey` ON `room`(`ownerCuid`);

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_ownerCuid_fkey` FOREIGN KEY (`ownerCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_participation` ADD CONSTRAINT `room_participation_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_participation` ADD CONSTRAINT `room_participation_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_invite` ADD CONSTRAINT `room_invite_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_invite` ADD CONSTRAINT `room_invite_inviterCuid_fkey` FOREIGN KEY (`inviterCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_invite` ADD CONSTRAINT `room_invite_inviteeCuid_fkey` FOREIGN KEY (`inviteeCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
