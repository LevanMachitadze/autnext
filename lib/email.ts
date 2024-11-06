import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  auth: {
    user: 'resend',
    password: process.env.RESEND_API_KEY,
  },
});