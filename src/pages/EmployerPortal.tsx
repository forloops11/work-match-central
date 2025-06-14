
import { useState, useEffect } from "react";
import { FileText, Users, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import JobPostingForm from "../components/JobPostingForm";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  applications: number;
  status: "Open" | "Closed";
  datePosted: string;
  description?: string;
  requirements?: string;
  skills?: string[];
  jobType?: string;
}

interface CompanyProfile {
  companyName: string;
  website: string;
  description: string;
}

export default function EmployerPortal() {
  const [tab, setTab] = useState<"jobs" | "profile">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: "ACME Corp.",
    website: "https://acme.com",
    description: "A leading tech solutions provider."
  });
  const { toast } = useToast();

  // Load jobs and company profile from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('employerJobs');
    const savedProfile = localStorage.getItem('companyProfile');
    
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Initialize with sample data
      const initialJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "ACME Corp.",
          location: "Remote",
          salary: "$100k - $130k",
          applications: 12,
          status: "Open" as const,
          datePosted: "2024-01-15",
          description: "We are looking for a senior frontend developer...",
          requirements: "5+ years React experience",
          skills: ["React", "TypeScript", "CSS"],
          jobType: "Full-time"
        },
        {
          id: 2,
          title: "Data Scientist",
          company: "ACME Corp.",
          location: "New York",
          salary: "$120k - $150k",
          applications: 6,
          status: "Closed" as const,
          datePosted: "2024-01-10",
          description: "Join our data science team...",
          requirements: "PhD in relevant field",
          skills: ["Python", "Machine Learning", "SQL"],
          jobType: "Full-time"
        }
      ];
      setJobs(initialJobs);
      localStorage.setItem('employerJobs', JSON.stringify(initialJobs));
    }
    
    if (savedProfile) {
      setCompanyProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleJobPosted = (job: Job) => {
    let updatedJobs;
    if (editingJob) {
      updatedJobs = jobs.map(j => j.id === job.id ? job : j);
    } else {
      updatedJobs = [...jobs, job];
    }
    
    setJobs(updatedJobs);
    localStorage.setItem('employerJobs', JSON.stringify(updatedJobs));
    setEditingJob(null);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobFormOpen(true);
  };

  const handleDeleteJob = (jobId: number) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      localStorage.setItem('employerJobs', JSON.stringify(updatedJobs));
      toast({
        title: "Job Deleted",
        description: "Job posting has been removed successfully.",
      });
    }
  };

  const toggleJobStatus = (jobId: number) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === "Open" ? "Closed" as const : "Open" as const }
        : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('employerJobs', JSON.stringify(updatedJobs));
    toast({
      title: "Status Updated",
      description: "Job status has been updated successfully.",
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
    toast({
      title: "Profile Saved",
      description: "Company profile has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen py-12 px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-1">Employer Portal</h2>
        <div className="flex gap-4 mt-4">
          <button
            className={`px-5 py-2 rounded-t font-semibold transition border-b-2 ${
              tab === "jobs"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("jobs")}
          >
            My Job Openings
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold transition border-b-2 ${
              tab === "profile"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("profile")}
          >
            Company Profile
          </button>
        </div>
        <div className="bg-white p-6 rounded-b-lg shadow border border-blue-100">
          {tab === "jobs" ? (
            <MyJobOpenings 
              jobs={jobs}
              onPostJob={() => setIsJobFormOpen(true)}
              onEditJob={handleEditJob}
              onDeleteJob={handleDeleteJob}
              onToggleStatus={toggleJobStatus}
            />
          ) : (
            <CompanyProfile 
              profile={companyProfile}
              setProfile={setCompanyProfile}
              onSubmit={handleProfileSubmit}
            />
          )}
        </div>
      </div>

      <JobPostingForm
        isOpen={isJobFormOpen}
        onClose={() => {
          setIsJobFormOpen(false);
          setEditingJob(null);
        }}
        onJobPosted={handleJobPosted}
        editingJob={editingJob}
      />
    </div>
  );
}

function MyJobOpenings({ 
  jobs, 
  onPostJob, 
  onEditJob, 
  onDeleteJob, 
  onToggleStatus 
}: {
  jobs: Job[];
  onPostJob: () => void;
  onEditJob: (job: Job) => void;
  onDeleteJob: (id: number) => void;
  onToggleStatus: (id: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileText /> Posted Jobs ({jobs.length})
        </h3>
        <Button onClick={onPostJob}>
          + Post New Job
        </Button>
      </div>
      
      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs posted yet. Click "Post New Job" to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mt-2 table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Title</th>
                <th className="pb-2">Location</th>
                <th className="pb-2">Applications</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Posted</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-blue-50 hover:bg-blue-50">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.salary}</div>
                    </div>
                  </td>
                  <td className="py-3">{job.location}</td>
                  <td className="py-3">
                    <a href="/employer/applications" className="text-blue-600 hover:underline">
                      {job.applications} applications
                    </a>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => onToggleStatus(job.id)}
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {job.status}
                    </button>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{job.datePosted}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEditJob(job)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onDeleteJob(job.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CompanyProfile({ 
  profile, 
  setProfile, 
  onSubmit 
}: {
  profile: CompanyProfile;
  setProfile: (profile: CompanyProfile) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form className="max-w-lg space-y-4" onSubmit={onSubmit}>
      <h3 className="text-lg font-bold mb-2">Manage Company Profile</h3>
      <div>
        <Label htmlFor="companyName" className="font-semibold mb-1 block">Company Name</Label>
        <Input
          id="companyName"
          required
          type="text"
          value={profile.companyName}
          onChange={(e) => setProfile({...profile, companyName: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="website" className="font-semibold mb-1 block">Website</Label>
        <Input
          id="website"
          required
          type="url"
          value={profile.website}
          onChange={(e) => setProfile({...profile, website: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="description" className="font-semibold mb-1 block">About Company</Label>
        <Textarea
          id="description"
          rows={4}
          value={profile.description}
          onChange={(e) => setProfile({...profile, description: e.target.value})}
        />
      </div>
      <Button type="submit" className="mt-3">
        Save Changes
      </Button>
    </form>
  );
}
