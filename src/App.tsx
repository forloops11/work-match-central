
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainSidebar from "./components/MainSidebar";
import MobileSidebar from "./components/MobileSidebar";
import Index from "./pages/Index";
import FindJobs from "./pages/FindJobs";
import Register from "./pages/Register";
import EmployerPortal from "./pages/EmployerPortal";
import AdminPanel from "./pages/AdminPanel";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";
import Applicants from "./pages/Applicants";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex w-full bg-background">
    {/* Desktop Sidebar */}
    <div className="hidden md:block">
      <MainSidebar />
    </div>
    
    {/* Mobile Header */}
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-2 flex items-center justify-between">
      <MobileSidebar />
      <span className="text-lg font-semibold">QuickHire</span>
      <div className="w-8" /> {/* Spacer for centering */}
    </div>
    
    <main className="flex-1 min-h-screen md:pt-0 pt-14">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout><Index /></Layout>} path="/" />
            <Route element={<Layout><FindJobs /></Layout>} path="/jobs" />
            <Route element={<Layout><Register /></Layout>} path="/register" />
            <Route element={<Layout><EmployerPortal /></Layout>} path="/employer" />
            <Route element={<Layout><Bookmarks /></Layout>} path="/bookmarks" />
            <Route element={<Layout><AdminPanel /></Layout>} path="/admin" />
            <Route element={<Layout><Applicants /></Layout>} path="/employer/applications" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
