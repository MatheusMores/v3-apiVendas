import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth"
import { request } from "http";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}


export default function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    
    if (!authHeader){
        throw new AppError("JWT Token is missing")
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as TokenPayload;

        req.user = {
            id: sub
        }

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT Token')
    }
}