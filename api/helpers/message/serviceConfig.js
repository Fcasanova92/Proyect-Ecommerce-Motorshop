import { config } from "dotenv";
import nodemailer from 'nodemailer' 

config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASSWORD_USER
    }
  });
