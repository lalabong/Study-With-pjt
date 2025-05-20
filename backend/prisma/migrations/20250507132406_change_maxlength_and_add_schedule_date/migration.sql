/*
  Warnings:

  - You are about to alter the column `name` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `title` on the `schedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `userId` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - You are about to alter the column `nickname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(10)`.
  - Added the required column `date` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `date` VARCHAR(20) NOT NULL,
    MODIFY `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `userId` VARCHAR(20) NOT NULL,
    MODIFY `nickname` VARCHAR(10) NOT NULL;
