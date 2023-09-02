import zod from "zod";

// Get the vue config schema and values from environment variables
const schema = zod.object({
  baseAPIURL: zod.string().default("http://localhost:4000/api"),
});

const config = Object.freeze(
  schema.parse({
    baseAPIURL: import.meta.env.VITE_BASE_API_URL,
  })
);

export default config;
