
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

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
    
    filterJobs(updatedJobs, search, location, role, salary);
  }, [bookmarkedJobs]);

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

    filterJobs(jobsWithBookmarks, keywordParam, locationParam, roleParam, salaryParam);
  }, [searchParams, bookmarkedJobs]);

  const filterJobs = (jobs: typeof dummyJobs, searchTerm: string, locationTerm: string, roleTerm: string, salaryTerm: string) => {
    const filtered = jobs.filter(job => {
      const matchesKeyword = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !locationTerm || 
        job.location.toLowerCase().includes(locationTerm.toLowerCase());
      
      const matchesRole = !roleTerm || job.role === roleTerm;
      
      const matchesSalary = !salaryTerm || job.salaryRange === salaryTerm;
      
      return matchesKeyword && matchesLocation && matchesRole && matchesSalary;
    });
    
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

  const handleApply = (jobId: number, jobTitle: string) => {
    alert(`Application submitted for: ${jobTitle}`);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setRole("");
    setSalary("");
    navigate('/jobs', { replace: true });
  };

  return (
    <div className="min-h-screen py-12 px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 mt-1">Find Jobs</h2>
            <p className="text-blue-800/80">Search and filter jobs by your preference</p>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear Filters
          </button>
        </div>
        
        <form className="flex flex-wrap gap-2 mb-8" onSubmit={handleSearch}>
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
            className="inline-flex items-center rounded-r-lg px-5 py-3 bg-blue-800 text-white font-bold shadow hover:bg-blue-700"
          >
            <Search className="mr-2" />
            Search
          </button>
        </form>

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
                className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow px-6 py-5 border border-blue-100 group animate-fade-in"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-blue-900">{job.title}</span>
                    <span className="inline-flex text-xs bg-blue-100 text-blue-800 px-2 py-1 ml-2 rounded">{job.company}</span>
                    <span className="inline-flex text-xs bg-blue-50 text-blue-700 px-2 py-1 ml-2 rounded"><b>{job.location}</b></span>
                  </div>
                  <div className="flex gap-2 flex-wrap text-xs mb-1">
                    {job.skills.map(skill => (
                      <span className="px-2 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200" key={skill}>{skill}</span>
                    ))}
                  </div>
                  <div className="font-medium text-blue-800/90">{job.salary}</div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button 
                    onClick={() => handleApply(job.id, job.title)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow transition"
                  >
                    Apply
                  </button>
                  <button 
                    onClick={() => handleBookmark(job.id)}
                    className="px-4 py-2 rounded bg-white border border-blue-400 text-blue-700 font-medium hover:bg-blue-100 transition flex items-center gap-2"
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
