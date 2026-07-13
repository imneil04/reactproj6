import type { LucideIcon } from "lucide-react";
//interfaces
export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Position {
  id: number;
  title: string;
  location: string;
  employmentType: string;
  department: string;
  description: string;
}

export interface HiringStep {
  number: string;
  title: string;
  description: string;
}