import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module";
import { AppExceptionFilter } from "./common/app.filter";
import { TraceMiddleware } from "./common/trace.middleware";
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
	],
	providers: [{ 
		provide: "APP_FILTER", 
		useClass: AppExceptionFilter 
	}]
})
export class AppModule implements NestModule
{
	configure(consumer: MiddlewareConsumer)
	{
		consumer.apply(TraceMiddleware).forRoutes("*");
	}
}