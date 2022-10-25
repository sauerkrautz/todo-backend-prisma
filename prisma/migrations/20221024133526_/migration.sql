/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `todos` MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp();

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp(),
    ADD PRIMARY KEY (`id`, `uuid`);

-- CreateIndex
CREATE INDEX `uuid` ON `users`(`uuid`);
