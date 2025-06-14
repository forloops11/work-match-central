import { useState, useEffect } from "react";
import { Search, Filter, BookmarkPlus } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/ApplicationModal";
import AdvancedSearchFilters from "@/components/AdvancedSearchFilters";
import SavedSearchesModal from "@/components/SavedSearchesModal";

const dummyJobs = [
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

export default function FindJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(dummyJobs);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    experienceLevel: '',
    jobType: '',
    remoteOption: '',
    companySize: '',
    sortBy: 'relevance',
    skills: [] as string[],
    salaryMin: '',
    salaryMax: '',
  });
  
  const [applicationModal, setApplicationModal] = useState<{
    isOpen: boolean;
    jobId: number;
    jobTitle: string;
    company: string;
  }>({
    isOpen: false,
    jobId: 0,
    jobTitle: "",
    company: "",
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

  const filterJobs = (jobs: typeof dummyJobs, searchTerm: string, locationTerm: string, roleTerm: string, salaryTerm: string, filters: typeof advancedFilters) => {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURLParams(search, location, role, salary);
  };

  const handleBookmark = (jobId: number) => {
    const newBookmarks = bookmarkedJobs.includes(jobId)
      ? bookmarkedJobs.filter(id => id !== jobId)
      : [...bookmarkedJobs, jobId];
    
    setBookmarkedJobs(newBookmarks);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(newBookmarks));
  };

  const handleApply = (jobId: number, jobTitle: string, company: string) => {
    setApplicationModal({
      isOpen: true,
      jobId,
      jobTitle,
      company,
    });
  };

  const closeApplicationModal = () => {
    setApplicationModal({
      isOpen: false,
      jobId: 0,
      jobTitle: "",
      company: "",
    });
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

  const handleSavedSearchApply = (savedSearch: any) => {
    setSearch(savedSearch.keyword);
    setLocation(savedSearch.location);
    setRole(savedSearch.role);
    setSalary(savedSearch.salary);
    updateURLParams(savedSearch.keyword, savedSearch.location, savedSearch.role, savedSearch.salary);
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 mt-1">Find Jobs</h2>
            <p className="text-blue-800/80">Search and filter jobs by your preference</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSavedSearches(true)}
              className="flex items-center gap-2"
            >
              <BookmarkPlus className="h-4 w-4" />
              Saved Searches
            </Button>
            <Button
              onClick={clearFilters}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        <form className="flex flex-wrap gap-2 mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            className="px-4 py-3 rounded-l-lg border border-blue-200 min-w-[140px] placeholder:text-blue-400"
            placeholder="Keyword/title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-3 border-t border-b border-blue-200 min-w-[120px] placeholder:text-blue-400"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <select 
            className="px-3 py-3 border-t border-b border-blue-200 text-blue-800"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="">Role</option>
            <option value="Engineer">Engineer</option>
            <option value="Manager">Manager</option>
            <option value="Product">Product</option>
          </select>
          <select 
            className="px-3 py-3 border-t border-b border-blue-200 text-blue-800"
            value={salary}
            onChange={e => setSalary(e.target.value)}
          >
            <option value="">Salary</option>
            <option value="$50k+">$50k+</option>
            <option value="$100k+">$100k+</option>
            <option value="$150k+">$150k+</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-3 bg-blue-800 text-white font-bold shadow hover:bg-blue-700"
          >
            <Search className="mr-2" />
            Search
          </button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Advanced
          </Button>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Advanced Filters Sidebar */}
          {showAdvancedFilters && (
            <div className="lg:col-span-1">
              <AdvancedSearchFilters
                filters={advancedFilters}
                onFiltersChange={setAdvancedFilters}
                onApplyFilters={applyAdvancedFilters}
                onClearFilters={() => setAdvancedFilters({
                  experienceLevel: '',
                  jobType: '',
                  remoteOption: '',
                  companySize: '',
                  sortBy: 'relevance',
                  skills: [],
                  salaryMin: '',
                  salaryMax: '',
                })}
              />
            </div>
          )}

          {/* Jobs List */}
          <div className={`${showAdvancedFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="mb-4 text-blue-600">
              Found {filteredJobs.length} jobs
            </div>

            <div className="grid gap-6">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-blue-600">No jobs found matching your search criteria.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-lg shadow px-6 py-5 border border-blue-100 group animate-fade-in"
                  >
                    <div className="flex-1 min-w-0 mb-4 md:mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-blue-900">{job.title}</span>
                        <span className="inline-flex text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.company}</span>
                        <span className="inline-flex text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"><b>{job.location}</b></span>
                      </div>
                      <div className="flex gap-2 flex-wrap text-xs mb-2">
                        {job.skills.map(skill => (
                          <span className="px-2 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200" key={skill}>{skill}</span>
                        ))}
                      </div>
                      <div className="font-medium text-blue-800/90">{job.salary}</div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => handleApply(job.id, job.title, job.company)}
                        className="flex-1 md:flex-none px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow transition"
                      >
                        Apply
                      </button>
                      <button 
                        onClick={() => handleBookmark(job.id)}
                        className="flex-1 md:flex-none px-4 py-2 rounded bg-white border border-blue-400 text-blue-700 font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2"
                      >
                        <span>{job.bookmarked ? "Bookmarked" : "Save"}</span>
                        <Bookmark filled={job.bookmarked} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={closeApplicationModal}
        jobId={applicationModal.jobId}
        jobTitle={applicationModal.jobTitle}
        company={applicationModal.company}
      />

      <SavedSearchesModal
        isOpen={showSavedSearches}
        onClose={() => setShowSavedSearches(false)}
        onApplySearch={handleSavedSearchApply}
      />
    </div>
  );
}

// Inline version of lucide-react Bookmark, as 'filled' is not native
function Bookmark({ filled = false }) {
  return filled ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2563eb" viewBox="0 0 24 24"><path d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2z"></path></svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-3-7 3V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2-2z"></path></svg>
  );
}
