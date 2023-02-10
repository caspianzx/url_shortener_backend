import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema({ timestamps: true })
export class Url {
  @Prop({ required: true, type: String, unique: true })
  shortUrl: string;

  @Prop({ required: true, type: String, unique: true })
  urlId: string;

  @Prop({ required: true, type: String, unique: true })
  originalUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
