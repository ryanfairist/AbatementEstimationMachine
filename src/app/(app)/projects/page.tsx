import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/store";
import { PlusCircle, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const calculateTotalEstimate = (project: Project) => {
    return project.costItems.reduce(
      (total, item) => total + item.quantity * item.unitCost,
      0
    );
  };
  
  return (
    <div className="p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Projects</h1>
          <p className="text-muted-foreground">
            Manage all your abatement projects and estimates.
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <PlusCircle />
            New Project
          </Link>
        </Button>
      </header>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>A list of all your projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Address</TableHead>
                  <TableHead className="text-right">Square Footage</TableHead>
                  <TableHead className="text-right">Estimate Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.client}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-sm">{project.address}</TableCell>
                    <TableCell className="text-right">{project.squareFootage.toLocaleString()} sq ft</TableCell>
                    <TableCell className="text-right">
                       {`$${calculateTotalEstimate(project).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/projects/${project.id}`}>
                           <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
