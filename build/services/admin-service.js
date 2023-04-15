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
const admin_model_1 = __importDefault(require("../models/admin-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AdminService {
    constructor() {
        this.createAdmin = (data) => __awaiter(this, void 0, void 0, function* () { return yield admin_model_1.default.create(data); });
        this.findAdmin = (filter) => __awaiter(this, void 0, void 0, function* () { return yield admin_model_1.default.findOne({ where: filter }); });
        this.updateAdmin = (filter, data) => __awaiter(this, void 0, void 0, function* () { return yield admin_model_1.default.update(data, { where: filter }); });
        this.verifyPassword = (plane, hash) => {
            const isPasswordMatched = bcryptjs_1.default.compareSync(plane, hash);
            console.log({ isPasswordMatched });
            return isPasswordMatched;
        };
    }
}
exports.default = new AdminService;
