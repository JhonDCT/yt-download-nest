import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalfilesInterceptor implements NestInterceptor {
  fileInterceptor: NestInterceptor;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
