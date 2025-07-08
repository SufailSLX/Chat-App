import { Request, Response } from "express";
import { Message } from "../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, message } = req.body;

  try {
    const newMessage = await Message.create({ sender: senderId, message });
    const populated = await newMessage.populate("sender", "username");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to save message" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load messages" });
  }
};
