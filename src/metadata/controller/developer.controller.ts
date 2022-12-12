import { Controller, Get, Inject, Post, Body, Param, Put, Delete, UseInterceptors, SetMetadata } from "@nestjs/common";
import { PaginateOptions } from "src/common/page.dto";
import { Paginated, PaginateQuery } from "src/common/paginate.decorator";
import { Developer } from "../entity/developer.entity";
import { DeveloperService } from "../service/developer.service";


@Controller("developers")
export class DeveloperController
{
    @Inject()
    private developerService: DeveloperService;


    @Post()
    create(@Body() body: Developer): Promise<Developer>
    {
        return this.developerService.create(body);
    }

    @Get(":id")
    retrieve(@Param("id") id: number): Promise<Developer>
    {
        return this.developerService.retrieve(id);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() body: Developer)
    {
        this.developerService.update(id, body);
    }

    @Delete(":id")
    delete(@Param("id") id: number)
    {
        this.developerService.delete(id);
    }

    @Get()
    @Paginated(Developer)
    listAll(@PaginateQuery() options: PaginateOptions): Promise<Developer[]>
    {
        return this.developerService.listAll(options);
    }
}