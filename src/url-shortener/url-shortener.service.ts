import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './url-shortener.schema';
import { ShortenUrlDTO } from './dto/shorten-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlShortenerService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async shortenUrl(shortenUrlDto: ShortenUrlDTO): Promise<string> {
    // validate original url to check if it exists
    const url = await this.urlModel.findOne({
      originalUrl: shortenUrlDto.originalUrl,
    });

    if (url) {
      return url.shortUrl;
    } else {
      const urlId = await this.generateUrlId();
      // validate shorten id to ensure that it is unique

      const shortUrl = `${process.env.BASE}/${urlId}`;
      const newUrlDoc = {
        shortUrl,
        originalUrl: shortenUrlDto.originalUrl,
        urlId,
      };

      const createdUrlDoc = new this.urlModel(newUrlDoc);

      await createdUrlDoc.save();

      return shortUrl;
    }
  }

  // generate url id should handle key Collision
  // set max retry at 3 to prevent excessive recursion
  async generateUrlId(retry = 3): Promise<string> {
    if (retry <= 0) {
      throw new Error('maximum number of key collision retries reached!');
    }

    const urlId = nanoid(10);
    const existingId = await this.urlModel.findOne({ urlId });

    if (existingId) {
      return this.generateUrlId(retry - 1);
    } else {
      return urlId;
    }
  }
}
