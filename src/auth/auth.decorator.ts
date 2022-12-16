import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


export function LocalAuth() 
{
    return applyDecorators(
        UseGuards(AuthGuard('local'))
    );
}

export function AccessTokenAuth()
{
    return applyDecorators(
        UseGuards(AuthGuard("jwt"))
    );
}

export function RefreshTokenAuth()
{
    return applyDecorators(
        UseGuards(AuthGuard("jwt-refresh"))
    );
}