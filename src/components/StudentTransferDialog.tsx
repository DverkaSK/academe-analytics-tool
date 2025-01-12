import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StudentTransferDialogProps {
  studentName: string;
  currentGroup: string;
}

export function StudentTransferDialog({ studentName, currentGroup }: StudentTransferDialogProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const groups = ["ПИ-20-1", "ПИ-20-2", "ПИ-21-1", "ПИ-21-2"];

  const handleTransfer = () => {
    if (!selectedGroup) {
      toast.error("Выберите группу для перевода");
      return;
    }
    
    // Here we'll add the actual transfer logic later
    toast.success(`Студент ${studentName} переведен из группы ${currentGroup} в группу ${selectedGroup}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Перевод в другую группу">
          <UserCog className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Перевод студента в другую группу</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Студент: {studentName}</p>
            <p className="text-sm text-muted-foreground">Текущая группа: {currentGroup}</p>
          </div>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите новую группу" />
            </SelectTrigger>
            <SelectContent>
              {groups
                .filter((group) => group !== currentGroup)
                .map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button onClick={handleTransfer}>Перевести</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}