import { z } from "zod";
import FormatErrors from "../utils/formatErrors";

type DotEnv = {
  HOST?: string;
  PORT?: number;
};

const serverSchema = z.object({
  HOST: z.preprocess((str) => process.env.VERCEL_URL ?? str, // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    z.string(),
  ).optional(),
  PORT: z.string().transform(item => Number(item)).optional()
});

const serverEnv = serverSchema.safeParse(process.env);

if(!serverEnv.success) {
  console.error("❌ Invalid environment variables:\n", ...FormatErrors(serverEnv.error.format()));
  throw new Error("Invalid environment variables");
}

export const env = serverEnv.data as DotEnv;