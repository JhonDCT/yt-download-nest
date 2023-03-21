import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get()
  async download(@Query('url') url: string) {
    return this.downloadService.download(url);
  }
}
