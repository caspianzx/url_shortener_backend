import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ShortenUrlDTO {
  @IsUrl({ protocols: ['https'] })
  @IsString()
  @IsNotEmpty()
  originalLink: string;
}
