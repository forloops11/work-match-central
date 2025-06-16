
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Job, AdvancedFilters } from "@/types/job";

const dummyJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    salary: "$100k - $130k",
    skills: ["React", "TypeScript", "UI/UX"],
    role: "Engineer",
    salaryRange: "$100k+",
    bookmarked: false,
    experienceLevel: "mid",
    jobType: "full-time",
    remoteOption: "remote",
    companySize: "medium",
    postedDate: new Date('2024-06-10'),
  },
  {
    id: 2,
    title: "Backend API Developer",
    company: "NetHub Labs",
    location: "San Francisco",
    salary: "$120k - $150k",
    skills: ["Node.js", "API", "SQL"],
    role: "Engineer",
    salaryRange: "$100k+",
    bookmarked: true,
    experienceLevel: "senior",
    jobType: "full-time",
    remoteOption: "onsite",
    companySize: "startup",
    postedDate: new Date('2024-06-12'),
  },
  {
    id: 3,
    title: "Product Manager",
    company: "BizGrowth",
    location: "New York",
    salary: "$95k - $115k",
    skills: ["Agile", "Leadership", "Communication"],
    role: "Manager",
    salaryRange: "$50k+",
    bookmarked: false,
    experienceLevel: "mid",
    jobType: "full-time",
    remoteOption: "hybrid",
    companySize: "large",
    postedDate: new Date('2024-06-08'),
  },
  {
    id: 4,
    title: "Senior Full Stack Engineer",
    company: "StartupCo",
    location: "Austin",
    salary: "$140k - $170k",
    skills: ["React", "Node.js", "AWS"],
    role: "Engineer",
    salaryRange: "$100k+",
    bookmarked: false,
    experienceLevel: "senior",
    jobType: "full-time",
    remoteOption: "remote",
    companySize: "startup",
    postedDate: new Date('2024-06-13'),
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Design Studio",
    location: "Los Angeles",
    salary: "$80k - $100k",
    skills: ["Figma", "Prototyping", "User Research"],
    role: "Product",
    salaryRange: "$50k+",
    bookmarked: false,
    experienceLevel: "mid",
    jobType: "contract",
    remoteOption: "hybrid",
    companySize: "small",
    postedDate: new Date('2024-06-11'),
  },
  {
    id: 6,
    title: "Engineering Manager",
    company: "TechGiant",
    location: "Seattle",
    salary: "$180k - $220k",
    skills: ["Leadership", "Architecture", "Mentoring"],
    role: "Manager",
    salaryRange: "$150k+",
    bookmarked: false,
    experienceLevel: "lead",
    jobType: "full-time",
    remoteOption: "onsite",
    companySize: "large",
    postedDate: new Date('2024-06-09'),
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudFirst",
    location: "Denver",
    salary: "$110k - $140k",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    role: "Engineer",
    salaryRange: "$100k+",
    bookmarked: false,
    experienceLevel: "mid",
    jobType: "full-time",
    remoteOption: "remote",
    companySize: "medium",
    postedDate: new Date('2024-06-07'),
  },
  {
    id: 8,
    title: "Data Scientist",
    company: "AI Corp",
    location: "Boston",
    salary: "$125k - $155k",
    skills: ["Python", "Machine Learning", "Statistics"],
    role: "Engineer",
    salaryRange: "$100k+",
    bookmarked: false,
    experienceLevel: "senior",
    jobType: "full-time",
    remoteOption: "hybrid",
    companySize: "medium",
    postedDate: new Date('2024-06-06'),
  },
];

