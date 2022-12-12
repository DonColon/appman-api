import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from "./database.module";
import { MetadataModule } from "./metadata/metadata.module";


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		DatabaseModule,
		MetadataModule,
	]
})
export class AppModule {}