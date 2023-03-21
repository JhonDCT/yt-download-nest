import { ReadStream } from 'node:fs';

export type StreamVideoDTO = {
  file: ReadStream;
  chunksize?: number;
  start?: number;
  end?: number;
  size: number;
};
