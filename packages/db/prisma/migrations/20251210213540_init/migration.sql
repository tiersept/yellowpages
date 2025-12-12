-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "address" JSONB NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "company" JSONB NOT NULL,
    "interests" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
