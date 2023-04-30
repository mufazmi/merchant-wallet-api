import { Request, Response, NextFunction } from "express"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import merchantWalletTransactionService from "../services/merchant-wallet-transaction-service";
import Res from "../utils/response";


class AdminWalletTransactionController {

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await merchantWalletTransactionService.findAll({ id });
        return data ? Res.success({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.WALLET.WALLET_TRANSACTION_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await merchantWalletTransactionService.findAll({});
        return data.length > 1 ? Res.success({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.WALLET.WALLET_TRANSACTION_NOT_FOUND));
    }
}

export default new AdminWalletTransactionController