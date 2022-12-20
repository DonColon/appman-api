import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppExceptionFilter } from "./app.filter";
import { TraceMiddleware } from "./trace.middleware";


@Module({
	providers: [{ 
		provide: "APP_FILTER", 
		useClass: AppExceptionFilter 
	}]
})
export class CommonModule implements NestModule
{
    configure(consumer: MiddlewareConsumer)
	{
		consumer.apply(TraceMiddleware).forRoutes("*");
	}
}