import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StudentRecordCardProps {
  student: {
    id: number;
    fullName: string;
    group: string;
    course: number;
    averageGrade: number;
    scholarship: number;
    hasDebts: boolean;
  };
}

export function StudentRecordCard({ student }: StudentRecordCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Учетная карточка">
          <FileText className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Учетная карточка студента</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">ФИО</p>
                  <p className="text-sm text-muted-foreground">{student.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Группа</p>
                  <p className="text-sm text-muted-foreground">{student.group}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Курс</p>
                  <p className="text-sm text-muted-foreground">{student.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Средний балл</p>
                  <p className="text-sm text-muted-foreground">{student.averageGrade}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Стипендия</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Текущий размер: {student.scholarship}%</p>
              <p className="text-sm text-muted-foreground">
                {student.scholarship === 100
                  ? "Повышенная стипендия"
                  : student.scholarship === 50
                  ? "Базовая стипендия"
                  : student.scholarship === 25
                  ? "Минимальная стипендия"
                  : "Не получает стипендию"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статус обучения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Статус:{" "}
                  <span
                    className={`font-medium ${
                      student.hasDebts ? "text-destructive" : "text-green-500"
                    }`}
                  >
                    {student.hasDebts ? "Есть задолженности" : "Нет задолженностей"}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}