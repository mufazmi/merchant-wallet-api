import multer, { StorageEngine } from 'multer';
import path = require("path");
import { Request } from "express";

class FileHanlder {
    storageEngine: StorageEngine = multer.diskStorage({
        destination: (
            req: Request,
            file,
            cb: (error: Error | null, destination: string) => void
        ) => {
            if (['pan_front', 'aadhar_front', 'aadhar_back', 'proof'].includes(file.fieldname)) {
                cb(null, './storage//kyc');
            } else {
                cb(new Error('Invalid field name'), '');
            }
        },
        filename: (
            req: Request,
            file,
            cb: (error: Error | null, filename: string) => void
        ) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        },
    });
}

export default new FileHanlder