/*
  Warnings:

  - Added the required column `guildId` to the `TempChannel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TempChannel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TempChannel" ("channelId", "createdAt", "id", "ownerId") SELECT "channelId", "createdAt", "id", "ownerId" FROM "TempChannel";
DROP TABLE "TempChannel";
ALTER TABLE "new_TempChannel" RENAME TO "TempChannel";
CREATE UNIQUE INDEX "TempChannel_guildId_key" ON "TempChannel"("guildId");
CREATE UNIQUE INDEX "TempChannel_channelId_key" ON "TempChannel"("channelId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
