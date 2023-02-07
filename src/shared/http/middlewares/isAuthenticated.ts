import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth"

export default function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    
    if (!authHeader){
        throw new AppError("JWT Token is missing")
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT Token')
    }
}