import { createParamDecorator, applyDecorators, ExecutionContext, UseInterceptors, SetMetadata } from "@nestjs/common";
import { ObjectLiteral, EntityTarget } from "typeorm";
import { PageInterceptor } from "./page.interceptor";
import { PageOptions } from "./page.dto";


export function Paginated(returnType: EntityTarget<ObjectLiteral>)
{
    return applyDecorators(
        SetMetadata("ReturnType", returnType),
        UseInterceptors(PageInterceptor)
    );
}

export const PageQuery = createParamDecorator(
    (data: unknown, context: ExecutionContext): PageOptions => {
        return PageOptions.of(context);
    }
);