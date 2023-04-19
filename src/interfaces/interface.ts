import { Request } from "express";
import { InferAttributes } from "sequelize";
import Merchant from "../models/merchant-model";

export interface AuthRequest extends Request {
    merchant: InferAttributes<Merchant>
}