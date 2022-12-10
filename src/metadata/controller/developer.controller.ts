import { Controller, Get, Inject } from "@nestjs/common";
import { Developer } from "../entity/developer.entity";
import { DeveloperService } from "../service/developer.service";


@Controller("developers")
export class DeveloperController
{
    @Inject()
    private developerService: DeveloperService;


    @Get()
    listAll(): Promise<Developer[]>
    {
        return this.developerService.listAll();
    }
}