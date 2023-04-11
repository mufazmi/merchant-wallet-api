"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_model_1 = __importDefault(require("../models/token-model"));
const accessKey = process.env.ACCESS_KEY || '';
const refreshKey = process.env.REFRESH_KEY || '';
class TokenService {
    constructor() {
        this.generateToken = (payload) => {
            const accessToken = jsonwebtoken_1.default.sign(payload, accessKey, {
                expiresIn: '1y' // For Testing
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, refreshKey, {
                expiresIn: '1y'
            });
            return { accessToken, refreshToken };
        };
        this.verifyAccessToken = ({ token }) => jsonwebtoken_1.default.verify(token, accessKey);
        this.verifyRefreshToken = ({ token }) => jsonwebtoken_1.default.verify(token, refreshKey);
        this.storeRefreshToken = (data) => __awaiter(this, void 0, void 0, function* () { return yield token_model_1.default.create(data); });
        this.findRefreshToken = ({ filter }) => __awaiter(this, void 0, void 0, function* () { return token_model_1.default.findOne({ where: filter }); });
    }
}
exports.default = new TokenService;
