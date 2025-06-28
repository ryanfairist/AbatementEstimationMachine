import type { Project, CostItem } from "./types";
import type { GenerateInitialProposalInput } from "@/ai/flows/generate-initial-proposal";

let projects: Project[] = [
  {
    id: "proj_1",
    client: "Oakwood High School",
    address: "456 Oak Avenue, Maplewood, NJ 07040",
    scopeOfWork: "Asbestos floor tile removal in school gymnasium.",
    squareFootage: 5000,
    njStateLawStandards: "Standard NJ Abatement Protocols including containment, negative air, and proper disposal.",
    proposalDraft: `PROPOSAL FOR ABATEMENT SERVICES

**Client:** Oakwood High School
**Address:** 456 Oak Avenue, Maplewood, NJ 07040
**Project:** Gymnasium Asbestos Floor Tile Removal

**1. Project Overview**
This proposal outlines the scope of work and estimated costs for the safe removal and disposal of asbestos-containing vinyl floor tiles and associated mastic from the gymnasium at Oakwood High School, covering an area of approximately 5,000 sq ft. All work will be performed in strict compliance with New Jersey State Law standards for asbestos abatement.

**2. Scope of Work**
- Establishment of a regulated work area with critical barriers and negative air pressure containment.
- Wet-method removal of all 12"x12" vinyl asbestos tiles and mastic.
- HEPA vacuuming and cleaning of the substrate post-removal.
- Proper packaging and labeling of all asbestos-containing waste material.
- Transportation and disposal of hazardous materials at a licensed facility.
- Final visual inspection and air clearance testing.

**3. Cost Estimate**
- **Labor:** $12,500.00 (Based on a crew of 4 for 5 days)
- **Materials & Equipment:** $3,500.00 (Includes poly sheeting, filters, surfactants, etc.)
- **Disposal Fees:** $4,000.00
- **Air Monitoring & Testing:** $1,500.00
**Estimated Subtotal:** $21,500.00
**NJ Sales Tax (6.625%):** $1,424.38
**ESTIMATED TOTAL:** $22,924.38

**4. Terms**
- This estimate is valid for 30 days.
- Payment: 50% upon acceptance, 50% upon completion and successful clearance testing.

**5. Acceptance**

_________________________      _________________________
Client Signature / Date        Company Signature / Date
`,
    costItems: [
        { id: "1", description: "Asbestos Removal Technician", category: "labor", quantity: 200, unitCost: 62.50 },
        { id: "2", description: "6 mil Poly Sheeting", category: "materials", quantity: 10, unitCost: 150 },
        { id: "3", description: "Waste Disposal", category: "disposal", quantity: 1, unitCost: 4000 },
    ],
  },
  {
    id: "proj_2",
    client: "Downtown Commercial Properties",
    address: "789 Main Street, Suite 200, Newark, NJ 07102",
    scopeOfWork: "Removal of asbestos-containing insulation from pipes in boiler room.",
    squareFootage: 800,
    njStateLawStandards: "N.J.A.C. 5:23-8, Asbestos Hazard Abatement Subcode.",
    proposalDraft: `PROPOSAL DRAFT

**Client:** Downtown Commercial Properties
**Address:** 789 Main Street, Suite 200, Newark, NJ 07102
**Project:** Boiler Room Pipe Insulation Abatement

**Overview:**
This proposal is for the abatement of asbestos-containing pipe insulation in the boiler room of the property at 789 Main Street. The project area is approximately 800 sq ft. All procedures will adhere to N.J.A.C. 5:23-8 standards.

**Estimated Cost:** Based on the 800 sq ft scope, the estimated cost for labor, materials, and disposal is approximately **$8,000 - $11,000**. A detailed breakdown will be provided after a site visit.
`,
    costItems: [],
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProjects(): Promise<Project[]> {
  await delay(500);
  return projects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  await delay(500);
  return projects.find(p => p.id === id);
}

export async function createProject(data: GenerateInitialProposalInput, proposalDraft: string): Promise<string> {
    await delay(1000);
    const newProject: Project = {
        id: `proj_${Date.now()}`,
        ...data,
        proposalDraft,
        costItems: [],
    };
    projects.unshift(newProject);
    return newProject.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | undefined> {
    await delay(500);
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) return undefined;

    projects[projectIndex] = { ...projects[projectIndex], ...data };
    return projects[projectIndex];
}
