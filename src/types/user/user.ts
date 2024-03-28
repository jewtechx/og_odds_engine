import { Model, Types, Document } from 'mongoose';

export interface IUserAuth {
  user: IUser;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserInput {
  username: string;
  email: string;
  password: string;
}


export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  validatePassword(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserDocument> {}
