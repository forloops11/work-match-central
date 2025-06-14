
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import UserDetailsModal from "../components/UserDetailsModal";
import UserManagement from "../components/admin/UserManagement";
import JobManagement from "../components/admin/JobManagement";
import CompanyManagement from "../components/admin/CompanyManagement";
import AnalyticsPanel from "../components/admin/AnalyticsPanel";
import { getAdminData, getAnalytics, updateJobStatus, updateCompanyStatus, deleteUser, User, Job, Company } from "@/utils/adminData";

export default function AdminPanel() {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(getAnalytics());
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getAdminData();
    setUsers(data.users);
    setJobs(data.jobs);
    setCompanies(data.companies);
    setAnalytics(getAnalytics());
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      });
    }
  };

  const handleJobAction = (jobId: number, status: "Approved" | "Rejected") => {
    updateJobStatus(jobId, status);
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status } : job
    ));
    toast({
      title: "Job Updated",
      description: `Job has been ${status.toLowerCase()}.`,
    });
  };

  const handleCompanyAction = (companyId: number, status: "Approved" | "Rejected") => {
    updateCompanyStatus(companyId, status);
    setCompanies(companies.map(company => 
      company.id === companyId ? { ...company, status } : company
    ));
    toast({
      title: "Company Updated",
      description: `Company has been ${status.toLowerCase()}.`,
    });
  };

  return (
    <div className="min-h-screen py-10 px-8 bg-gradient-to-b from-blue-100 via-white to-blue-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
        <div className="flex gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "users"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("users")}
          >
            Users
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "jobs"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("jobs")}
          >
            Job Posts
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "companies"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("companies")}
          >
            Company Registrations
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "analytics"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("analytics")}
          >
            Site Analytics
          </button>
        </div>
        <div className="bg-white rounded-b-lg shadow p-6 border border-blue-100">
          {tab === "users" && (
            <UserManagement 
              users={users} 
              onViewUser={handleViewUser} 
              onDeleteUser={handleDeleteUser} 
            />
          )}
          {tab === "jobs" && (
            <JobManagement 
              jobs={jobs} 
              onJobAction={handleJobAction} 
            />
          )}
          {tab === "companies" && (
            <CompanyManagement 
              companies={companies} 
              onCompanyAction={handleCompanyAction} 
            />
          )}
          {tab === "analytics" && (
            <AnalyticsPanel analytics={analytics} />
          )}
        </div>
      </div>
      
      <UserDetailsModal 
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
}
