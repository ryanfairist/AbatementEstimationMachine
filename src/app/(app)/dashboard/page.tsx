import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getProjects } from '@/lib/store';
import { PlusCircle, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';

export default async function DashboardPage() {
  const projects = await getProjects();
  const recentProjects = projects.slice(0, 5);

  const calculateTotalEstimate = (project: Project) => {
    return project.costItems.reduce(
      (total, item) => total + item.quantity * item.unitCost,
      0
    );
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's a summary of your projects.
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <PlusCircle />
            New Project
          </Link>
        </Button>
      </header>
      <main className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Here are your most recently created projects.
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/projects">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Address</TableHead>
                  <TableHead className="text-right">Estimate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="font-medium">{project.client}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground truncate max-w-xs">{project.address}</TableCell>
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
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Projects</span>
                <span className="font-bold text-2xl">{projects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Proposals Generated</span>
                <span className="font-bold text-2xl">
                  {projects.filter((p) => p.proposalDraft).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
