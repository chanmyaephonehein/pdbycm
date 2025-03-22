import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/jwtUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid token" });
  }

  return res.status(200).json({ message: "Access granted", user: decoded });
}
