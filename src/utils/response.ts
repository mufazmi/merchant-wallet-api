import { Response } from "express"
import Constants from "./constants"

interface iResponseSuccess{
    res:Response,
    message:string,
    data?:any
}

const responseSuccess = ({res,message,data}:iResponseSuccess) =>{
    let payload = {
        success:true,
        message
    }
    if(data)
        Object.assign(payload,{data})
    
    return res.status(Constants.STATUS_CODE.SUCCESS).json(payload)
}

export default responseSuccess;