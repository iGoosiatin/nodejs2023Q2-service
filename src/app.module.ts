import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InMemoryDatabaseModule } from './in-memory-database/in-memory-database.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    InMemoryDatabaseModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
})
export class AppModule {}
