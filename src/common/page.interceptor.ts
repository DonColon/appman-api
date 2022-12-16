import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from 'typeorm';
import { Request } from "express";
import { PageOptions } from './page.dto';


@Injectable()
export class PageInterceptor implements NestInterceptor
{
    @InjectDataSource()
    private dataSource: DataSource;

    @Inject()
    private reflector: Reflector;


    public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>
    {
        const request = context.switchToHttp().getRequest() as Request;

        const returnType = this.reflector.get("returnType", context.getHandler());
        const repository = this.dataSource.getRepository(returnType);

        const { page, pageSize, sortBy, sortOrder } = PageOptions.of(request);

        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / pageSize);
        const originalUrl = this.buildUrl(request); 
        
        return next.handle().pipe(map(data => (
            {
                meta: {
                    pageSize: pageSize,
                    page: page,
                    totalItems: totalItems,
                    totalPages: totalPages,
                    sortBy: sortBy,
                    sortOrder: sortOrder
                },
                links: {
                    first: page === 1 ? undefined : this.buildLink(originalUrl, 1),
                    previous: page - 1 < 1 ? undefined : this.buildLink(originalUrl, page - 1),
                    current: this.buildLink(originalUrl, page),
                    next: page + 1 > totalPages ? undefined : this.buildLink(originalUrl, page + 1),
                    last: page === totalPages ? undefined : this.buildLink(originalUrl, totalPages)
                },
                items: data
            }
        )));
    }

    private buildUrl(request: Request): URL
    {
        const originalUrl = (request.originalUrl)
            ? request.protocol + '://' + request.get('host') + request.originalUrl
            : request.protocol + '://' + request.hostname + request.url;

        return new URL(originalUrl);
    }

    private buildLink(url: URL, page: number): string
    {
        url.searchParams.set("page", page.toString());
        return url.href;
    }
}