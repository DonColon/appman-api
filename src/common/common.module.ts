import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AppExceptionFilter } from "./app.filter";
import { TraceMiddleware } from "./trace.middleware";


@Module({
	providers: [{
		provide: APP_FILTER,
		useClass: AppExceptionFilter
	}, {
		provide: APP_INTERCEPTOR,
		useClass: ClassSerializerInterceptor,
	}]
})
export class CommonModule implements NestModule
{
	configure(consumer: MiddlewareConsumer)
	{
		consumer.apply(TraceMiddleware).forRoutes("*");
	}
}