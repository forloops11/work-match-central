
import { useState, useEffect } from "react";
import { Search, Filter, Users, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ApplicantCard from "../components/ApplicantCard";

interface Applicant {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  jobId: number;
  applicationDate: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  resume: string;
  coverLetter: string;
  experience: string;
}

const generateMockApplicants = (): Applicant[] => [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    jobTitle: "Senior Frontend Developer",
    jobId: 1,
    applicationDate: "2024-01-20",
    status: "Pending",
    resume: "Experienced React developer with 6+ years in frontend development. Previously worked at tech startups and large corporations. Strong background in TypeScript, Redux, and modern CSS frameworks.",
    coverLetter: "I am excited to apply for the Senior Frontend Developer position. My experience in building scalable React applications aligns perfectly with your requirements...",
    experience: "6+ years"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    jobTitle: "Senior Frontend Developer",
    jobId: 1,
    applicationDate: "2024-01-19",
    status: "Reviewed",
    resume: "Full-stack developer with strong frontend focus. Expert in React, Vue.js, and Angular. Led multiple high-impact projects and mentored junior developers.",
    coverLetter: "Your company's commitment to innovation in frontend development caught my attention. I believe my experience in leading frontend teams would be valuable...",
    experience: "8+ years"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    jobTitle: "Data Scientist",
    jobId: 2,
    applicationDate: "2024-01-18",
    status: "Accepted",
    resume: "PhD in Computer Science with specialization in Machine Learning. Published researcher with experience in predictive modeling, data analysis, and statistical computing.",
    coverLetter: "I am passionate about leveraging data science to solve complex business problems. My research background and industry experience make me well-suited for this role...",
    experience: "4+ years"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    jobTitle: "Senior Frontend Developer",
    jobId: 1,
    applicationDate: "2024-01-17",
    status: "Rejected",
    resume: "Frontend developer with focus on user experience and performance optimization. Experience with React, JavaScript, and modern build tools.",
    coverLetter: "I am interested in joining your team to create exceptional user experiences. My attention to detail and passion for clean code would contribute to your projects...",
    experience: "4+ years"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.w@email.com",
    jobTitle: "Data Scientist",
    jobId: 2,
    applicationDate: "2024-01-16",
    status: "Pending",
    resume: "Data scientist with expertise in Python, R, and machine learning frameworks. Experience in healthcare analytics and predictive modeling for business intelligence.",
    coverLetter: "Your data science team's work on predictive analytics aligns with my career goals. I am excited about the opportunity to contribute to data-driven decision making...",
    experience: "5+ years"
  },
  {
    id: 6,
    name: "James Wilson",
    email: "j.wilson@email.com",
    jobTitle: "Senior Frontend Developer",
    jobId: 1,
    applicationDate: "2024-01-15",
    status: "Pending",
    resume: "Senior developer with expertise in React ecosystem, including Next.js, Redux, and modern testing frameworks. Strong advocate for accessibility and performance.",
    coverLetter: "I am impressed by your company's focus on creating inclusive and performant web applications. My experience in accessibility-first development would be valuable...",
    experience: "7+ years"
  }
];

export default function Applicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [jobFilter, setJobFilter] = useState<string>("All");
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    // Load applicants from localStorage or use mock data
    const savedApplicants = localStorage.getItem('jobApplicants');
    const savedJobs = localStorage.getItem('employerJobs');
    
    if (savedApplicants) {
      setApplicants(JSON.parse(savedApplicants));
    } else {
      const mockApplicants = generateMockApplicants();
      setApplicants(mockApplicants);
      localStorage.setItem('jobApplicants', JSON.stringify(mockApplicants));
    }

    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  useEffect(() => {
    let filtered = applicants;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter(applicant => applicant.status === statusFilter);
    }

    // Filter by job
    if (jobFilter !== "All") {
      filtered = filtered.filter(applicant => applicant.jobTitle === jobFilter);
    }

    setFilteredApplicants(filtered);
  }, [applicants, searchTerm, statusFilter, jobFilter]);

  const handleStatusUpdate = (applicantId: number, status: string) => {
    const updatedApplicants = applicants.map(applicant =>
      applicant.id === applicantId
        ? { ...applicant, status: status as any }
        : applicant
    );
    
    setApplicants(updatedApplicants);
    localStorage.setItem('jobApplicants', JSON.stringify(updatedApplicants));
  };

  const uniqueJobTitles = [...new Set(applicants.map(a => a.jobTitle))];
  const statusCounts = {
    All: applicants.length,
    Pending: applicants.filter(a => a.status === "Pending").length,
    Reviewed: applicants.filter(a => a.status === "Reviewed").length,
    Accepted: applicants.filter(a => a.status === "Accepted").length,
    Rejected: applicants.filter(a => a.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen py-10 px-8 bg-gradient-to-b from-blue-100 via-white to-blue-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-blue-700" size={32} />
          <div>
            <h2 className="text-3xl font-bold">Job Applicants</h2>
            <p className="text-blue-600">Manage and review candidate applications</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="bg-white rounded-lg p-4 shadow border border-blue-100">
              <div className="text-2xl font-bold text-blue-900">{count}</div>
              <div className="text-sm text-blue-600">{status}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search Applicants</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Filter by Job</label>
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="All">All Jobs</option>
                {uniqueJobTitles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg p-6 shadow border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} />
              Applications ({filteredApplicants.length})
            </h3>
          </div>

          {filteredApplicants.length === 0 ? (
            <div className="text-center py-8">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                {applicants.length === 0 
                  ? "No applications received yet." 
                  : "No applicants match your current filters."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  applicant={applicant}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
