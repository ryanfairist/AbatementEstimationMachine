"use server";

import { generateInitialProposal } from "@/ai/flows/generate-initial-proposal";
import type { GenerateInitialProposalInput } from "@/ai/flows/generate-initial-proposal";
import { createProject } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function createProjectAndGenerateProposal(
  input: GenerateInitialProposalInput
): Promise<string> {
  try {
    const { proposalDraft } = await generateInitialProposal(input);
    const newProjectId = await createProject(input, proposalDraft);
    
    // Revalidate paths to show the new project in lists
    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return newProjectId;
  } catch (error) {
    console.error("Failed to create project and generate proposal:", error);
    throw new Error("An error occurred while creating the project.");
  }
}
