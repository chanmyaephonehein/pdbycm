import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
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

      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          country: true,
        },
      });

      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  } else if (req.method === "POST") {
    const { name, email, password, role, country } = req.body;

    if (!name || !email || !password || !role || !country) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    const addedUser = await prisma.user.create({
      data: { email, name, password: hashedPassword, role, country },
    });

    return res.status(200).send({ addedUser });
  } else if (req.method === "PUT") {
    const { id, name, role, country } = req.body;

    if (!id || !name || !role || !country) {
      return res
        .status(400)
        .json({ message: "ID, name, role, and country are required" });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id as string) },
        data: { name, role, country },
      });

      return res.json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      await prisma.user.delete({ where: { id: parseInt(id as string) } });
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  }
}
