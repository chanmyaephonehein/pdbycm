import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.id) {
      // Fetch a single inquiry by ID
      try {
        const inquiry = await prisma.inquiries.findUnique({
          where: { id: parseInt(req.query.id as string) }, // Ensuring type safety for query params
        });

        if (!inquiry) {
          return res.status(404).json({ error: "Inquiry not found" });
        }

        return res.json(inquiry);
      } catch (error) {
        return res.status(500).json({
          error: "Server error",
          details: (error as Error).message, // Type assertion for error
        });
      }
    } else {
      // Fetch all inquiries
      try {
        const allInquiries = await prisma.inquiries.findMany();

        return res.json(allInquiries);
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Server error", details: (error as Error).message });
      }
    }
  } else if (req.method === "POST") {
    const {
      name,
      email,
      phoneNumber,
      companyName,
      country,
      jobTitle,
      jobDetails,
    } = req.body;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !companyName ||
      !country ||
      !jobTitle ||
      !jobDetails
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const newInquiry = await prisma.inquiries.create({
        data: {
          name,
          email,
          phone: phoneNumber, // Corrected the field name for consistency
          companyName,
          country,
          jobTitle,
          jobDetails,
        },
      });

      return res.status(201).json(newInquiry);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  } else if (req.method === "PUT") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: "ID and status are required" });
    }

    try {
      const updatedInquiry = await prisma.inquiries.update({
        where: { id: parseInt(id as string) }, // Ensure id is treated as a string
        data: { status },
      });

      return res.json(updatedInquiry);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error", details: (error as Error).message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
