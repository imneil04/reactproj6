import { GraduationCap, HeartHandshake, ShieldCheck, Users } from "lucide-react";

import type { Benefit, HiringStep, Position } from "../types/careers";

export const benefits: Benefit[] = [
  {
    title: "Meaningful Work",
    description:
      "Make a positive difference in the lives of children and families every day.",
    icon: HeartHandshake,
  },
  {
    title: "Supportive Team",
    description:
      "Work with a collaborative team that values communication, respect, and growth.",
    icon: Users,
  },
  {
    title: "Professional Growth",
    description:
      "Access learning opportunities, mentorship, and career development support.",
    icon: GraduationCap,
  },
  {
    title: "Safe Environment",
    description:
      "Join a workplace focused on safety, inclusion, and employee well-being.",
    icon: ShieldCheck,
  },
];

export const positions: Position[] = [
  {
    id: 1,
    title: "Early Childhood Educator",
    location: "Calgary, AB",
    employmentType: "Full-time",
    department: "Childcare",
    description:
      "Help create a safe, engaging, and supportive learning environment for young children.",
  },
  {
    id: 2,
    title: "Childcare Assistant",
    location: "Edmonton, AB",
    employmentType: "Part-time",
    department: "Childcare",
    description:
      "Support educators with daily classroom activities, routines, and child supervision.",
  },
  {
    id: 3,
    title: "Centre Supervisor",
    location: "Calgary, AB",
    employmentType: "Full-time",
    department: "Operations",
    description:
      "Lead daily centre operations while supporting staff, children, and families.",
  },
];

export const hiringSteps: HiringStep[] = [
  {
    number: "01",
    title: "Submit your application",
    description:
      "Review an available position and send us your resume and application.",
  },
  {
    number: "02",
    title: "Meet our team",
    description:
      "Selected applicants will be invited to a friendly introductory interview.",
  },
  {
    number: "03",
    title: "Join the team",
    description:
      "Successful candidates will receive an offer and begin the onboarding process.",
  },
];