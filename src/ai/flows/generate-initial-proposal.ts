// use server'
'use server';

/**
 * @fileOverview Generates an initial draft proposal based on project details.
 *
 * - generateInitialProposal - A function that generates the initial draft proposal.
 * - GenerateInitialProposalInput - The input type for the generateInitialProposal function.
 * - GenerateInitialProposalOutput - The return type for the generateInitialProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialProposalInputSchema = z.object({
  client: z.string().describe('The name of the client.'),
  address: z.string().describe('The address of the project.'),
  scopeOfWork: z.string().describe('The scope of work for the project.'),
  squareFootage: z.number().describe('The square footage of the project.'),
  njStateLawStandards: z
    .string()
    .describe('The New Jersey State Law standards for abatement.'),
});
export type GenerateInitialProposalInput = z.infer<
  typeof GenerateInitialProposalInputSchema
>;

const GenerateInitialProposalOutputSchema = z.object({
  proposalDraft: z.string().describe('The initial draft proposal.'),
});
export type GenerateInitialProposalOutput = z.infer<
  typeof GenerateInitialProposalOutputSchema
>;

export async function generateInitialProposal(
  input: GenerateInitialProposalInput
): Promise<GenerateInitialProposalOutput> {
  return generateInitialProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialProposalPrompt',
  input: {schema: GenerateInitialProposalInputSchema},
  output: {schema: GenerateInitialProposalOutputSchema},
  prompt: `You are an expert in creating initial draft proposals for abatement projects in New Jersey, following New Jersey State Law standards.

  Based on the following project details, generate an initial draft proposal:

  Client: {{{client}}}
  Address: {{{address}}}
  Scope of Work: {{{scopeOfWork}}}
  Square Footage: {{{squareFootage}}} sq ft
  NJ State Law Standards: {{{njStateLawStandards}}}

  Include estimated abatement costs based on the square footage and scope of work, adhering to the provided New Jersey State Law standards.
  The proposal should include sections for project overview, cost estimates, terms, and a signature section.
  Make sure to provide a detailed, but concise proposal draft.`,
});

const generateInitialProposalFlow = ai.defineFlow(
  {
    name: 'generateInitialProposalFlow',
    inputSchema: GenerateInitialProposalInputSchema,
    outputSchema: GenerateInitialProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
