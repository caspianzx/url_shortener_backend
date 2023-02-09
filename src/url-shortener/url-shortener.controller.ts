import { Controller, Get, Post, Body } from '@nestjs/common';
import { ShortenUrlDTO } from "./dto/shorten-url.dto";

@Controller('shorten-url')
export class UrlShortenerController {
  @Post()
  async shortenUrl(@Body() shortenUrlDTO: ShortenUrlDTO): Promise<string> {
    return 'shorteneddd'
  }
  // @Get()
  // async getLink(): string {
  //   return 'This action returns all cats';
  // }
}