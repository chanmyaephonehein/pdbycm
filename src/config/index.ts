interface Config {
  apiBaseUrl: string;
  // environment: string;
}

export const config: Config = {
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
  // environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "",
};

// export const getEnv = () => {
//   if (config.environment === "production") return null;
//   if (config.environment === "development") return "Development";
//   if (config.environment === "staging") return "Staging";
// };
