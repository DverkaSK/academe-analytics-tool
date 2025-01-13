import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { StudentTransferDialog } from "@/components/StudentTransferDialog";
import { StudentRecordCard } from "@/components/StudentRecordCard";
import { fetchStudents } from "@/services/api";
import { Student } from "@/types/api";

export default function Students() {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  
  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const groups = Array.from(new Set(students.map(student => student.group)));

  if (isLoading) {
    return <div className="container py-6">Загрузка...</div>;
  }

  if (error) {
    return <div className="container py-6">Ошибка загрузки данных</div>;
  }

  const filteredStudents = selectedGroup
    ? students.filter((student) => student.group === selectedGroup)
    : students;

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
                {filteredStudents.map((student) => (
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
              {students.filter((s) => s.hasDebts).length}
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
              {students.filter((s) => s.scholarship > 0).length}
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
              {students.filter((s) => s.retakeCount >= 3).length}
            </p>
            <p className="text-muted-foreground">студентов под угрозой отчисления</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}