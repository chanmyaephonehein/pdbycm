import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/jwtUtils";
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
  const { token } = req.body; // Extract the verification token from the request body

  try {
    // Find the email verification record in the database that matches the provided token
    // Also check that the token has not expired (expiresAt > current date)
    const verificationRecord = await prisma.emailVerifications.findFirst({
      where: { token, expiresAt: { gt: new Date() } },
    });

    // If the token is not found or has expired, respond with a 400 error and message
    if (!verificationRecord) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    // If the token is valid, hash the password to store it securely in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      verificationRecord.password,
      saltRounds
    );

    // Create the user in the 'users' table with the verified email and password
    const user = await prisma.user.create({
      data: {
        name: verificationRecord.name || "", // Use the name from the verification record, or an empty string if it's missing
        email: verificationRecord.email, // Store the email from the verification record
        password: hashedPassword, // Store the hashed password
        role: verificationRecord.role,
        country: verificationRecord.country,
        verify: true, // Mark the user as verified
      },
    });

    // Clean up the email verification record after successful email verification and account creation
    await prisma.emailVerifications.delete({
      where: { id: verificationRecord.id },
    });

    // Send a welcome email to the user about the new account
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: user.email, // Recipient's email address
      subject: "Account is created with Sunderland", // Subject of the email
      text: `Your new account is created with your current email.`, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    const key = generateToken(user);
    return res.status(200).json({ token: key, role: user.role });
  } catch (err) {
    // Handle any server-side errors that occur during the process
    console.error("Error during email verification:", err);
    res.status(500).send("Server error"); // Respond with a 500 server error status
  }
}
