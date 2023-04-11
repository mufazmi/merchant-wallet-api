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
const axios_1 = __importDefault(require("axios"));
class SmsService {
    constructor() {
        this.sendOtp = (data) => __awaiter(this, void 0, void 0, function* () {
            const text = `EgPaid never calls you asking for OTP. Don't share your OTP with anyone. Your OTP is ${data.otp} Valid for 3 min, ID:78799gdg`;
            const payload = {
                mobile: data.mobile,
                text
            };
            return yield this.sendSms(payload);
        });
        /**
         * TEMPRORY DEFINING THE FUNCTION LIKE THIS
         * WE CAN EASILY UTILISE THIS FUNCTION
         */
        this.sendSms = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = 'test';
                const domain = 'ab.com';
                const url = `${domain}/api/mt/SendSMS?apikey=${apiKey}&senderid=test&channel=test&DCS=0&flashs ms=0&number=${data.mobile}&text=${data.text}&route=15&DLTTemplateId=1207161596306313471`;
                const res = yield axios_1.default.get(url);
                console.log(res);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new SmsService;
