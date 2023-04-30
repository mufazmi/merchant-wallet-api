import express,{Request,Response,NextFunction} from 'express';
import { AuthRequest } from '../interfaces/interface';
import merchantService from '../services/merchant-service';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import Res from '../utils/response';


class MerchantController{
    
    profile = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const {id} = req.merchant;
        const data = await merchantService.findOne({ id });
        return data ? Res.success({ res: res, message: Messages.MERCHANT.MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.MERCHANT_NOT_FOUND));

    }


}

export default new MerchantController