import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  console.log("token is here", token);
  // Validate the token presence in the request body
  if (!token) return res.status(400).send("Bad Request: Token is required");

  try {
    // Check if the token exists and has not expired
    const verificationRecord = await prisma.emailVerifications.findFirst({
      where: { token, expiresAt: { gt: new Date() } }, // Ensure the token is still valid (not expired)
    });

    // If the token is not found or expired, send an error response
    if (!verificationRecord) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    // If the token is valid, return a success response
    else return res.status(200).send("OK");
  } catch (error) {
    console.error("Error during token validation:", error);
    res.status(500).send("Server error while validating token.");
  }
}
