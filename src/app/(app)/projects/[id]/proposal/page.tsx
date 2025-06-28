import { getProject } from "@/lib/store";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Printer } from "lucide-react";
import { Logo } from "@/components/logo";
import { COST_CATEGORIES } from "@/lib/constants";
import PrintButton from "./print-button";
import { format } from 'date-fns';


export default async function ProposalPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  const subtotal = project.costItems.reduce(
    (acc, item) => acc + item.quantity * item.unitCost,
    0
  );
  const taxRate = 0.06625;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  const today = format(new Date(), 'MMMM d, yyyy');

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg printable-area">
        <header className="p-8 md:p-12 flex justify-between items-start border-b">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-2">Abatement & Remediation Services</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-primary font-headline">PROPOSAL</h1>
            <p className="text-muted-foreground mt-1">Date: {today}</p>
            <p className="text-muted-foreground">Proposal ID: {project.id.slice(0, 8).toUpperCase()}</p>
          </div>
        </header>

        <section className="p-8 md:p-12 grid grid-cols-2 gap-8">
            <div>
                <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Prepared for</h2>
                <p className="font-bold">{project.client}</p>
                <p className="text-muted-foreground">{project.address}</p>
            </div>
            <div className="text-right">
                <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Project</h2>
                <p className="font-bold">Abatement Services</p>
                <p className="text-muted-foreground">{project.scopeOfWork.substring(0, 50)}...</p>
            </div>
        </section>

        <section className="p-8 md:p-12">
            <h2 className="text-xl font-bold font-headline mb-4">AI Generated Project Overview & Scope</h2>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap font-sans">
                {project.proposalDraft}
            </div>
        </section>

        <section className="p-8 md:p-12">
            <h2 className="text-xl font-bold font-headline mb-4">Cost Breakdown</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit Cost</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {project.costItems.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.description}</TableCell>
                            <TableCell>{COST_CATEGORIES[item.category].label}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">${item.unitCost.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${(item.quantity * item.unitCost).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="text-right">Subtotal</TableCell>
                        <TableCell className="text-right font-bold">${subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="text-right">NJ Sales Tax ({(taxRate * 100).toFixed(3)}%)</TableCell>
                        <TableCell className="text-right font-bold">${taxAmount.toFixed(2)}</TableCell>
                    </TableRow>
                     <TableRow className="text-lg bg-muted/50">
                        <TableCell colSpan={4} className="text-right font-bold">Total Project Cost</TableCell>
                        <TableCell className="text-right font-extrabold text-primary">${total.toFixed(2)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </section>
        
        <section className="p-8 md:p-12">
            <h2 className="text-xl font-bold font-headline mb-4">Terms and Conditions</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-2">
                <p>1. This proposal is valid for 30 days from the date of issue.</p>
                <p>2. Payment Terms: 50% deposit upon acceptance, 50% upon completion of work.</p>
                <p>3. Any changes to the scope of work will be subject to a change order and may incur additional costs.</p>
                <p>4. Client is responsible for providing access to the property during the agreed-upon work hours.</p>
            </div>
        </section>

        <section className="p-8 md:p-12 mt-8 border-t">
            <h2 className="text-xl font-bold font-headline mb-8">Acceptance of Proposal</h2>
            <div className="grid grid-cols-2 gap-16">
                <div>
                    <div className="w-full h-12 border-b mt-12"></div>
                    <p className="mt-2 text-sm font-semibold">Client Signature</p>
                </div>
                 <div>
                    <div className="w-full h-12 border-b mt-12"></div>
                    <p className="mt-2 text-sm font-semibold">Date</p>
                </div>
            </div>
        </section>
      </div>
      <div className="mt-8 no-print w-full max-w-4xl flex justify-end">
        <PrintButton />
      </div>
    </div>
  );
}
