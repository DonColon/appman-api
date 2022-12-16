import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptions } from "src/common/page.dto";
import { Repository } from 'typeorm';
import { Developer } from "../entity/developer.entity";


@Injectable()
export class DeveloperService
{
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>;


    public create(developer: Developer): Promise<Developer>
    {
        return this.developerRepository.save(developer);
    }

    public retrieve(id: number): Promise<Developer>
    {
        return this.developerRepository.findOneBy({
            developerID: id
        });
    }

    public retrieveByUserName(userName: string): Promise<Developer>
    {
        return this.developerRepository.findOneBy({
            userName: userName
        });
    }

    public retrieveByEmail(email: string): Promise<Developer>
    {
        return this.developerRepository.findOneBy({
            email: email
        });
    }

    public update(id: number, developer: Developer)
    {
        this.developerRepository.update({ developerID: id }, developer);
    }

    public delete(id: number)
    {
        this.developerRepository.delete({ developerID: id });
    }

    public listAll(options: PageOptions): Promise<Developer[]>
    {
        return this.developerRepository.find(options.toQuery());
    }
}