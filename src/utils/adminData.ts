
export interface User {
  id: number;
  name: string;
  email: string;
  type: "Job Seeker" | "Employer";
  registrationDate: string;
  status: "Active" | "Suspended";
  lastLogin?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  status: "Pending" | "Approved" | "Rejected";
  datePosted: string;
  applicantCount: number;
  location: string;
  type: string;
}

export interface Company {
  id: number;
  name: string;
  status: "Pending" | "Approved" | "Rejected";
  registrationDate: string;
  contactEmail: string;
  employeeCount?: string;
}

export interface Analytics {
  totalUsers: number;
  totalJobs: number;
  totalCompanies: number;
  pendingApprovals: number;
  monthlyRegistrations: number[];
  jobApplications: number[];
}

export const getAdminData = () => {
  // Get real data from localStorage
  const employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
  const jobApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]');
  
  // Generate realistic users including employers and job seekers
  const users: User[] = [
    { id: 1, name: "Alice Johnson", email: "alice@email.com", type: "Job Seeker", registrationDate: "2024-01-15", status: "Active", lastLogin: "2024-01-20" },
    { id: 2, name: "Big Data LLC", email: "hr@bigdata.com", type: "Employer", registrationDate: "2024-01-10", status: "Active", lastLogin: "2024-01-19" },
    { id: 3, name: "Sarah Mitchell", email: "sarah.m@email.com", type: "Job Seeker", registrationDate: "2024-01-18", status: "Active" },
    { id: 4, name: "TechCorp Inc", email: "contact@techcorp.com", type: "Employer", registrationDate: "2024-01-12", status: "Suspended" },
    { id: 5, name: "John Smith", email: "john.smith@email.com", type: "Job Seeker", registrationDate: "2024-01-16", status: "Active" },
  ];

  // Transform employer jobs to admin format
  const jobs: Job[] = employerJobs.map((job: any, index: number) => ({
    id: job.id || index + 1,
    title: job.title || job.jobTitle || "Unknown Position",
    company: job.company || "Unknown Company",
    status: job.status || (Math.random() > 0.5 ? "Approved" : "Pending"),
    datePosted: job.datePosted || "2024-01-" + (10 + index).toString().padStart(2, '0'),
    applicantCount: jobApplicants.filter((app: any) => app.jobId === job.id).length,
    location: job.location || "Remote",
    type: job.type || "Full-time"
  }));

  // Add some default jobs if none exist
  if (jobs.length === 0) {
    jobs.push(
      { id: 1, title: "Senior Frontend Developer", company: "TechStart", status: "Approved", datePosted: "2024-01-15", applicantCount: 12, location: "Remote", type: "Full-time" },
      { id: 2, title: "Data Scientist", company: "AI Corp", status: "Pending", datePosted: "2024-01-18", applicantCount: 8, location: "New York", type: "Full-time" },
      { id: 3, title: "Product Manager", company: "GrowthHub", status: "Approved", datePosted: "2024-01-20", applicantCount: 15, location: "San Francisco", type: "Full-time" }
    );
  }

  const companies: Company[] = [
    { id: 1, name: "TechStart Inc", status: "Approved", registrationDate: "2024-01-10", contactEmail: "hr@techstart.com", employeeCount: "50-100" },
    { id: 2, name: "AI Corp", status: "Pending", registrationDate: "2024-01-18", contactEmail: "contact@aicorp.com", employeeCount: "100-500" },
    { id: 3, name: "GrowthHub", status: "Approved", registrationDate: "2024-01-12", contactEmail: "jobs@growthhub.com", employeeCount: "10-50" },
    { id: 4, name: "NetHub Labs", status: "Pending", registrationDate: "2024-01-16", contactEmail: "info@nethub.com", employeeCount: "500+" },
  ];

  return { users, jobs, companies, applicants: jobApplicants };
};

export const getAnalytics = (): Analytics => {
  const { users, jobs, companies } = getAdminData();
  
  return {
    totalUsers: users.length,
    totalJobs: jobs.length,
    totalCompanies: companies.length,
    pendingApprovals: jobs.filter(j => j.status === "Pending").length + companies.filter(c => c.status === "Pending").length,
    monthlyRegistrations: [45, 52, 48, 61, 55, 67], // Mock monthly data
    jobApplications: [120, 135, 148, 162, 158, 171] // Mock application data
  };
};

export const updateJobStatus = (jobId: number, status: "Approved" | "Rejected") => {
  const employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
  const updatedJobs = employerJobs.map((job: any) => 
    job.id === jobId ? { ...job, status } : job
  );
  localStorage.setItem('employerJobs', JSON.stringify(updatedJobs));
};

export const updateCompanyStatus = (companyId: number, status: "Approved" | "Rejected") => {
  // In a real app, this would update the company status in the database
  console.log(`Company ${companyId} status updated to ${status}`);
};

export const deleteUser = (userId: number) => {
  // In a real app, this would delete the user from the database
  console.log(`User ${userId} deleted`);
};
