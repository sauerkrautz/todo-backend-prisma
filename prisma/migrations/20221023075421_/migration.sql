/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(6)`.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` VARCHAR(6) NOT NULL DEFAULT 'user',
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp(),
    MODIFY `updatedAt` DATETIME(0) NULL;

-- DropTable
DROP TABLE `sessions`;
