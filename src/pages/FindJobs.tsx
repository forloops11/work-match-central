import { useState, useEffect } from "react";
import { Search, Filter, BookmarkPlus, Sparkles } from "lucide-react";
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
    jobId: string; // Changed from number to string
    jobTitle: string;
    company: string;
  }>({
    isOpen: false,
    jobId: "", // Changed from 0 to empty string
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
      jobId: jobId.toString(), // Convert number to string
      jobTitle,
      company,
    });
  };

  const closeApplicationModal = () => {
    setApplicationModal({
      isOpen: false,
      jobId: "", // Changed from 0 to empty string
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
    <div className="min-h-screen py-12 px-4 md:px-8 hero-gradient relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-4xl font-bold mb-2 gradient-text font-poppins">Find Your Dream Job</h2>
            <p className="text-white/80 text-lg">Discover opportunities that match your passion</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSavedSearches(true)}
              className="glass-button text-white border-white/30 hover:bg-white/20 flex items-center gap-2"
            >
              <BookmarkPlus className="h-4 w-4" />
              Saved Searches
            </Button>
            <Button
              onClick={clearFilters}
              className="btn-primary"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Enhanced Search Form */}
        <form className="glass-card p-6 rounded-2xl mb-8 animate-slide-up" onSubmit={handleSearch} style={{animationDelay: '0.1s'}}>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              className="professional-input flex-1 min-w-[200px] text-white placeholder-white/60"
              placeholder="Job title, keywords, or company"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <input
              type="text"
              className="professional-input min-w-[150px] text-white placeholder-white/60"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <select 
              className="professional-input text-white bg-white/10"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="" className="text-gray-800">All Roles</option>
              <option value="Engineer" className="text-gray-800">Engineer</option>
              <option value="Manager" className="text-gray-800">Manager</option>
              <option value="Product" className="text-gray-800">Product</option>
            </select>
            <select 
              className="professional-input text-white bg-white/10"
              value={salary}
              onChange={e => setSalary(e.target.value)}
            >
              <option value="" className="text-gray-800">Any Salary</option>
              <option value="$50k+" className="text-gray-800">$50k+</option>
              <option value="$100k+" className="text-gray-800">$100k+</option>
              <option value="$150k+" className="text-gray-800">$150k+</option>
            </select>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 px-6"
            >
              <Search className="h-5 w-5" />
              Search Jobs
            </button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="glass-button text-white border-white/30 hover:bg-white/20 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Advanced Filters Sidebar */}
          {showAdvancedFilters && (
            <div className="lg:col-span-1 animate-slide-left">
              <div className="glass-card p-6 rounded-2xl">
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
            </div>
          )}

          {/* Enhanced Jobs List */}
          <div className={`${showAdvancedFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="mb-6 glass-card p-4 rounded-xl">
              <p className="text-white font-medium text-lg">
                <span className="gradient-text font-bold">{filteredJobs.length}</span> opportunities found
              </p>
            </div>

            <div className="stagger-animation space-y-6">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16 glass-card rounded-2xl">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-white/80 text-xl">No jobs found matching your search criteria.</p>
                  <p className="text-white/60 mt-2">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="card-3d glass-card p-6 rounded-2xl group transition-all duration-500"
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white font-poppins group-hover:gradient-text transition-all duration-300">
                            {job.title}
                          </h3>
                          <span className="glass-button px-3 py-1 text-sm text-white/90 rounded-full border border-white/20">
                            {job.company}
                          </span>
                          <span className="glass-button px-3 py-1 text-sm text-white/90 rounded-full border border-white/20">
                            📍 {job.location}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap mb-3">
                          {job.skills.map(skill => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="text-lg font-semibold text-white/90 flex items-center gap-2">
                          <span className="text-green-300">💰</span>
                          {job.salary}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button 
                          onClick={() => handleApply(job.id, job.title, job.company)}
                          className="btn-primary flex-1 lg:flex-none"
                        >
                          Apply Now
                        </button>
                        <button 
                          onClick={() => handleBookmark(job.id)}
                          className="glass-button px-4 py-3 rounded-xl text-white border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
                        >
                          <span>{job.bookmarked ? "Saved ❤️" : "Save"}</span>
                          <Bookmark filled={job.bookmarked} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="floating-action flex items-center justify-center text-white animate-glow">
        <Filter className="h-6 w-6" />
      </button>

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

// Enhanced Bookmark component with 3D effect
function Bookmark({ filled = false }) {
  return filled ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110">
      <path d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2z"></path>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110">
      <path d="M19 21l-7-3-7 3V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2-2z"></path>
    </svg>
  );
}
