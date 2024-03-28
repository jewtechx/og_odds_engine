"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_router_1 = tslib_1.__importDefault(require("./user.router"));
const router = express_1.default.Router();
router.use(user_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map