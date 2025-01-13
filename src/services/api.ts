import { Student, Subject, Department, Teacher, GradeRecord } from "@/types/api";

const API_BASE_URL = "https://api.example.com"; // Здесь будет реальный URL API

export const fetchStudents = async (): Promise<Student[]> => {
  // Имитация API запроса
  return [
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
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  return [
    { id: 1, name: "Математический анализ", semester: 1, hoursCount: 144 },
    { id: 2, name: "Программирование", semester: 1, hoursCount: 180 },
    { id: 3, name: "Физика", semester: 2, hoursCount: 144 },
  ];
};

export const fetchDepartments = async (): Promise<Department[]> => {
  return [
    {
      id: 1,
      name: "Кафедра информационных технологий",
      head: "Иванов И.И.",
      description: "Подготовка специалистов в области IT",
    },
    {
      id: 2,
      name: "Кафедра математики",
      head: "Петров П.П.",
      description: "Фундаментальная математическая подготовка",
    },
  ];
};

export const fetchTeachers = async (): Promise<Teacher[]> => {
  return [
    {
      id: 1,
      fullName: "Иванов Иван Иванович",
      department: "Кафедра информационных технологий",
      position: "Профессор",
      subjects: ["Программирование", "Базы данных"],
    },
    {
      id: 2,
      fullName: "Петрова Мария Ивановна",
      department: "Кафедра математики",
      position: "Доцент",
      subjects: ["Математический анализ"],
    },
  ];
};

export const fetchGradeRecords = async (): Promise<GradeRecord[]> => {
  return [
    {
      id: 1,
      studentId: 1,
      subjectId: 1,
      grade: 5,
      date: "2024-01-15",
      teacherId: 2,
    },
    {
      id: 2,
      studentId: 1,
      subjectId: 2,
      grade: 4,
      date: "2024-01-20",
      teacherId: 1,
    },
  ];
};