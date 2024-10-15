/*
  Warnings:

  - You are about to drop the column `subcategoryId` on the `subsubcategory` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `SubSubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subsubcategory` DROP FOREIGN KEY `SubSubCategory_subcategoryId_fkey`;

-- AlterTable
ALTER TABLE `subsubcategory` DROP COLUMN `subcategoryId`,
    ADD COLUMN `subCategoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `subSubCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubSubCategory` ADD CONSTRAINT `SubSubCategory_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_subSubCategoryId_fkey` FOREIGN KEY (`subSubCategoryId`) REFERENCES `SubSubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
