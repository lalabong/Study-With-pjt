-- CreateTable
CREATE TABLE `chat_message` (
    `id` VARCHAR(36) NOT NULL,
    `content` TEXT NOT NULL,
    `userCuid` VARCHAR(191) NOT NULL,
    `roomCuid` VARCHAR(191) NOT NULL,
    `messageType` ENUM('message', 'system') NOT NULL DEFAULT 'message',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `chat_message_room_time_idx`(`roomCuid`, `createdAt`),
    INDEX `chat_message_userCuid_fkey`(`userCuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_userCuid_fkey` FOREIGN KEY (`userCuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
