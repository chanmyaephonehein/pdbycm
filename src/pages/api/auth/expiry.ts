import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;

  // Validate if token is provided
  if (!token) return res.status(400).send("Bad Request: Token is required");

  // Check if the user exists with the provided token and if it hasn't expired
  const isExist = await prisma.user.findFirst({
    where: { resetToken: token, resetTokenExpiry: { gt: new Date() } }, // Ensure token has not expired
  });

  // If the token doesn't exist or has expired, return a 400 response
  if (!isExist) return res.status(400).send("Invalid or expired token.");

  // If the token is valid, return a 200 status
  if (isExist) return res.status(200);
}
