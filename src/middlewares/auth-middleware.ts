import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import tokenService from "../services/token-service";
import ErrorHandler from "../utils/error-handler";

const auth = async (req: Request, res: Response, next: NextFunction) => {

    // console.log(req.header("authorization"));
    // console.log(req.header("refresh"));
    // const {authorization: accessTokenReq, refresh: refreshTokenReq} = req.header;
    let accessTokenReq: string = req.header("authorization") ?? '';
    let refreshTokenReq: string = req.header("refresh") ?? '';

    if (accessTokenReq)
        accessTokenReq = accessTokenReq.split(' ')[1]
    if (refreshTokenReq)
        refreshTokenReq = refreshTokenReq.split(' ')[1]

    console.log({ accessTokenReq })

    try {
        const tokenUser = tokenService.verifyAccessToken({ token: accessTokenReq });
        if (!tokenUser)
            return next(ErrorHandler.forbidden("Access Expired"))
        //@ts-ignore
        req.admin = tokenService

    }
    catch (e) {
        if (e instanceof TokenExpiredError) {
            if (!refreshTokenReq)
                return ErrorHandler.forbidden("Access Expired")

            const tokenUser = tokenService.verifyRefreshToken({ token: refreshTokenReq });
            if (!tokenUser)
                return ErrorHandler.forbidden("Access Expired")

            const token = await tokenService.findRefreshToken(refreshTokenReq);
            if (!token)
                return ErrorHandler.forbidden("Access Expired")

            console.log(token);

        }
    }

    return next();

}

export default auth;