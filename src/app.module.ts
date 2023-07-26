import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InMemoryDatabaseModule } from './in-memory-database/in-memory-database.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, InMemoryDatabaseModule, ArtistModule],
})
export class AppModule {}
