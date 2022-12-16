import { Controller, Delete, Get, Inject, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AccessTokenAuth, LocalAuth, RefreshTokenAuth } from "./auth.decorator";
import { AuthService } from "./auth.service";
import { User } from "./dto/user.dto";


@Controller("auth")
export class AuthController
{
    @Inject()
    private authService: AuthService;


    @Post("signin")
    @LocalAuth()
    public signIn(@Req() request: Request)
    {
        return this.authService.signIn(request.user as User);
    }

    @Get("refresh")
    @RefreshTokenAuth()
    public refresh(@Req() request: Request)
    {
        const id = request.user["sub"];
        const refreshToken = request.user["refreshToken"];

        return this.authService.refresh(id, refreshToken);
    }

    @Delete("signout")
    @AccessTokenAuth()
    public signOut(@Req() request: Request)
    {
        const id = request.user["sub"];
        this.authService.signOut(id);   
    }
}