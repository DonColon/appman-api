import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { networkInterfaces } from "os";


@Injectable()
export class TraceMiddleware implements NestMiddleware
{
    private sequence: number = 999;


    public use(request: Request, response: Response, next: NextFunction)
    {        
        const traceID = this.generateTraceID();
        request.headers["x-trace-id"] = traceID;

        next();
    }

    private generateTraceID(): string
    {
        const ip = this.currentIP();

        let hexCode = "";
        for(const octet of ip.split(".").map(Number)) {
            hexCode += octet.toString(16).padStart(2, "0");
        }

        this.sequence++;
        if(this.sequence > 9000) this.sequence = 999;

        return hexCode + Date.now() + this.sequence + process.pid;
    }

    private currentIP(): string
    {
        const interfaces = networkInterfaces();

        for(const interfaceName in interfaces) {
            for(const network of interfaces[interfaceName]) {
                if(network.family === "IPv4" && !network.internal) {
                    return network.address;
                }
            }
        }
    }
}