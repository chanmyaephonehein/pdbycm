import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
  const { token, newPw } = req.body; // Extract the token and new password from the request body
  console.log(token, newPw);
  // Validate if the token and new password are provided, and if the password is sufficiently long
  const isValid = token && newPw && newPw.length > 7;
  if (!isValid) return res.status(400).send("Bad Request."); // Return 400 if validation fails

  // Look for a user with the provided reset token in the database
  const isExist = await prisma.user.findFirst({
    where: { resetToken: token },
  });

  // If no user is found with the token, return 404
  if (!isExist)
    return res.status(404).send("User is not found or token is expired");
  // Check if the reset token is valid and not expired
  const user = await prisma.user.findFirst({
    where: { resetToken: token, resetTokenExpiry: { gt: new Date() } }, // Check token expiry
  });

  // If no valid user is found, return an error message
  if (!user) {
    return res.status(400).send("Invalid or expired token.");
  }

  // Hash the new password for security
  const hashedPassword = await bcrypt.hash(newPw, 10);

  // Update the user's password and clear the reset token and expiry
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword, // Save the new hashed password
      resetToken: null, // Remove the reset token after use
      resetTokenExpiry: null, // Clear the reset token expiry
    },
  });

  // Send a confirmation email to the user about the password reset
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: user.email, // Recipient's email address
    subject: "Reset Password", // Subject of the email
    text: `Password is just reset successfully`, // Email body
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  // Return a success response
  res.status(200).send("Password reset successful!");
}
