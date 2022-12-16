import { Controller, Get, Inject, Post, Body, Param, Put, Delete, HttpCode } from "@nestjs/common";
import { PageOptions } from "src/common/page.dto";
import { Paginated, PageQuery } from "src/common/page.decorator";
import { Developer } from "../entity/developer.entity";
import { DeveloperService } from "../service/developer.service";
import { AccessTokenAuth } from "src/auth/auth.decorator";


@Controller("developers")
export class DeveloperController
{
    @Inject()
    private developerService: DeveloperService;


    @Post()
    @HttpCode(201)
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
    @HttpCode(201)
    @AccessTokenAuth()
    update(@Param("id") id: number, @Body() body: Developer)
    {
        this.developerService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(204)
    @AccessTokenAuth()
    delete(@Param("id") id: number)
    {
        this.developerService.delete(id);
    }

    @Get()
    @Paginated(Developer)
    listAll(@PageQuery() options: PageOptions): Promise<Developer[]>
    {
        return this.developerService.listAll(options);
    }
}