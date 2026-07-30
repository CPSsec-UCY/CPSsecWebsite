export type PlatformIcon = "Network" | "Shield" | "Cpu" | "Monitor";

export interface Platform {
  name: string;
  icon: PlatformIcon;
  description: string;
  tags: string[];
  status?: string;
  features: string[];
}
