-- AlterTable
ALTER TABLE `todos` MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp();

-- AlterTable
ALTER TABLE `users` MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp();
