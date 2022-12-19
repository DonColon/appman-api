import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from "@nestjs/common";
import { Response, Request } from "express";


@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter
{
    public async catch(exception: HttpException, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();
        const request = host.switchToHttp().getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            error: exception.name,
            message: exception.message,
            timestamp: new Date(),
            traceID: request.header("x-trace-id")
        });
    }
}