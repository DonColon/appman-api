import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


const MAX_ID_VALUE = 4294967295;


@Injectable()
export class ParseIdPipe implements PipeTransform<string, number>
{
    private isInteger: RegExp = /^0*?[1-9]\d*$/;


    transform(value: string, metadata: ArgumentMetadata): number
    {
        const numeric = value.trim();

        if(!numeric.match(this.isInteger)) {
            throw new BadRequestException("Path: id should be a signed integer");
        }

        const id = parseInt(numeric);

        if(id > MAX_ID_VALUE) {
            throw new BadRequestException(`Path: id maximum limit is ${MAX_ID_VALUE}`); 
        }

        return id;
    }
}