import { generateToken, verifyToken } from "@/utils/jwtUtils";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
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
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
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

    const { id, search } = req.query;
    console.log("Here is the query", req.query);
    try {
      if (id) {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(id as string) },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            country: true,
          },
        });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
      }

      let users;

      if (search) {
        users = await prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: search as string, mode: "insensitive" } },
              { email: { contains: search as string, mode: "insensitive" } },
              { role: { contains: search as string, mode: "insensitive" } },
              { country: { contains: search as string, mode: "insensitive" } },
            ],
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            country: true,
          },
        });
      } else {
        users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            country: true,
          },
        });
      }

      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Check if token is valid
    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Optional: Check if user has a role that can send emails
    // You can modify this logic based on your specific requirements
    const allowedRoles = ["Admin"];
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({
        message: "Forbidden: Insufficient permissions",
        currentRole: decoded.role,
      });
    }
    const { name, email, password, role, country } = req.body;

    if (!name || !email || !password || !role || !country) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const duplicate = await prisma.emailVerifications.findFirst({
      where: { email },
    });

    if (duplicate) await prisma.emailVerifications.delete({ where: { email } });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 10 * 60 * 1500); // Token expires in 15 minutes

    // Store the verification token temporarily in the database
    await prisma.emailVerifications.create({
      data: {
        name: name || "",
        email,
        password,
        role,
        country,
        token: verificationToken,
        expiresAt: tokenExpiry,
      },
    });

    // Send verification email
    const verificationUrl = `http://localhost:3000/verify/${verificationToken}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Verify Your Email",
      text: `Click the link to verify your email: ${verificationUrl}. The link expires in 15 minutes.`,
    };

    // Send email with verification link
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send({ message: "Verification email sent. Please check your email." });

    // /////////
    // const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);
    // const addedUser = await prisma.user.create({
    //   data: { email, name, password: hashedPassword, role, country },
    // });

    // return res.status(200).send({ addedUser });
  } else if (req.method === "PUT") {
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
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
    const { id, name, role, country } = req.body;

    if (!id || !name || !role || !country) {
      return res
        .status(400)
        .json({ message: "ID, name, role, and country are required" });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // If current user is Admin and role is changing to non-admin
      if (existingUser.role === "Admin" && role !== "Admin") {
        const adminCount = await prisma.user.count({
          where: { role: "Admin" },
        });

        if (adminCount <= 1) {
          return res.status(403).json({
            message: "Cannot change role. At least one admin must remain.",
          });
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id as string) },
        data: { name, role, country },
      });
      const newToken = generateToken(updatedUser);
      res.status(200).json({ user: updatedUser, token: newToken });
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        details: (error as Error).message,
      });
    }
  } else if (req.method === "DELETE") {
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const userToDelete = await prisma.user.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }

      if (userToDelete.role === "Admin") {
        const adminCount = await prisma.user.count({
          where: { role: "Admin" },
        });

        if (adminCount <= 1) {
          return res.status(403).json({
            message: "Cannot delete the last remaining admin account.",
          });
        }
      }

      await prisma.user.delete({
        where: { id: parseInt(id as string) },
      });

      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  }
}
