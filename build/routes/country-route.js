"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const country_controller_1 = __importDefault(require("../controllers/country-controller"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
router.post('/', am(country_controller_1.default.create));
router.get('/', am(country_controller_1.default.findAll));
router.get('/:id', am(country_controller_1.default.findOne));
router.patch('/:id', am(country_controller_1.default.update));
router.delete('/:id', am(country_controller_1.default.destroy));
exports.default = router;
