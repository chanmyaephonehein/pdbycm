import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client"; // importing the full Prisma User model

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string
  );
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    // Verify the token with additional options
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
      // Optional: Add token expiration check
      // maxAge: '1h' // Example: token valid for 1 hour
    });

    // Type guard to ensure decoded is JwtPayload
    if (typeof decoded === "string") {
      console.error("Decoded token is a string, not a payload");
      return null;
    }

    return decoded;
  } catch (error) {
    // Log specific JWT verification errors
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Token verification error:", error);
    }

    return null;
  }
};
