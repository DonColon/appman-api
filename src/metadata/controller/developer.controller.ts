import { Controller, Get, Inject, Post, Body, Put, Delete, HttpCode } from "@nestjs/common";
import { PageOptions } from "src/common/page.dto";
import { Paginated, PageQuery } from "src/common/page.decorator";
import { Developer } from "../entity/developer.entity";
import { DeveloperService } from "../service/developer.service";
import { AccessTokenAuth } from "src/auth/auth.decorator";
import { ID } from "src/common/controller.decorator";


@Controller("developers")
export class DeveloperController
{
    @Inject()
    private developerService: DeveloperService;


    @Post()
    @HttpCode(201)
    @AccessTokenAuth()
    public create(@Body() body: Developer): Promise<Developer>
    {
        return this.developerService.create(body);
    }

    @Get(":id")
    public retrieve(@ID id: number): Promise<Developer>
    {
        return this.developerService.retrieve(id);
    }

    @Put(":id")
    @HttpCode(201)
    @AccessTokenAuth()
    public update(@ID id: number, @Body() body: Developer)
    {
        this.developerService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(204)
    @AccessTokenAuth()
    public delete(@ID id: number)
    {
        this.developerService.delete(id);
    }

    @Get()
    @Paginated(Developer)
    public list(@PageQuery() options: PageOptions): Promise<Developer[]>
    {
        return this.developerService.list(options);
    }
}