export function useJobFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(dummyJobs);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    experienceLevel: '',
    jobType: '',
    remoteOption: '',
    companySize: '',
    sortBy: 'relevance',
    skills: [],
    salaryMin: '',
    salaryMax: '',
  });

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedJobs');
    if (savedBookmarks) {
      setBookmarkedJobs(JSON.parse(savedBookmarks));
    }
  }, []);

  // Update jobs with bookmark status whenever bookmarkedJobs changes
  useEffect(() => {
    const updatedJobs = dummyJobs.map(job => ({
      ...job,
      bookmarked: bookmarkedJobs.includes(job.id)
    }));
    
    filterJobs(updatedJobs, search, location, role, salary, advancedFilters);
  }, [bookmarkedJobs, advancedFilters]);

  useEffect(() => {
    // Get search parameters from URL
    const keywordParam = searchParams.get('keyword') || '';
    const locationParam = searchParams.get('location') || '';
    const roleParam = searchParams.get('role') || '';
    const salaryParam = searchParams.get('salary') || '';
    
    setSearch(keywordParam);
    setLocation(locationParam);
    setRole(roleParam);
    setSalary(salaryParam);

    // Apply initial bookmarks to jobs
    const jobsWithBookmarks = dummyJobs.map(job => ({
      ...job,
      bookmarked: bookmarkedJobs.includes(job.id)
    }));

    filterJobs(jobsWithBookmarks, keywordParam, locationParam, roleParam, salaryParam, advancedFilters);
  }, [searchParams, bookmarkedJobs]);

  const filterJobs = (jobs: Job[], searchTerm: string, locationTerm: string, roleTerm: string, salaryTerm: string, filters: AdvancedFilters) => {
    let filtered = jobs.filter(job => {
      const matchesKeyword = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !locationTerm || 
        job.location.toLowerCase().includes(locationTerm.toLowerCase());
      
      const matchesRole = !roleTerm || job.role === roleTerm;
      const matchesSalary = !salaryTerm || job.salaryRange === salaryTerm;
      
      // Advanced filters
      const matchesExperience = !filters.experienceLevel || job.experienceLevel === filters.experienceLevel;
      const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
      const matchesRemote = !filters.remoteOption || job.remoteOption === filters.remoteOption;
      const matchesCompanySize = !filters.companySize || job.companySize === filters.companySize;
      
      const matchesSkills = filters.skills.length === 0 || 
        filters.skills.some(skill => job.skills.includes(skill));
      
      const matchesSalaryRange = (!filters.salaryMin && !filters.salaryMax) ||
        (filters.salaryMin && parseInt(job.salary.replace(/[^\d]/g, '').slice(0, 3)) >= parseInt(filters.salaryMin.replace(/[^\d]/g, ''))) ||
        (filters.salaryMax && parseInt(job.salary.replace(/[^\d]/g, '').slice(-3)) <= parseInt(filters.salaryMax.replace(/[^\d]/g, '')));
      
      return matchesKeyword && matchesLocation && matchesRole && matchesSalary && 
             matchesExperience && matchesJobType && matchesRemote && matchesCompanySize && 
             matchesSkills && matchesSalaryRange;
    });

    // Apply sorting
    if (filters.sortBy === 'date') {
      filtered.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
    } else if (filters.sortBy === 'salary-high') {
      filtered.sort((a, b) => parseInt(b.salary.replace(/[^\d]/g, '').slice(0, 3)) - parseInt(a.salary.replace(/[^\d]/g, '').slice(0, 3)));
    } else if (filters.sortBy === 'salary-low') {
      filtered.sort((a, b) => parseInt(a.salary.replace(/[^\d]/g, '').slice(0, 3)) - parseInt(b.salary.replace(/[^\d]/g, '').slice(0, 3)));
    } else if (filters.sortBy === 'company') {
      filtered.sort((a, b) => a.company.localeCompare(b.company));
    }
    
    setFilteredJobs(filtered);
  };

  const updateURLParams = (newSearch: string, newLocation: string, newRole: string, newSalary: string) => {
    const params = new URLSearchParams();
    if (newSearch.trim()) params.set('keyword', newSearch.trim());
    if (newLocation.trim()) params.set('location', newLocation.trim());
    if (newRole) params.set('role', newRole);
    if (newSalary) params.set('salary', newSalary);
    
    navigate(`/jobs?${params.toString()}`, { replace: true });
  };

  const handleBookmark = (jobId: number) => {
    const newBookmarks = bookmarkedJobs.includes(jobId)
      ? bookmarkedJobs.filter(id => id !== jobId)
      : [...bookmarkedJobs, jobId];
    
    setBookmarkedJobs(newBookmarks);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(newBookmarks));
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setRole("");
    setSalary("");
    setAdvancedFilters({
      experienceLevel: '',
      jobType: '',
      remoteOption: '',
      companySize: '',
      sortBy: 'relevance',
      skills: [],
      salaryMin: '',
      salaryMax: '',
    });
    navigate('/jobs', { replace: true });
  };

  const applyAdvancedFilters = () => {
    const jobsWithBookmarks = dummyJobs.map(job => ({
      ...job,
      bookmarked: bookmarkedJobs.includes(job.id)
    }));
    filterJobs(jobsWithBookmarks, search, location, role, salary, advancedFilters);
  };

  return {
    search,
    location,
    role,
    salary,
    filteredJobs,
    advancedFilters,
    setSearch,
    setLocation,
    setRole,
    setSalary,
    setAdvancedFilters,
    updateURLParams,
    handleBookmark,
    clearFilters,
    applyAdvancedFilters,
  };
}
