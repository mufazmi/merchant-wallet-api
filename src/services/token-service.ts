import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model";

const accessKey: string = process.env.ACCESS_KEY || '';
const refreshKey: string = process.env.REFRESH_KEY || '';

interface iGenerateToken {
    accessToken:string,
    refreshToken:string,
}

class TokenService {

    generateToken = (payload: any) : iGenerateToken=> {

        const accessToken = jwt.sign(payload, accessKey, {
            expiresIn: '1y' // For Testing
        })

        const refreshToken = jwt.sign(payload, refreshKey, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }

    verifyAccessToken = ({token}:{token:string}): {} => jwt.verify(token, accessKey);

    verifyRefreshToken = ({token}:{token:string}): {} => jwt.verify(token, refreshKey);
    
    storeRefreshToken = async (data:any) => await TokenModel.create(data);

    findRefreshToken = async ({filter}:any) => TokenModel.findOne({where:filter});

}

export default new TokenService