import jwt from "jsonwebtoken";

interface User {
  id: number;
  email: string;
  role: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string, // Cast JWT_SECRET to string
    { expiresIn: "1h" }
  );
};

export const verifyToken = (
  token: string
): { id: number; email: string; role: string } | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
      role: string;
    }; // Cast the result to the expected type
  } catch (error) {
    console.log(error);
    return null;
  }
};
