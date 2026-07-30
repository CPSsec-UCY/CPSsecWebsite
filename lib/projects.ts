import fs from "fs";
import path from "path";
import type { Project } from "@/types/project";

const projectsPath = path.join(process.cwd(), "content", "projects.json");

export function getAllProjects(): Project[] {
  const raw = fs.readFileSync(projectsPath, "utf-8");
  return JSON.parse(raw);
}
