import { createParamDecorator, applyDecorators, ExecutionContext, UseInterceptors, SetMetadata } from "@nestjs/common";
import { ObjectLiteral, EntityTarget } from "typeorm";
import { Request } from "express";
import { PageInterceptor } from "./page.interceptor";
import { PageOptions } from "./page.dto";


export function Paginated(returnType: EntityTarget<ObjectLiteral>)
{
    return applyDecorators(
        SetMetadata("returnType", returnType),
        UseInterceptors(PageInterceptor)
    );
}

export const PageQuery = createParamDecorator((data: unknown, context: ExecutionContext): PageOptions => {
    const request = context.switchToHttp().getRequest() as Request;
    return PageOptions.of(request);
});