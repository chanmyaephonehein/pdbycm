import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { to, objective, response } = req.body;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: objective,
      text: response,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
}
