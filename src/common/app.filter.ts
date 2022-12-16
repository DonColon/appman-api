import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Response } from "express";


@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter
{
    @InjectDataSource()
    private dataSource: DataSource;


    public async catch(exception: HttpException, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        
        const traceID = await this.nextTraceID();

        response.status(status).json({
            statusCode: status,
            error: exception.name,
            message: exception.message,
            timestamp: new Date(),
            traceID: traceID
        });
    }

    private async nextTraceID(): Promise<number>
    {
        const result = await this.dataSource.query("select nextTraceID() as traceID");
        return parseInt(result.at(0)["traceID"]);
    }
}