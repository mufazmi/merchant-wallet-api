"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const merchant_fund_controller_1 = __importDefault(require("../controllers/merchant-fund-controller"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
router.post('/', am(merchant_fund_controller_1.default.create));
router.get('/', am(merchant_fund_controller_1.default.findAll));
router.get('/:id', am(merchant_fund_controller_1.default.findOne));
exports.default = router;
