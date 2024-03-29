import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh")
{
    constructor(configService: ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("JWT_REFRESH_SECRET"),
            passReqToCallback: true,
        });
    }

    public validate(request: Request, payload: any)
    {
        const refreshToken = request.get("Authorization").replace("Bearer", "").trim();
        return { ...payload, refreshToken };
    }
}