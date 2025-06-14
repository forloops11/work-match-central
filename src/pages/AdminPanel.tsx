
import { useState, useEffect } from "react";
import { Users, Briefcase, FileText, Check, X, Calendar, Settings, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import UserDetailsModal from "../components/UserDetailsModal";
import AnalyticsCharts from "../components/AnalyticsCharts";
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
          {tab === "users" && <UserManagement users={users} onViewUser={handleViewUser} onDeleteUser={handleDeleteUser} />}
          {tab === "jobs" && <JobManagement jobs={jobs} onJobAction={handleJobAction} />}
          {tab === "companies" && <CompanyManagement companies={companies} onCompanyAction={handleCompanyAction} />}
          {tab === "analytics" && <AnalyticsPanel analytics={analytics} />}
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

function UserManagement({ users, onViewUser, onDeleteUser }: { users: User[], onViewUser: (user: User) => void, onDeleteUser: (id: number) => void }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><Users /> Manage Users ({users.length})</h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name/Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.type === "Employer" ? "default" : "secondary"}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewUser(user)}
                      >
                        <Eye size={14} />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function JobManagement({ jobs, onJobAction }: { jobs: Job[], onJobAction: (id: number, status: "Approved" | "Rejected") => void }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><Briefcase /> Manage Job Posts ({jobs.length})</h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.applicantCount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      job.status === "Approved" ? "default" : 
                      job.status === "Rejected" ? "destructive" : "secondary"
                    }>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.datePosted).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {job.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => onJobAction(job.id, "Approved")}
                        >
                          <Check size={14} />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => onJobAction(job.id, "Rejected")}
                        >
                          <X size={14} />
                          Reject
                        </Button>
                      </div>
                    )}
                    {job.status !== "Pending" && (
                      <Badge variant="outline">{job.status}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function CompanyManagement({ companies, onCompanyAction }: { companies: Company[], onCompanyAction: (id: number, status: "Approved" | "Rejected") => void }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><FileText /> Company Registrations ({companies.length})</h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.contactEmail}</TableCell>
                  <TableCell>{company.employeeCount || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={
                      company.status === "Approved" ? "default" : 
                      company.status === "Rejected" ? "destructive" : "secondary"
                    }>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(company.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {company.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => onCompanyAction(company.id, "Approved")}
                        >
                          <Check size={14} />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => onCompanyAction(company.id, "Rejected")}
                        >
                          <X size={14} />
                          Reject
                        </Button>
                      </div>
                    )}
                    {company.status !== "Pending" && (
                      <Badge variant="outline">{company.status}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsPanel({ analytics }: { analytics: any }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 flex gap-2 items-center"><Settings /> Site Analytics</h3>
      <AnalyticsCharts analytics={analytics} />
    </div>
  );
}
