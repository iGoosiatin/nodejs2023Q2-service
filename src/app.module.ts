import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InMemoryDatabaseModule } from './in-memory-database/in-memory-database.module';

@Module({
  imports: [UserModule, InMemoryDatabaseModule],
})
export class AppModule {}
