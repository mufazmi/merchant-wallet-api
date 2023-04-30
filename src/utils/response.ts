import { Response } from "express"
import Constants from "./constants"


interface iResponseSuccess {
    res: Response,
    status_code?: string,
    message: string,
    data?: any
}

class Res {

    static success = ({ res, message, data }: iResponseSuccess) => {
        let payload = {
            status: 'Success',
            success: true,
            message
        }
        if (data)
            Object.assign(payload, { data })

        return res.status(Constants.STATUS_CODE.SUCCESS).json(payload)
    }


    static error = ({ res, status_code, message, data }: iResponseSuccess) => {
        let payload = {
            status_code,
            status: 'Failed',
            success: false,
            message
        }
        if (data)
            Object.assign(payload, { data })

        return res.status(Constants.STATUS_CODE.SUCCESS).json(payload)
    }
}

export default Res