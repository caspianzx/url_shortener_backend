import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UrlShortenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
