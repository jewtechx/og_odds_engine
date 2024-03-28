"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateField = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
exports.privateField = ['password', '__v', 'verificationCode', 'passwordResetCode', 'verified'];
const userSchema = new mongoose_1.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String }
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hash;
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
userSchema.methods.validatePassword = function (pass) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(pass, this.password);
    });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map