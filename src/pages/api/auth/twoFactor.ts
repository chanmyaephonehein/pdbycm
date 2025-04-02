import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "@/utils/jwtUtils";
import nodemailer from "nodemailer";
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
  const { dialogInput, email } = req.body;
  const genCode = parseInt(dialogInput, 10);

  // Check if the code matches the stored one and is still valid (not expired)
  const ifExpire = await prisma.user.findFirst({
    where: {
      email,
      twoStepCode: genCode,
      codeExpiresAt: { gt: new Date() },
    }, // Ensure code has not expired
  });

  // Verify if the code exists, regardless of expiration
  const validCode = await prisma.user.findFirst({
    where: { email, twoStepCode: genCode },
  });

  // Return error if the code is invalid
  if (!validCode) {
    return res.status(401).send("Your code is wrong! Try again");
  }

  // Return error if the code is expired
  if (!ifExpire) {
    return res.status(400).send("Invalid or expired verification link.");
  }

  const token = generateToken(validCode);
  console.log(token);

  // Send a confirmation email about login
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login Account",
    text: `Your account is just log in!`,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({ token });
}
