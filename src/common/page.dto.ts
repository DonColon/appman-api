import { Request } from "express";
import { FindManyOptions } from "typeorm";


interface PageParameters
{
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string
}

export class PageOptions
{
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;


    private constructor(parameters: PageParameters)
    {
        this.page = parameters.page;
        this.pageSize = parameters.pageSize;
        this.sortBy = parameters.sortBy;
        this.sortOrder = parameters.sortOrder;
    }


    static of(request: Request): PageOptions
    {
        const { query } = request;

        const page = (query.page) ? parseInt(query.page as string) : 1;
        const pageSize = (query.pageSize) ? parseInt(query.pageSize as string) : 12;
    
        const sortBy = query.sortBy as string || "id";
        const sortOrder = query.sortOrder as string || "ASC";
    
        return new PageOptions({ page, pageSize, sortBy, sortOrder });
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