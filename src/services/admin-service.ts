import Admin from "../models/admin-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import bcrypt from 'bcrypt';

class AdminService{

    createAdmin = async (data:InferCreationAttributes<Admin>) => await Admin.create(data);

    findAdmin = async (filter:any) => await Admin.findOne({where:filter});

    updateAdmin = async (filter:any,data:any) => await Admin.update(data,{where:filter});

    verifyPassword =  (plane:string,hash:string) : boolean =>{
        const isPasswordMatched = bcrypt.compareSync(plane,hash)
        console.log({isPasswordMatched});
        return isPasswordMatched;
    }

}

export default new AdminService