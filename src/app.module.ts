import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database.module";
import { MetadataModule } from "./metadata/metadata.module";


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		DatabaseModule,
		AuthModule,
		MetadataModule,
	]
})
export class AppModule {}