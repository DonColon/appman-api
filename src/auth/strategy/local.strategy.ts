import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(private authService: AuthService)
    {
        super();
    }


    public async validate(username: string, password: string)
    {
        const user = await this.authService.validateUser({
            userName: username,
            password: password
        });

        return user;
    }
}