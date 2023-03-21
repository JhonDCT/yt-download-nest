import { Injectable } from '@nestjs/common';
import { createReadStream, ReadStream, statSync } from 'fs';
import { StreamVideoDTO } from './dto/stream-video.dto';

@Injectable()
export class VideoService {
  stream(path: string, range: string): StreamVideoDTO {
    path = this.resolvePath(path);
    const { size } = statSync(path);
    let readStreamFile: ReadStream = createReadStream(path);

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const [startParts, endParts] = parts;
      const start = parseInt(startParts, 10);
      const end = endParts ? parseInt(endParts, 10) : size - 1;
      const chunksize = end - start + 1;
      readStreamFile = createReadStream(path, {
        start,
        end,
        highWaterMark: 128 * 1024,
      });

      return {
        file: readStreamFile,
        chunksize,
        start,
        end,
        size,
      };
    }

    return {
      file: readStreamFile,
      size,
    };
  }

  private resolvePath(path: string): string {
    path = path.replace(/-/g, '/');

    return path;
  }
}
