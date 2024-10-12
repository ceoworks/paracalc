import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CalculateRequestDTO } from './dto/calculateRequest.dto';

@Controller('evaluate')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  calculate(@Body() calculateRequest: CalculateRequestDTO): Promise<number> {
    return this.appService.calculateExpression(calculateRequest.expression);
  }
}
