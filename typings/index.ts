import { Document } from "mongoose";

export interface IUsers extends Document {
  uname: string;
  psw: string;
}
