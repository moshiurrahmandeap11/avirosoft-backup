import AviroPulseLogo from "../../public/Aviro Pulse.svg";
import AviroHRLogo from "../../public/Aviro HR.svg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  logo: any;
  shortDescription: string;
  fullDescription: string;
  features: { title: string; description: string }[];
  benefits: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aviro Pulse",
    slug: "aviro-pulse",
    logo: AviroPulseLogo,
    shortDescription: "Smart attendance tracking with biometric and GPS verification.",
    fullDescription:
      "Aviro Pulse is an advanced attendance management system that automates workforce tracking. It combines biometric authentication, GPS-based check-ins, and real-time analytics to eliminate manual processes and ensure accurate payroll calculations.",
    features: [
      {
        title: "Biometric Attendance",
        description: "Fingerprint and facial recognition for secure check-ins.",
      },
      {
        title: "GPS Tracking",
        description: "Verify employee location during remote or field work.",
      },
      {
        title: "Real-time Reports",
        description: "Instant dashboards showing attendance and overtime data.",
      },
      {
        title: "Shift Management",
        description: "Create and manage rotating shifts with automated scheduling.",
      },
      {
        title: "Leave Requests",
        description: "Employees can apply for leave and managers approve digitally.",
      },
      {
        title: "Payroll Integration",
        description: "Sync attendance data directly with payroll systems.",
      },
    ],
    benefits: [
      "Eliminate buddy punching and time theft",
      "Reduce manual attendance processing by 80%",
      "Accurate payroll with automated hour calculations",
      "Improve compliance with labor regulations",
      "Boost employee accountability and punctuality",
    ],
  },
  {
    id: "2",
    name: "Aviro HR",
    slug: "aviro-hr",
    logo: AviroHRLogo,
    shortDescription: "Complete HR management from hiring to payroll processing.",
    fullDescription:
      "Aviro HR is a comprehensive human resource management platform that streamlines recruitment, onboarding, performance tracking, and payroll. It provides a centralized database for employee records and automates repetitive HR tasks.",
    features: [
      {
        title: "Recruitment Portal",
        description: "Post jobs, track applicants, and manage interviews in one place.",
      },
      {
        title: "Employee Database",
        description: "Centralized storage for all employee records and documents.",
      },
      {
        title: "Performance Reviews",
        description: "Set goals, conduct appraisals, and track employee growth.",
      },
      {
        title: "Payroll Automation",
        description: "Calculate salaries, deductions, and generate payslips automatically.",
      },
      {
        title: "Document Management",
        description: "Store and manage contracts, policies, and compliance documents.",
      },
      {
        title: "Analytics Dashboard",
        description: "HR metrics and insights for data-driven decision making.",
      },
    ],
    benefits: [
      "Reduce HR administrative workload by 70%",
      "Faster hiring with streamlined recruitment pipeline",
      "Accurate payroll with zero manual errors",
      "Better employee engagement through transparent reviews",
      "Full compliance with labor laws and regulations",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
