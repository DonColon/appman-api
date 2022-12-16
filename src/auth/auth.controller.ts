import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { LocalAuth } from "./auth.decorator";
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
}