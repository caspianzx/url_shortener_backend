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

    const shortened = nanoid(10)
    // test code. will change the logic later
    // const shortened = `abcde ${Math.floor(Math.random() * 10000)}`;
    const url = {
      shortened,
      original: shortenUrlDto.originalUrl,
    };

    const createdUrlDoc = new this.urlModel(url);

    await createdUrlDoc.save();

    return shortened;
    // const createdCat = new this.catModel(createCatDto);
    // return createdCat.save();
  }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }
}
