import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const input =
      req.method === 'GET'
        ? req.params
        : { ...req.body, ...req.params, ...req.query };
    return next.handle().pipe(
      map((response) => {
        return {
          error: false,
          status: response.status ?? 200,
          msg: response.msg,
          data: response.data ?? response ?? null,
          additionalData: response.additionalData ?? input,
        };
      }),
    );
  }
}
