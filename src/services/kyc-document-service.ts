import KycDocument from "../models/kyc-document-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class KycDocumentService{

    create = async (data:InferCreationAttributes<KycDocument>) => await KycDocument.create(data);

    findOne = async (filter:any) => await KycDocument.findOne({where:filter});

    findAll = async (filter:any) => await KycDocument.findAll({where:filter});

    update = async (filter:any,data:any) => await KycDocument.update(data,{where:filter});

    destroy = async (filter:any) => await KycDocument.destroy({where:filter});
    
}

export default new KycDocumentService