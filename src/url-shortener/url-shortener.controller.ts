import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ShortenUrlDTO } from './dto/shorten-url.dto';
import { UrlShortenerService } from './url-shortener.service';
import { Response } from 'express';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}
  @Post('/api/shorten-url')
  async shortenUrl(@Body() shortenUrlDTO: ShortenUrlDTO): Promise<any> {
    return await this.urlShortenerService.shortenUrl(shortenUrlDTO);
  }

  @Get('/:id')
  async getOriginalUrl(@Param() params, @Res() res: Response): Promise<any> {
    const originalUrl = await this.urlShortenerService.getOriginalUrl(
      params.id,
    );
    res.redirect(301, originalUrl);
  }
}
