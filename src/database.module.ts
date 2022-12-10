import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: "mysql",
				host: config.get<string>("DATABASE_HOST"),
				port: config.get<number>("DATABASE_PORT"),
				database: config.get<string>("DATABASE_NAME"),
				username: config.get<string>("DATABASE_USER"),
				password: config.get<string>("DATABASE_PASSWORD"),
				autoLoadEntities: true
			})
		}),
	]
})
export class DatabaseModule {}