import { Request, Response, NextFunction } from "express"
import kycDocumentValidation from "../validations/kyc-document-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import kycDocumentService from "../services/kyc-document-service";
import { AuthRequest } from "../interfaces/interface";
import { InferAttributes } from "sequelize";
import KycDocumentModel from "../models/kyc-document-model";
import multer, { StorageEngine } from 'multer';


class KycDocumentController {

    storageEngine: StorageEngine = multer.diskStorage({
        destination: (req: Request, file: File, cb: (error: Error | null, destination: string) => void) => {
          if (['pan_front', 'aadhar_front', 'aadhar_back', 'proof'].includes(file.fieldname)) {
            cb(null, './storage/images');
          } else {
            cb(new Error('Invalid field name'), '');
          }
        },
        filename: (req: Request, file: File, cb: (error: Error | null, filename: string) => void) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        },
      });

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant
        const body = await kycDocumentValidation.create.validateAsync(req.body);
        console.log(body);
        const kycDocument: InferAttributes<KycDocumentModel> | null = await kycDocumentService.findOne({ merchant_id: id });
        console.log({ kycDocument })
        if (kycDocument)
            return next(ErrorHandler.forbidden(Messages.KYC.DOCUMENT_KYC_ALREADY_CREATED))
        body.merchant_id = id
        const data = await kycDocumentService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.KYC.DOCUMENT_KYC_CREATED }) : next(ErrorHandler.serverError(Messages.KYC.DOCUMENT_KYC_CREATION_FAILED));
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