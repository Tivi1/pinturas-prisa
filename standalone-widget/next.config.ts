import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /** Evita que Turbopack tome como raíz el monorepo padre cuando hay otro package-lock aquí abajo. */
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
