import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arivianosumantri25@gmail.com',
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
