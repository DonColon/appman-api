import { Request } from "express";
import { FindManyOptions } from "typeorm";


export class PaginateOptions
{
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;


    private constructor(page: number, pageSize: number, sortBy: string, sortOrder: string)
    {
        this.page = page;
        this.pageSize = pageSize;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }


    static of(request: Request): PaginateOptions
    {
        const { query } = request;

        const page = (query.page) ? parseInt(query.page as string) : 1;
        const pageSize = (query.pageSize) ? parseInt(query.pageSize as string) : 12;
    
        const sortBy = query.sortBy as string || "id";
        const sortOrder = query.sortOrder as string || "ASC";
    
        return new PaginateOptions(page, pageSize, sortBy, sortOrder);
    }

    toQuery(): FindManyOptions
    {
        return {
            take: this.pageSize,
            skip: this.page === 1 ? undefined : (this.page - 1) * this.pageSize,
            order: {
                [this.sortBy]: this.sortOrder
            }
        };
    }
}