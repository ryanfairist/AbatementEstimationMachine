import { ProjectForm } from "./form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Create New Project</h1>
        <p className="text-muted-foreground">
          Fill in the details below to start a new project estimate.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <ProjectForm />
        </div>
        <aside className="space-y-6">
            <Card className="bg-accent/20 border-accent/50">
                <CardHeader className="flex-row items-start gap-4">
                    <Sparkles className="w-8 h-8 text-accent shrink-0 mt-1" />
                    <div>
                        <CardTitle className="text-accent-foreground/90">AI-Powered Proposals</CardTitle>
                        <CardDescription className="text-accent-foreground/70">
                        Our GenAI tool will create an initial proposal draft based on the project details you provide.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-accent-foreground/80">
                        The draft will include estimated costs based on square footage and scope, adhering to New Jersey State Law standards. You can refine this draft later.
                    </p>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
