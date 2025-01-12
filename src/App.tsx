import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import Students from "./pages/Students";
import Curriculum from "./pages/Curriculum";
import Departments from "./pages/Departments";
import Teachers from "./pages/Teachers";
import Gradebook from "./pages/Gradebook";
import Info from "./pages/Info";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Students />} />
              <Route path="/students" element={<Students />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/gradebook" element={<Gradebook />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;