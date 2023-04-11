"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
// router.post('/register',am(merchantController.register))
router.post('/login', am(auth_controller_1.default.login));
router.post('/verify', am(auth_controller_1.default.verify));
exports.default = router;
