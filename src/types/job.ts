
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  role: string;
  salaryRange: string;
  bookmarked: boolean;
  experienceLevel: string;
  jobType: string;
  remoteOption: string;
  companySize: string;
  postedDate: Date;
}

export interface AdvancedFilters {
  experienceLevel: string;
  jobType: string;
  remoteOption: string;
  companySize: string;
  sortBy: string;
  skills: string[];
  salaryMin: string;
  salaryMax: string;
}

export interface ApplicationModalState {
  isOpen: boolean;
  jobId: string;
  jobTitle: string;
  company: string;
}
