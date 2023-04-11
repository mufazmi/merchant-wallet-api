"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const merchant_1 = __importDefault(require("./merchant"));
const message_template_route_1 = __importDefault(require("../routes/message-template-route"));
const country_route_1 = __importDefault(require("../routes/country-route"));
router.use('/auth/merchant', merchant_1.default);
router.use('/message/template', message_template_route_1.default);
router.use('/country', country_route_1.default);
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);
exports.default = router;
