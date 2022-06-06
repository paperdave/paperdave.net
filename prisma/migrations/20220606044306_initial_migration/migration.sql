-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('NORMAL', 'REJECT', 'MARKER');

-- CreateEnum
CREATE TYPE "ArtifactType" AS ENUM ('Application', 'Doodle', 'Fragment', 'Game', 'Journal', 'Music', 'MusicVideo', 'NerdGear', 'Square', 'Story', 'Video', 'WordMagnet');

-- CreateTable
CREATE TABLE "Message" (
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MessageType" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "MessageInput" (
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,
    "notifyEmail" TEXT,
    "sourceName" TEXT,
    "sourceLocation" TEXT,
    "sourceVPN" TEXT,

    CONSTRAINT "MessageInput_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "ArtifactEntry" (
    "id" TEXT NOT NULL,
    "type" "ArtifactType" NOT NULL,
    "thumb" TEXT,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "unlisted" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ArtifactEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "thumb" TEXT,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],
    "unlisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "tags" TEXT[],
    "thumb" TEXT,
    "media" TEXT NOT NULL,
    "source" TEXT,
    "ttms" DOUBLE PRECISION,
    "unlisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "tags" TEXT[],
    "album" TEXT,
    "media" TEXT NOT NULL,
    "unlisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "shortDescription" TEXT,
    "web" TEXT,
    "webAlwaysFullscreen" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "downloads" JSONB[],
    "banner" TEXT,
    "logo" TEXT,
    "screenshots" TEXT[],
    "themeBG" TEXT,
    "themeFG" TEXT,
    "themeAccent" TEXT,
    "unlisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "web" TEXT,
    "webAlwaysFullscreen" BOOLEAN NOT NULL DEFAULT false,
    "downloads" JSONB[],
    "unlisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upload" (
    "hash" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "blurhash" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "ratio" TEXT,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "Donator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Donator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_messageMention" (
    "A" TIMESTAMP(3) NOT NULL,
    "B" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtifactEntryToMessage" (
    "A" TEXT NOT NULL,
    "B" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_messageMention_AB_unique" ON "_messageMention"("A", "B");

-- CreateIndex
CREATE INDEX "_messageMention_B_index" ON "_messageMention"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtifactEntryToMessage_AB_unique" ON "_ArtifactEntryToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtifactEntryToMessage_B_index" ON "_ArtifactEntryToMessage"("B");

-- AddForeignKey
ALTER TABLE "_messageMention" ADD CONSTRAINT "_messageMention_A_fkey" FOREIGN KEY ("A") REFERENCES "Message"("date") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messageMention" ADD CONSTRAINT "_messageMention_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("date") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtifactEntryToMessage" ADD CONSTRAINT "_ArtifactEntryToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "ArtifactEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtifactEntryToMessage" ADD CONSTRAINT "_ArtifactEntryToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("date") ON DELETE CASCADE ON UPDATE CASCADE;
