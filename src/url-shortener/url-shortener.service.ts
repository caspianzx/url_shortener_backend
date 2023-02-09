import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './url-shortener.schema';

@Injectable()
export class UrlShortenerService {
  constructor(@InjectModel(Url.name) private catModel: Model<UrlDocument>) {}

  // async shortenUrl(shortenUrlDto: CreateCatDto): Promise<Url> {
  //   // const createdCat = new this.catModel(createCatDto);
  //   // return createdCat.save();
  // }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }
}
