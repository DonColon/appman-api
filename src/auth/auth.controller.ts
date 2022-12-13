import { Controller, Inject, Post, Request } from "@nestjs/common";
import { PasswordAuth } from "./auth.decorator";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController
{
    @Inject()
    private authService: AuthService;

    
    @Post("login")
    @PasswordAuth()
    async login(@Request() request)
    {
        return this.authService.login(request.user);    
    }
}