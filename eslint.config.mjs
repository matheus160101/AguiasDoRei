import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off", // deixa usar <img>
      "react/no-unescaped-entities": "off", // não reclama de aspas
      "@typescript-eslint/no-explicit-any": "off", // permite usar any
    },
  },
];

export default eslintConfig;
