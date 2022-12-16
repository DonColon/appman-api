import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeveloperController } from "./controller/developer.controller";
import { Developer } from "./entity/developer.entity";
import { DeveloperService } from "./service/developer.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Developer
        ])
    ],
	controllers: [DeveloperController],
	providers: [DeveloperService],
    exports: [DeveloperService]
})
export class MetadataModule {}