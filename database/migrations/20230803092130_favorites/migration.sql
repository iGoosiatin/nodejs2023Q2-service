-- CreateTable
CREATE TABLE "FavArtist" (
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavArtist_pkey" PRIMARY KEY ("artistId")
);

-- CreateTable
CREATE TABLE "FavAlbum" (
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavAlbum_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "FavTrack" (
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavTrack_pkey" PRIMARY KEY ("trackId")
);

-- AddForeignKey
ALTER TABLE "FavArtist" ADD CONSTRAINT "FavArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavAlbum" ADD CONSTRAINT "FavAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavTrack" ADD CONSTRAINT "FavTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
