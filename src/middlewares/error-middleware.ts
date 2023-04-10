import { Request, Response, NextFunction } from "express";
import Constants from "../utils/constants";
import { ValidationError } from "sequelize";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errors:any = ''
    err.statusCode = err.statusCode || Constants.STATUS_CODE.SERVER_ERROR
    err.message = err.message || Constants.SERVER_MESSAGE.SERVER_ERROR
    if (err instanceof ValidationError) {
        err.errors.map((e) => {
            let error;
            
            console.log(e)
            switch (e.validatorKey) {
                case 'isEmail':
                    error = 'Please enter a valid email';
                    break;
                case 'isDate':
                    error = 'Please enter a valid date';
                    break;
                case 'len':
                    if (e.validatorArgs[0] === e.validatorArgs[1]) {
                        error = 'Use ' + e.validatorArgs[0] + ' characters';
                    } else {
                        error = 'Use between ' + e.validatorArgs[0] + ' and ' + e.validatorArgs[1] + ' characters';
                    }
                    break;
                case 'min':
                    error = 'Use a number greater or equal to ' + e.validatorArgs[0];
                    break;
                case 'max':
                    error = 'Use a number less or equal to ' + e.validatorArgs[0];
                    break;
                case 'isInt':
                    error = 'Please use an integer number';
                    break;
                case 'is_null':
                    error = 'Please complete this field';
                    break;
                case 'not_unique':
                    error = {[e.path ?? 'error']:e.value + ' is taken. Please choose another one'};
                    // e.path = e.path.replace("_UNIQUE", "");
            }
            errors = error
            console.log({error})
        });
    }
    let payload = { success: false, message: err.message }
    console.log({payload});
    if (errors) Object.assign(payload,{errors});
    console.log({payload});
    res.status(err.statusCode).json(payload) 

}

export default errorMiddleware