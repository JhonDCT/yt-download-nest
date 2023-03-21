import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { FilesModule } from './files/files.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [VideoModule, FilesModule, DownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
