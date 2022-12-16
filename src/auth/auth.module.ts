import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MetadataModule } from "src/metadata/metadata.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { RefreshTokenStrategy } from "./strategy/refresh-token.strategy";


@Module({
    imports: [
        MetadataModule,
        JwtModule.register({})
    ],
    providers: [
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        LocalStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule {}