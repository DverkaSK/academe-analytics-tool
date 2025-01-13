import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSubjects } from "@/services/api";

export default function Curriculum() {
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const { data: subjects = [], isLoading, error } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });

  if (isLoading) {
    return <div className="container py-6">Загрузка...</div>;
  }

  if (error) {
    return <div className="container py-6">Ошибка загрузки данных</div>;
  }

  const filteredSubjects = subjects.filter((subject) => {
    if (selectedSemester && subject.semester !== parseInt(selectedSemester)) {
      return false;
    }
    return true;
  });

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Учебный план</h1>
        <div className="flex gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите семестр" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                <SelectItem key={semester} value={semester.toString()}>
                  {semester} семестр
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите год" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Дисциплины</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название предмета</TableHead>
                <TableHead>Семестр</TableHead>
                <TableHead>Количество часов</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.semester}</TableCell>
                  <TableCell>{subject.hoursCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Статистика успеваемости</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Здесь будет отображаться статистика успеваемости по выбранному семестру
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Контроль</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Здесь будет отображаться информация о формах контроля и преподавателях
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}