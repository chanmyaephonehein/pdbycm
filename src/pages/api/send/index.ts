import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { verifyToken } from "@/utils/jwtUtils";

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
  // Method check
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify token
  const decoded = verifyToken(token);

  // Check if token is valid
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  // Optional: Check if user has a role that can send emails
  // You can modify this logic based on your specific requirements
  const allowedRoles = ["Admin", "Staff"];
  if (!allowedRoles.includes(decoded.role)) {
    return res.status(403).json({
      message: "Forbidden: Insufficient permissions",
      currentRole: decoded.role,
    });
  }

  try {
    const { to, objective, response } = req.body;

    // Validate required fields
    if (!to || !objective || !response) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: objective,
      text: response,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Email sent successfully",
      sentBy: decoded.email || decoded.role,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
}
