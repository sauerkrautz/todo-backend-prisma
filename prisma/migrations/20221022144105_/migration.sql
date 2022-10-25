-- CreateTable
CREATE TABLE `siswa` (
    `nis` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `alamat` VARCHAR(60) NOT NULL,
    `hobby` TEXT NOT NULL,

    PRIMARY KEY (`nis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `uuid` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(6) NOT NULL DEFAULT 'user',
    `created_at` VARCHAR(255) NOT NULL DEFAULT (current_timestamp()),
    `updated_at` VARCHAR(255) NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
