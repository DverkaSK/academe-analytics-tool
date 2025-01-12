import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  BookOpen, 
  Building2, 
  GraduationCap, 
  ClipboardList, 
  Info 
} from "lucide-react";

const navItems = [
  { path: "/students", label: "студенты", icon: Users },
  { path: "/curriculum", label: "учебный план", icon: BookOpen },
  { path: "/departments", label: "кафедры", icon: Building2 },
  { path: "/teachers", label: "преподаватели", icon: GraduationCap },
  { path: "/gradebook", label: "ведомость", icon: ClipboardList },
  { path: "/info", label: "информация", icon: Info },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && <span className="nav-slash mr-6">/</span>}
          <Link
            to={item.path}
            className={cn(
              "nav-link",
              location.pathname === item.path && "active"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}