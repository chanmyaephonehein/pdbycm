import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "../../../utils/jwtUtils";

const prisma = new PrismaClient();

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: (error as Error).message,
      });
  }
}
