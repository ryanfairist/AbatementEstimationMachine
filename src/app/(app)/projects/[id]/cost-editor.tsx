"use client";

import { useState, useMemo } from "react";
import type { CostItem } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COST_CATEGORIES } from "@/lib/constants";
import { PlusCircle, Trash2, Save, Loader2 } from "lucide-react";

interface CostEditorProps {
  initialCostItems: CostItem[];
  saveCostItems: (costItems: CostItem[]) => Promise<void>;
}

export default function CostEditor({ initialCostItems, saveCostItems }: CostEditorProps) {
  const [costItems, setCostItems] = useState<CostItem[]>(initialCostItems);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddItem = () => {
    setCostItems([
      ...costItems,
      {
        id: crypto.randomUUID(),
        description: "",
        category: "materials",
        quantity: 1,
        unitCost: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setCostItems(costItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof Omit<CostItem, "id">,
    value: string | number
  ) => {
    setCostItems(
      costItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = useMemo(() => {
    return costItems.reduce(
      (acc, item) => acc + item.quantity * item.unitCost,
      0
    );
  }, [costItems]);
  
  const taxRate = 0.06625; // NJ Sales Tax
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  
  const handleSave = async () => {
    setIsSaving(true);
    await saveCostItems(costItems);
    setIsSaving(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detailed Cost Estimate</CardTitle>
        <CardDescription>
          Input materials, labor, and other expenses for this project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Description</TableHead>
                <TableHead className="w-[20%]">Category</TableHead>
                <TableHead className="w-[15%] text-right">Quantity</TableHead>
                <TableHead className="w-[15%] text-right">Unit Cost</TableHead>
                <TableHead className="w-[15%] text-right">Total</TableHead>
                <TableHead className="w-[5%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      placeholder="e.g. Type X Drywall"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={item.category}
                      onValueChange={(value) =>
                        handleItemChange(item.id, "category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(COST_CATEGORIES).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <value.icon className="h-4 w-4 text-muted-foreground" />
                              {value.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(item.id, "quantity", Number(e.target.value))
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.unitCost}
                      onChange={(e) =>
                        handleItemChange(item.id, "unitCost", Number(e.target.value))
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${(item.quantity * item.unitCost).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className="text-right">Subtotal</TableCell>
                    <TableCell className="text-right font-bold">${subtotal.toFixed(2)}</TableCell>
                    <TableCell />
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-right">Tax ({(taxRate * 100).toFixed(3)}%)</TableCell>
                    <TableCell className="text-right font-bold">${taxAmount.toFixed(2)}</TableCell>
                    <TableCell />
                </TableRow>
                <TableRow className="text-lg">
                    <TableCell colSpan={4} className="text-right font-bold">Total Estimate</TableCell>
                    <TableCell className="text-right font-extrabold text-primary">${total.toFixed(2)}</TableCell>
                    <TableCell />
                </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={handleAddItem}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Save className="mr-2 h-4 w-4" />
            )}
            Save Estimate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
