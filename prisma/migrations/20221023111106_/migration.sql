-- AlterTable
ALTER TABLE `todos` MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp(),
    MODIFY `updatedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT current_timestamp();
