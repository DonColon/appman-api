import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DeveloperService } from "src/metadata/service/developer.service";


@Injectable()
export class AuthService
{
    @Inject()
    private developerService: DeveloperService;

    @Inject()
    private jwtService: JwtService;


    async validateUser(userName: string, password: string): Promise<any>
    {
        const user = await this.developerService.retrieveByUserName(userName);

        if(!user || user.password !== password) {
            return null;
        }

        delete user.password;
        return user;
    }

    async login(user: any)
    {
        const payload = {
            username: user.userName,
            sub: user.developerID
        };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}