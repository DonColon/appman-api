import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


export function PasswordAuth()
{
    return applyDecorators(
        UseGuards(AuthGuard("local"))
    );
}

export function BearerAuth()
{
    return applyDecorators(
        UseGuards(AuthGuard("jwt"))
    );
}