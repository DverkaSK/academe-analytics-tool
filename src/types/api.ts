export interface Student {
  id: number;
  fullName: string;
  group: string;
  course: number;
  averageGrade: number;
  retakeCount: number;
  scholarship: number;
  hasDebts: boolean;
}

export interface Subject {
  id: number;
  name: string;
  semester: number;
  hoursCount: number;
}

export interface Department {
  id: number;
  name: string;
  head: string;
  description: string;
}

export interface Teacher {
  id: number;
  fullName: string;
  department: string;
  position: string;
  subjects: string[];
}

export interface GradeRecord {
  id: number;
  studentId: number;
  subjectId: number;
  grade: number;
  date: string;
  teacherId: number;
}