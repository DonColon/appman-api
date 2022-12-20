import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { networkInterfaces } from "os";


@Injectable()
export class TraceMiddleware implements NestMiddleware
{
    private traceSequence: number = 999;


    public use(request: Request, response: Response, next: NextFunction)
    {        
        request.headers["x-trace-id"] = this.generateTraceID();
        next();
    }

    private generateTraceID(): string
    {
        const hexCode = this.generateHexCode();
        const sequence = this.generateSequence();

        return hexCode + Date.now() + sequence + process.pid;
    }

    private generateHexCode(): string
    {
        const ip = this.findCurrentIP();
        const octets = ip.split(".");

        return octets.map(
            (value) => parseInt(value).toString(16).padStart(2, "0")
        )
        .join("");
    }

    private findCurrentIP(): string
    {
        const interfaces = networkInterfaces();

        for(const name in interfaces) {
            for(const network of interfaces[name]) {
                if(network.family === "IPv4" && !network.internal) {
                    return network.address;
                }
            }
        }

        return "127.0.0.1";
    }

    private generateSequence(): number
    {
        this.traceSequence++;

        if(this.traceSequence > 9000) {
            this.traceSequence = 999;
        }

        return this.traceSequence;
    }
}