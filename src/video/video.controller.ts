import {
  Controller,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { StreamVideoDTO } from './dto/stream-video.dto';
import { VideoService } from './video.service';
import type { Response } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('stream/:path')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('path') path: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const response: StreamVideoDTO = this.videoService.stream(
      path,
      headers.range,
    );

    if (headers.range) {
      const head = {
        'Content-Range': `bytes ${response.start}-${response.end}/${response.size}`,
        'Content-Length': response.chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head);
      response.file.pipe(res);
    } else {
      const head = {
        'Content-Length': response.size,
      };
      res.writeHead(HttpStatus.OK, head);
      response.file.pipe(res);
    }
  }
}
