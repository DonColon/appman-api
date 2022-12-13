import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport/dist";
import { MetadataModule } from "src/metadata/metadata.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";


@Module({
    imports: [
        MetadataModule, 
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: { 
                    expiresIn: config.get<string>("JWT_EXPIRES_IN")
                }
			})
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}