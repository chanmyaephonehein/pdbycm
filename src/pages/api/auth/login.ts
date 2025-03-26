import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
// import { generateToken } from "../../../utils/jwtUtils";
import nodemailer from "nodemailer";

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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    const isVerify = await prisma.user.findFirst({
      where: { email, verify: true },
    });

    if (!isVerify)
      return res.status(404).json({ message: "Email is not verify yet." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const now = new Date();

    // Generate and send a verification code for 2-step authentication
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // expires in 15 minutes

    await prisma.user.update({
      where: { email },
      data: { codeExpiresAt: expiresAt, twoStepCode: verificationCode },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Login Verification Code",
      text: `Your verification code is ${verificationCode}. It will expire in 15 minutes.`,
    };

    // Send verification email with the code
    await transporter.sendMail(mailOptions);

    // const token = generateToken(user);
    // return res.status(200).json({ token, role: user.role });

    return res
      .status(200)
      .send("Verification code sent to your email. Please verify.");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}
