import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  status?: number;
  message?: string | string[];
  errors?: any;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const errorData = exceptionResponse as ErrorResponse;

    response.status(status).json({
      error: true,
      status: errorData?.status ?? 500,
      msg:
        (errorData?.message || exception?.message) ?? 'Internal Server Error',
      data: {
        status,
        ...(errorData ?? {}),
      },
      additionalData: request.body ?? null,
    });
  }
}
