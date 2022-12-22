import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptions } from "src/common/page.dto";
import { DeepPartial, Repository } from 'typeorm';
import { Developer } from "../entity/developer.entity";


@Injectable()
export class DeveloperService
{
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>;


    public async create(developer: Developer): Promise<Developer>
    {
        try {
            return await this.developerRepository.save(developer);

        } catch(exception) {

            throw new BadRequestException("Body: data is invalid");
        }
    }

    public retrieve(id: number): Promise<Developer>
    {
        const entity = this.developerRepository.findOneBy({ id: id });

        if(!entity) {
            throw new NotFoundException(`Entity with ID ${id} does not exist`);
        }

        return entity;
    }

    public retrieveByUserName(userName: string): Promise<Developer>
    {
        const entity = this.developerRepository.findOneBy({ userName: userName });

        if(!entity) {
            throw new NotFoundException(`Entity with user name ${userName} does not exist`);
        }

        return entity;
    }

    public retrieveByEmail(email: string): Promise<Developer>
    {
        const entity = this.developerRepository.findOneBy({ email: email });

        if(!entity) {
            throw new NotFoundException(`Entity with email ${email} does not exist`);
        }

        return entity;
    }

    public async update(id: number, developer: DeepPartial<Developer>)
    {
        const exists = this.developerRepository.findOneBy({ id: id });

        if(!exists) {
            throw new NotFoundException(`Entity with ID ${id} does not exist`);
        }

        try {
            await this.developerRepository.update({ id: id }, developer);

        } catch(exception) {

            throw new BadRequestException("Body: data is invalid");
        }
    }

    public delete(id: number)
    {
        const exists = this.developerRepository.findOneBy({ id: id });

        if(!exists) {
            throw new NotFoundException(`Entity with ID ${id} does not exist`);
        }

        this.developerRepository.delete({ id: id });
    }

    public listAll(options: PageOptions): Promise<Developer[]>
    {
        return this.developerRepository.find(options.toQuery());
    }
}