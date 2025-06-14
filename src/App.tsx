
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSidebar from "./components/MainSidebar";
import Index from "./pages/Index";
import FindJobs from "./pages/FindJobs";
import Register from "./pages/Register";
import EmployerPortal from "./pages/EmployerPortal";
import AdminPanel from "./pages/AdminPanel";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex w-full bg-background">
    <MainSidebar />
    <main className="flex-1 min-h-screen">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          {/* Add future routes above */}
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
