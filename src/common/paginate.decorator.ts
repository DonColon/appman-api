import { createParamDecorator, applyDecorators, ExecutionContext, UseInterceptors, SetMetadata } from "@nestjs/common";
import { PaginateInterceptor } from "./paginate.interceptor";
import { ObjectLiteral, EntityTarget } from "typeorm";
import { Request } from "express";
import { PaginateOptions } from "./page.dto";


export function Paginated(returnType: EntityTarget<ObjectLiteral>)
{
    return applyDecorators(
        SetMetadata("returnType", returnType),
        UseInterceptors(PaginateInterceptor)
    );
}

export const PaginateQuery = createParamDecorator((data: unknown, context: ExecutionContext): PaginateOptions => {
    const request = context.switchToHttp().getRequest() as Request;
    return PaginateOptions.of(request);
});