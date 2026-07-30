import fs from "fs";
import path from "path";
import type { Platform } from "@/types/platform";

const platformsPath = path.join(process.cwd(), "content", "platforms.json");

export function getAllPlatforms(): Platform[] {
  const raw = fs.readFileSync(platformsPath, "utf-8");
  return JSON.parse(raw);
}

export function getActivePlatforms(): Platform[] {
  return getAllPlatforms().filter((platform) => {
    return (platform.status || "").toLowerCase() === "active";
  });
}
