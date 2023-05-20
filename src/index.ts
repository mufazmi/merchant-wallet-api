import express, {Request,Response,NextFunction, Application, response} from 'express';
import dotenv from 'dotenv'
dotenv.config()
import ErrorHandler from './utils/error-handler';
import errorMiddleware from './middlewares/error-middleware';
const cookieParser = require('cookie-parser');

import dbInit from './configs/db/init';

//DB Init
dbInit();
const PORT:Number = Number(process.env.PORT || 3000)

const app:Application = express()
app.use(express.json())

//Cookie Parser Middleware
// app.use(cookieParser);

//Main Route
import mainRoute from './routes';
import responseSuccess from './utils/response';
import Res from './utils/response';

// Serve static files from the public directory
app.use(express.static('public'));

app.use('/api/v1',mainRoute);

app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    return Res.success({res,message:'SocialCodia Merchat Api',data:{
        name:'SocialCodia',
        email:'info@SocialCodia.com',
        type:'Merchant',
        status: 'ok',
        port : PORT
    }})
})


// Not Found Middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    return next(ErrorHandler.notFound())
})

//Error Middleware
app.use(errorMiddleware)

//Listning Server
app.listen(PORT,()=>console.log(`SERVER IS LISTING ON ${PORT}`))