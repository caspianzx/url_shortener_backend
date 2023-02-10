import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ShortenUrlDTO } from './dto/shorten-url.dto';
import { UrlShortenerService } from './url-shortener.service';
import { Response } from 'express';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}
  @Post('shorten-url')
  async shortenUrl(@Body() shortenUrlDTO: ShortenUrlDTO): Promise<string> {
    return await this.urlShortenerService.shortenUrl(shortenUrlDTO);
  }

  @Get('get-original-url/:id')
  async getOriginalLink(@Param() params, @Res() res: Response): Promise<any> {
    const originalUrl = await this.urlShortenerService.getOriginalUrl(
      params.id,
    );
    res.redirect(originalUrl);
  }
}
