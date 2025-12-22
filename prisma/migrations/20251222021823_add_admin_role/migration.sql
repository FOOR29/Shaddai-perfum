-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMENINO', 'UNISEX');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "PerfumeCategory" AS ENUM ('1.1', 'preparado');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "email" VARCHAR(190) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "image" VARCHAR(500),
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfumes" (
    "id" BIGSERIAL NOT NULL,
    "ownerAdminId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "imageUrl" VARCHAR(500) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfume_category_info" (
    "category" "PerfumeCategory" NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfume_category_info_pkey" PRIMARY KEY ("category")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_username_key" ON "admin_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE INDEX "perfumes_ownerAdminId_idx" ON "perfumes"("ownerAdminId");

-- CreateIndex
CREATE INDEX "perfumes_brandId_idx" ON "perfumes"("brandId");

-- AddForeignKey
ALTER TABLE "perfumes" ADD CONSTRAINT "perfumes_ownerAdminId_fkey" FOREIGN KEY ("ownerAdminId") REFERENCES "admin_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfumes" ADD CONSTRAINT "perfumes_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
