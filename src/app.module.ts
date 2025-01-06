import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { Users } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

const dbConfig = require('../ormconfig.json'); 

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
