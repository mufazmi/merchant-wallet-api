// import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
// import db from "../configs/db/db";
// import Constants from '../utils/constants';
// import Merchant from './merchant-model';

// class MerchantKycModel extends Model<InferAttributes<MerchantKycModel>, InferCreationAttributes<MerchantKycModel>> {
//     declare id: CreationOptional<string>
//     declare entity_type: string
//     declare business_name: string
//     declare legal_name: string
//     declare owner_name: string
//     declare business_pan: string
//     declare gst_no: number
//     declare registered_no: string
//     declare business_name: string
//     declare business_name: string
//     declare business_name: string
//     declare business_name: string
//     declare business_name: string
//     declare balance: number
//     declare hold_balance: number
    
//     declare status: string
//     declare merchant_id : ForeignKey<Merchant['id']>
// }

// MerchantKycModel.init({
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//         allowNull: false
//     },
//     pg_balance: {
//         type: DataTypes.FLOAT,
//         allowNull: false
//     },
//     hold_balance: {
//         type: DataTypes.FLOAT,
//         allowNull: false
//     },
//     balance: {
//         type: DataTypes.FLOAT,
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.STRING,
//         values: [Constants.STATUS.ENABLE, Constants.STATUS.DISABLE, Constants.STATUS.FREEZ],
//         defaultValue: Constants.STATUS.ENABLE
//     }
// }, {
//     tableName: 'merchant_wallets',
//     underscored: true,
//     freezeTableName: true,
//     timestamps: true,
//     sequelize: db
// });

// export default MerchantKycModel