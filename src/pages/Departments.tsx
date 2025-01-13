import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDepartments } from "@/services/api";

export default function Departments() {
  const { data: departments = [], isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  });

  if (isLoading) {
    return <div className="container py-6">Загрузка...</div>;
  }

  if (error) {
    return <div className="container py-6">Ошибка загрузки данных</div>;
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Кафедры</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((department) => (
          <Card key={department.id}>
            <CardHeader>
              <CardTitle>{department.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Заведующий:</span> {department.head}</p>
                <p className="text-muted-foreground">{department.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}