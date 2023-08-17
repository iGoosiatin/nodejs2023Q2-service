import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
