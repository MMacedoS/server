import { z } from "zod";

const envSchecma = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  GEMINI_API_KEY: z.string().min(1, "Google Gemini API key is required"),
});

export const env = envSchecma.parse(process.env);
