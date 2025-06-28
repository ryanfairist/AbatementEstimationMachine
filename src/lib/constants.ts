import { Wrench, Package, Truck, Trash2, User, HardHat } from "lucide-react";
import type { CostCategory } from "./types";

export const COST_CATEGORIES: Record<
  CostCategory,
  { label: string; icon: React.ElementType }
> = {
  labor: { label: "Labor", icon: Wrench },
  materials: { label: "Materials", icon: Package },
  equipment: { label: "Equipment", icon: Truck },
  disposal: { label: "Disposal", icon: Trash2 },
  subcontractor: { label: "Subcontractor", icon: User },
  other: { label: "Other", icon: HardHat },
};
