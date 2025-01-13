import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchGradeRecords, fetchStudents, fetchSubjects, fetchTeachers } from "@/services/api";

export default function Gradebook() {
  const { data: gradeRecords = [] } = useQuery({
    queryKey: ['gradeRecords'],
    queryFn: fetchGradeRecords,
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const { data: subjects = [] } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ['teachers'],
    queryFn: fetchTeachers,
  });

  const enrichedGradeRecords = gradeRecords.map(record => ({
    ...record,
    studentName: students.find(s => s.id === record.studentId)?.fullName || 'Неизвестный студент',
    subjectName: subjects.find(s => s.id === record.subjectId)?.name || 'Неизвестный предмет',
    teacherName: teachers.find(t => t.id === record.teacherId)?.fullName || 'Неизвестный преподаватель',
  }));

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Ведомость</h1>
      <Card>
        <CardHeader>
          <CardTitle>Оценки</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Студент</TableHead>
                <TableHead>Предмет</TableHead>
                <TableHead>Оценка</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Преподаватель</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrichedGradeRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>{record.subjectName}</TableCell>
                  <TableCell>{record.grade}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.teacherName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}