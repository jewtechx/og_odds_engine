"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const context_1 = tslib_1.__importDefault(require("../../middlewares/context"));
const start_1 = require("../../start");
const user_1 = tslib_1.__importDefault(require("../../models/user/user"));
const router = express_1.default.Router();
router.get('/me', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.user._id });
    res.status(200).json(user);
}));
router.get('/users', context_1.default, (_, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find();
    res.status(200).json(user);
}));
router.post('/register', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield start_1.appContext.services.UserService.registerUser(req, res);
    return res.status(201).json({ user });
}));
router.post('/login', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield start_1.appContext.services.UserService.loginUser(req, res);
    res.status(200).json(user);
}));
router.delete('/deleteuser', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield start_1.appContext.services.UserService.deleteUser(req, res);
}));
exports.default = router;
//# sourceMappingURL=user.router.js.map