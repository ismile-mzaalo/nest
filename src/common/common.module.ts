import { Module } from '@nestjs/common';
import { CommonService } from './service/common.service';
import { CommonController } from './controller/common.controller';

@Module({
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
