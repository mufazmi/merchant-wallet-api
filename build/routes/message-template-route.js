"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_template_controller_1 = __importDefault(require("../controllers/message-template-controller"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
router.post('/', am(message_template_controller_1.default.create));
router.get('/', am(message_template_controller_1.default.findAll));
router.get('/:id', am(message_template_controller_1.default.findOne));
router.patch('/:id', am(message_template_controller_1.default.update));
router.delete('/:id', am(message_template_controller_1.default.destroy));
exports.default = router;
