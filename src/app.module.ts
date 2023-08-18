import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PublicationsModule } from './modules/publications/publications.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, PublicationsModule, CommentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
