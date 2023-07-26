import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TrackModule, ArtistModule, AlbumModule],
})
export class FavsModule {}
