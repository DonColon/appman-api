import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


const MAX_LABEL_LENGTH = 64;


@Injectable()
export class ParseLabelPipe implements PipeTransform<string, string>
{
    private isKebapCase = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/;


    transform(value: string, metadata: ArgumentMetadata): string
    {
        const label = value.trim();

        if(!label.match(this.isKebapCase)) {
            throw new BadRequestException("Path: label should be in kebap-case");
        }

        if(label.length < 1) {
            throw new BadRequestException("Path: label length minimum limit is 1");
        }

        if(label.length > MAX_LABEL_LENGTH) {
            throw new BadRequestException(`Path: label length maximum limit is ${MAX_LABEL_LENGTH}`);
        }

        return label;
    }
}