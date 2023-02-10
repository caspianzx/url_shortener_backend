import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShortenUrlDTO } from './dto/shorten-url.dto';
import { UrlShortenerService } from './url-shortener.service';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}
  @Post('shorten-url')
  async shortenUrl(@Body() shortenUrlDTO: ShortenUrlDTO): Promise<string> {
    return await this.urlShortenerService.shortenUrl(shortenUrlDTO);
  }
  // @Get('get-original-url')
  // async getOriginalUrl(@Query('shortened-url') shortenedUrl): string {
  //   return 'This action returns all cats';
  // }
  // @Get(':id')
  // async findOne(@Param() params): Promise<string> {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }
}
