import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    @Inject()
    private authService: AuthService;


    async validate(userName: string, password: string): Promise<any>
    {
        const user = await this.authService.validateUser(userName, password);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}