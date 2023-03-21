import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as ytdl from 'ytdl-core';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

@Injectable()
export class DownloadService {
  async download(url: string) {
    const videoID = ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(videoID);
    const formats = ytdl.filterFormats(info.formats, 'audioonly');
    const stream = ytdl(url, { format: formats[0] });

    const filesDir = join(process.cwd(), 'files/');

    ffmpeg(stream).save(filesDir + info.videoDetails.title + '.mp3');

    return {
      title: info.videoDetails.title,
      url: formats[0].url,
    };
  }
}
