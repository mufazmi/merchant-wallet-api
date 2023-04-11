"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
// router.post('/',am(notificationController.create))
// router.delete('/:id',am(notificationController.destroy))
exports.default = router;
