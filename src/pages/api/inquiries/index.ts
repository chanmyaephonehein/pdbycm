import { verifyToken } from "@/utils/jwtUtils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { startOfDay, startOfWeek, startOfMonth } from "date-fns";

const prisma = new PrismaClient();

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
    const { id, search, range } = req.query;
    console.log("Here is the query", req.query);

    try {
      if (id) {
        const inquiry = await prisma.inquiries.findUnique({
          where: { id: parseInt(id as string) },
        });

        if (!inquiry) {
          return res.status(404).json({ message: "Inquiry not found" });
        }

        return res.status(200).json(inquiry);
      }

      let inquiries;
      let whereClause: any = {};

      // Time range filter
      if (range === "today") {
        whereClause.createdAt = {
          gte: startOfDay(new Date()),
        };
        const inquiries = await prisma.inquiries.findMany({
          where: whereClause,
        });
        if (!inquiries || inquiries.length === 0) {
          return res.status(404).json({ message: "No inquiries found" });
        }

        // ✅ Early return with filtered results
        return res.status(200).json(inquiries);
      } else if (range === "week") {
        whereClause.createdAt = {
          gte: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
        };
        const inquiries = await prisma.inquiries.findMany({
          where: whereClause,
        });
        if (!inquiries || inquiries.length === 0) {
          return res.status(404).json({ message: "No inquiries found" });
        }

        // ✅ Early return with filtered results
        return res.status(200).json(inquiries);
      } else if (range === "month") {
        whereClause.createdAt = {
          gte: startOfMonth(new Date()),
        };
        const inquiries = await prisma.inquiries.findMany({
          where: whereClause,
        });
        if (!inquiries || inquiries.length === 0) {
          return res.status(404).json({ message: "No inquiries found" });
        }

        // ✅ Early return with filtered results
        return res.status(200).json(inquiries);
      }

      if (search) {
        inquiries = await prisma.inquiries.findMany({
          where: {
            OR: [
              { name: { contains: search as string, mode: "insensitive" } },
              { email: { contains: search as string, mode: "insensitive" } },
              {
                companyName: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
              { country: { contains: search as string, mode: "insensitive" } },
            ],
          },
        });
      }
      inquiries = await prisma.inquiries.findMany();

      if (!inquiries || inquiries.length === 0) {
        return res.status(404).json({ message: "No inquiries found" });
      }

      return res.status(200).json(inquiries);
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        details: (error as Error).message,
      });
    }
  } else if (req.method === "POST") {
    const { name, email, phone, companyName, country, jobTitle, jobDetails } =
      req.body;

    if (
      !name ||
      !email ||
      !phone ||
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
          phone,
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
