import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


const MIN_VERSION_LENGTH = 5;
const MAX_VERSION_LENGTH = 16;


@Injectable()
export class ParseVersionPipe implements PipeTransform<string, string>
{
    private isVersion = /(?<major>0|(?:[1-9]\d*))(?:\.(?<minor>0|(?:[1-9]\d*))(?:\.(?<patch>0|(?:[1-9]\d*))))/;

    
    transform(value: string, metadata: ArgumentMetadata): string
    {
        const version = value.trim();

        if(!version.match(this.isVersion)) {
            throw new BadRequestException("Path: version has wrong format");
        }

        if(version.length < MIN_VERSION_LENGTH) {
            throw new BadRequestException(`Path: version length minimum limit is ${MIN_VERSION_LENGTH}`);
        }

        if(version.length > MAX_VERSION_LENGTH) {
            throw new BadRequestException(`Path: version length minimum limit is ${MAX_VERSION_LENGTH}`);
        }

        return version;
    }
}