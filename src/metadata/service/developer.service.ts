import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateOptions } from "src/common/page.dto";
import { Repository } from 'typeorm';
import { Developer } from "../entity/developer.entity";


@Injectable()
export class DeveloperService
{
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>;


    create(developer: Developer): Promise<Developer>
    {
        return this.developerRepository.save(developer);
    }

    retrieve(id: number): Promise<Developer>
    {
        return this.developerRepository.findOneBy({
            developerID: id
        });
    }

    update(id: number, developer: Developer)
    {
        this.developerRepository.update({ developerID: id }, developer);
    }

    delete(id: number)
    {
        this.developerRepository.delete({ developerID: id });
    }

    listAll(options: PaginateOptions): Promise<Developer[]>
    {
        return this.developerRepository.find(options.toQuery());
    }
}