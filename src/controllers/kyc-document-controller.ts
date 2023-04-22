import { Request, Response, NextFunction } from "express"
import kycDocumentValidation from "../validations/kyc-document-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import kycDocumentService from "../services/kyc-document-service";
import { AuthRequest } from "../interfaces/interface";
import { InferAttributes } from "sequelize";
import KycDocumentModel from "../models/kyc-document-model";
import fs from 'fs'

class KycDocumentController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant

        //VALIDATION AND PROCESS START
        try {
            const files: any = req.files;
            const panFront = files['pan_front']?.[0];
            const aadharFront = files['aadhar_front']?.[0];
            const aadharBack = files['aadhar_back']?.[0];
            const proof = files['proof']?.[0];
            if (!panFront || !aadharFront || !aadharBack) {
                // DELETE UPLOAD FILES , IF CONDITION GOES FALSE
                if (panFront) fs.unlinkSync(panFront.path);
                if (aadharFront) fs.unlinkSync(aadharFront.path);
                if (aadharBack) fs.unlinkSync(aadharBack.path);
                if (proof) fs.unlinkSync(proof.path);
                return next(ErrorHandler.badRequest("Please upload all images"));
            }
        } catch (error) {
            return next(error);
        }
        // VALIDATION AND PROCESS END
        
        return res.json('ok')
        // const kycDocument: InferAttributes<KycDocumentModel> | null = await kycDocumentService.findOne({ merchant_id: id });
        // if (kycDocument)
        //     return next(ErrorHandler.forbidden(Messages.KYC.DOCUMENT_KYC_ALREADY_CREATED))

        // body.merchant_id = id


        // const data = await kycDocumentService.create(body);
        // return data ? responseSuccess({ res: res, message: Messages.KYC.DOCUMENT_KYC_CREATED }) : next(ErrorHandler.serverError(Messages.KYC.DOCUMENT_KYC_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const data = await kycDocumentService.findOne({ merchant_id: id });
        return data ? responseSuccess({ res: res, message: Messages.KYC.DOCUMENT_KYC_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.KYC.DOCUMENT_KYC_NOT_FOUND));

    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const body = await kycDocumentValidation.update.validateAsync(req.body);
        const kycDocument = await kycDocumentService.findOne({ merchant_id: id });
        if (!kycDocument)
            return next(ErrorHandler.notFound(Messages.KYC.DOCUMENT_KYC_NOT_FOUND))

        const data = await kycDocumentService.update({ id: kycDocument.id }, body);
        return data ? responseSuccess({ res: res, message: Messages.KYC.DOCUMENT_KYC_UPDATED }) : next(ErrorHandler.serverError(Messages.KYC.DOCUMENT_KYC_UPDATE_FAILED));
    }

}

export default new KycDocumentController