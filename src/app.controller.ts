import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getHello(@Param('id') id): string {
    console.log(id);
    // console.log(query);
    return this.appService.getHello();
  }

  // example
  //  @Post()
  //   createPost(@Body() body: PostDTO) {
  //     return `Created a new post with values of ${JSON.stringify(body)} 🚀`;
  //   }
}
