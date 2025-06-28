export type CostCategory =
  | "labor"
  | "materials"
  | "equipment"
  | "disposal"
  | "subcontractor"
  | "other";

export interface CostItem {
  id: string;
  description: string;
  category: CostCategory;
  quantity: number;
  unitCost: number;
}

export interface Project {
  id: string;
  client: string;
  address: string;
  scopeOfWork: string;
  squareFootage: number;
  njStateLawStandards: string;
  proposalDraft: string;
  costItems: CostItem[];
}
