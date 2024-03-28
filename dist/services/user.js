"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("../types/app"));
class UserService extends app_1.default {
    constructor(context) {
        super(context);
    }
    // registers user
    registerUser(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(422).send('no input was received');
                }
                const _user = yield this.models.User.findOne({ email });
                if (_user)
                    throw new Error('User already exists');
                const user = new this.models.User({ email });
                yield user.save();
                return user;
            }
            catch (e) {
                res.status(500).send(`Error creating new user: ${e}`);
            }
        });
    }
    // login user
    loginUser(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, password } = req.body;
            if (!phoneNumber || !password) {
                res.status(500).send('missing required fields');
            }
            const user = yield this.models.User.findOne({ phoneNumber });
            if (!user) {
                res.status(404).send('user not found');
            }
            try {
                const valid = yield user.validatePassword(password);
                if (!valid) {
                    res.status(500).send('password incorrect');
                }
            }
            catch (e) {
                res.status(500).send('error logging in');
            }
            return user;
        });
    }
    // deletes user account
    deleteUser(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authenticate_user(req.user._id);
            if (!user) {
                res.status(404).send('Error deleting user');
            }
            try {
                yield this.models.User.findByIdAndDelete(req.user._id);
                res.status(200).send(`Deleted user successfully`);
            }
            catch (e) {
                res.status(500).send(`Error deleting user`);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map