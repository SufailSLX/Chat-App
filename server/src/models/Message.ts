import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
