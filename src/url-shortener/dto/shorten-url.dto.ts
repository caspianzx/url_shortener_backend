import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortenUrlDTO {
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsString()
  @IsNotEmpty()
  originalUrl: string;
}
