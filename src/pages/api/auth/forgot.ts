import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "Gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Gmail account
    pass: process.env.EMAIL_PASS, // App password (to be replaced with environment variable for security)
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  // Enhanced error handling and logging
  const { email } = req.body; // Extract the email from the request body
  if (!email) return res.status(400).send({ message: "Fill the mail" });

  console.log(email);
  const isExist = await prisma.user.findFirst({ where: { email: email } });
  if (!isExist) return res.status(404).send({ message: "No user found" }); // Return 404 if no user is found with the email

  // Generate a secure password reset token using the crypto module
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 900000); // Token is valid for 15 minutes (600000ms)

  // Save the generated reset token and expiry time in the database
  await prisma.user.update({
    where: { email },
    data: {
      resetToken, // Store the generated reset token
      resetTokenExpiry: tokenExpiry, // Store the expiry time of the reset token
    },
  });

  // Create a password reset URL containing the reset token
  const resetUrl = `http://localhost:3000/reset/${resetToken}`; // Adjust the URL to match the frontend route for password reset
  const mailOptions = {
    to: email, // Recipient of the reset email
    from: process.env.EMAIL_USER, // Sender's email (could be your service's email address)
    subject: "Password Reset Request", // Subject of the email
    text: `You requested a password reset. This reset link will last for only 15 mintues.Click the link to reset your password: ${resetUrl}`, // Body of the email with the reset link
  };

  // Send the reset password email to the user
  await transporter.sendMail(mailOptions);

  // Respond with success message once email is sent
  res.status(200).send("Password reset email sent");
}
