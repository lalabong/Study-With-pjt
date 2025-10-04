-- DropForeignKey
ALTER TABLE `time_log` DROP FOREIGN KEY `time_log_roomCuid_fkey`;

-- AlterTable
ALTER TABLE `time_log` MODIFY `roomCuid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `time_log` ADD CONSTRAINT `time_log_roomCuid_fkey` FOREIGN KEY (`roomCuid`) REFERENCES `room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
