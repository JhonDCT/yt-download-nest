import { Injectable } from '@nestjs/common';
import { lstatSync } from 'fs';
import { readdir } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class FilesService {
  async readDir(
    path: string,
  ): Promise<{ directories: string[]; files: string[] }> {
    path = this.resolvePath(path);
    const files = await readdir(path);
    const response = {
      directories: [],
      files: [],
    };

    files.forEach((fileName: string) => {
      const filePath = lstatSync(resolve(path, fileName));
      if (filePath.isDirectory()) {
        response.directories.push(fileName);
      } else {
        response.files.push(fileName);
      }
    });

    return response;
  }

  uploadFile(file: Express.Multer.File): void {}

  private resolvePath(path: string): string {
    path = path.replace(/-/g, '/');

    return path;
  }
}
