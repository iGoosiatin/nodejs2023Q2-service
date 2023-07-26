import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InMemoryDatabaseModule } from './in-memory-database/in-memory-database.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    InMemoryDatabaseModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
})
export class AppModule {}
