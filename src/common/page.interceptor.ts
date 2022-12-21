import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from 'typeorm';
import { Request } from "express";
import { PageOptions } from './page.dto';


const MAX_PAGE_SIZE = 120;


@Injectable()
export class PageInterceptor implements NestInterceptor
{
    @InjectDataSource()
    private dataSource: DataSource;

    @Inject()
    private reflector: Reflector;


    public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>
    {
        const { page, pageSize, sortBy, sortOrder } = PageOptions.of(context);

        const totalItems = await this.countItems(context);
        const totalPages = Math.ceil(totalItems / pageSize);

        const requestUrl = this.buildUrl(context);

        if(page <= 0) {
            throw new BadRequestException("Query: page should not be less equal zero");
        }

        if(pageSize <= 0) {
            throw new BadRequestException("Query: page size should not be less equal zero");
        }

        if(page > totalPages) {
            throw new BadRequestException("Query: page does not exist");
        }

        if(pageSize > MAX_PAGE_SIZE) {
            throw new BadRequestException(`Query: page size limit is ${MAX_PAGE_SIZE}`);
        }
        
        return next.handle().pipe(map(data => (
            {
                meta: {
                    page: page,
                    pageSize: pageSize,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    totalItems: totalItems,
                    totalPages: totalPages
                },
                links: {
                    first: (page === 1) ? undefined : this.buildLink(requestUrl, 1),
                    previous: (page - 1 < 1) ? undefined : this.buildLink(requestUrl, page - 1),
                    current: this.buildLink(requestUrl, page),
                    next: (page + 1 > totalPages) ? undefined : this.buildLink(requestUrl, page + 1),
                    last: (page === totalPages) ? undefined : this.buildLink(requestUrl, totalPages)
                },
                items: data
            }
        )));
    }

    private countItems(context: ExecutionContext): Promise<number>
    {
        const returnType = this.reflector.get("ReturnType", context.getHandler());
        const repository = this.dataSource.getRepository(returnType);

        return repository.count();
    }

    private buildUrl(context: ExecutionContext): URL
    {
        const request = context.switchToHttp().getRequest() as Request;

        const requestUrl = (request.originalUrl)
            ? request.protocol + '://' + request.get('host') + request.originalUrl
            : request.protocol + '://' + request.hostname + request.url;

        return new URL(requestUrl);
    }

    private buildLink(url: URL, page: number): string
    {
        url.searchParams.set("page", page.toString());
        return url.href;
    }
}