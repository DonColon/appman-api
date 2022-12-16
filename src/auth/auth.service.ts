import { UnauthorizedException, Inject, Injectable, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { DeveloperService } from "src/metadata/service/developer.service";
import { Credential } from "./dto/credential.dto";
import { AuthToken } from "./dto/token.dto";
import { User } from "./dto/user.dto";


@Injectable()
export class AuthService
{
    @Inject()
    private jwtService: JwtService;

    @Inject()
    private developerService: DeveloperService;

    @Inject()
    private configService: ConfigService;


    public async validateUser(credential: Credential): Promise<User>
    {
        const user = await this.developerService.retrieveByUserName(credential.userName);

        if(!user || user.password !== credential.password) {
            throw new UnauthorizedException("username or password incorrect");
        }

        const { password, ...result } = user;
        return result;
    }

    public async signIn(user: User): Promise<AuthToken>
    {
        const payload = { sub: user.id, username: user.userName };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
                expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES_IN")
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN")
            })
        ]);

        this.developerService.update(user.id, {
            refreshToken: refreshToken
        });

        return { accessToken, refreshToken };
    }

    public async refresh(id: number, refreshToken: string): Promise<AuthToken>
    {
        const user = await this.developerService.retrieve(id);

        if(!user || !user.refreshToken) {
            throw new ForbiddenException();
        }
        
        if(user.refreshToken !== refreshToken) {
            throw new ForbiddenException();
        }

        return this.signIn(user);
    }

    public signOut(id: number)
    {
        this.developerService.update(id, {
            refreshToken: null
        });
    }
}