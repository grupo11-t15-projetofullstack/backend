import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PublicationsModule } from './modules/publications/publications.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [UsersModule, PublicationsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
