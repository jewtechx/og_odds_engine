import { Schema, model, CallbackError } from 'mongoose';
import { IUserDocument } from '../../types/user/user';
import bcrypt from 'bcrypt';

export const privateField = ['password', '__v', 'verificationCode', 'passwordResetCode', 'verified'];

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String }
  },{
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};

const User = model('User', userSchema);

export default User;
