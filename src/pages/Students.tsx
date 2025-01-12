import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { StudentTransferDialog } from "@/components/StudentTransferDialog";
import { StudentRecordCard } from "@/components/StudentRecordCard";

interface Student {
  id: number;
  fullName: string;
  group: string;
  course: number;
  averageGrade: number;
  retakeCount: number;
  scholarship: number;
  hasDebts: boolean;
}

const mockStudents: Student[] = [
  {
    id: 1,
    fullName: "Иванов Иван Иванович",
    group: "ПИ-20-1",
    course: 3,
    averageGrade: 4.5,
    retakeCount: 0,
    scholarship: 50,
    hasDebts: false,
  },
  {
    id: 2,
    fullName: "Петров Петр Петрович",
    group: "ПИ-20-2",
    course: 3,
    averageGrade: 5.0,
    retakeCount: 0,
    scholarship: 100,
    hasDebts: false,
  },
  {
    id: 3,
    fullName: "Сидоров Сидор Сидорович",
    group: "ПИ-20-1",
    course: 3,
    averageGrade: 3.8,
    retakeCount: 2,
    scholarship: 0,
    hasDebts: true,
  },
];

const groups = ["ПИ-20-1", "ПИ-20-2", "ПИ-21-1", "ПИ-21-2"];

export default function Students() {
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Студенты</h1>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите группу" />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список студентов</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Группа</TableHead>
                  <TableHead>Курс</TableHead>
                  <TableHead>Средний балл</TableHead>
                  <TableHead>Стипендия (%)</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents
                  .filter((student) => !selectedGroup || student.group === selectedGroup)
                  .map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.fullName}</TableCell>
                      <TableCell>{student.group}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.averageGrade}</TableCell>
                      <TableCell>{student.scholarship}%</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <StudentTransferDialog
                            studentName={student.fullName}
                            currentGroup={student.group}
                          />
                          <StudentRecordCard student={student} />
                          {student.hasDebts && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Должники</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {mockStudents.filter((s) => s.hasDebts).length}
            </p>
            <p className="text-muted-foreground">студентов имеют задолженности</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Стипендиаты</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {mockStudents.filter((s) => s.scholarship > 0).length}
            </p>
            <p className="text-muted-foreground">студентов получают стипендию</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>К отчислению</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {mockStudents.filter((s) => s.retakeCount >= 3).length}
            </p>
            <p className="text-muted-foreground">студентов под угрозой отчисления</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}