// src/filters/http-exception.filter.ts  
  import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';


  interface ErrorResponse {
    statusCode: number;
    message: string | string[];
    error?: string;
    path: string;
    timestamp: string;
  }
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest<Request>();
  
      let status: number = HttpStatus.INTERNAL_SERVER_ERROR; // Explicitly type as number
      let errorResponse: ErrorResponse = {
        statusCode: status,
        message: 'Internal server error',
        error: 'Internal Server Error',
        path: request.url,
        timestamp: new Date().toISOString(),
      };
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
  
        errorResponse = {
          statusCode: status,
          message:
            typeof exceptionResponse === 'string'
              ? exceptionResponse
              : (exceptionResponse as any).message || exception.message,
          error:
            typeof exceptionResponse === 'string'
              ? exceptionResponse
              : (exceptionResponse as any).error || exception.name,
          path: request.url,
          timestamp: new Date().toISOString(),
        };
      }
  
      response.status(status).json(errorResponse);
    }
  }
  
  