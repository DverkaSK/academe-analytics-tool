import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchTeachers } from "@/services/api";

export default function Teachers() {
  const { data: teachers = [], isLoading, error } = useQuery({
    queryKey: ['teachers'],
    queryFn: fetchTeachers,
  });

  if (isLoading) {
    return <div className="container py-6">Загрузка...</div>;
  }

  if (error) {
    return <div className="container py-6">Ошибка загрузки данных</div>;
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Преподаватели</h1>
      <Card>
        <CardHeader>
          <CardTitle>Список преподавателей</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Кафедра</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Предметы</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.fullName}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{teacher.position}</TableCell>
                  <TableCell>{teacher.subjects.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}