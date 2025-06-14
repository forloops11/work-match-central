
import { useState, useEffect } from "react";

const allJobs = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    salary: "$100k - $130k",
    skills: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: 2,
    title: "Backend API Developer",
    company: "NetHub Labs",
    location: "San Francisco",
    salary: "$120k - $150k",
    skills: ["Node.js", "API", "SQL"],
  },
  {
    id: 3,
    title: "Product Manager",
    company: "BizGrowth",
    location: "New York",
    salary: "$95k - $115k",
    skills: ["Agile", "Leadership", "Communication"],
  },
  {
    id: 4,
    title: "Senior Full Stack Engineer",
    company: "StartupCo",
    location: "Austin",
    salary: "$140k - $170k",
    skills: ["React", "Node.js", "AWS"],
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Design Studio",
    location: "Los Angeles",
    salary: "$80k - $100k",
    skills: ["Figma", "Prototyping", "User Research"],
  },
  {
    id: 6,
    title: "Engineering Manager",
    company: "TechGiant",
    location: "Seattle",
    salary: "$180k - $220k",
    skills: ["Leadership", "Architecture", "Mentoring"],
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudFirst",
    location: "Denver",
    salary: "$110k - $140k",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 8,
    title: "Data Scientist",
    company: "AI Corp",
    location: "Boston",
    salary: "$125k - $155k",
    skills: ["Python", "Machine Learning", "Statistics"],
  },
];

export default function Bookmarks() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<typeof allJobs>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedJobs');
    if (savedBookmarks) {
      const bookmarkedIds = JSON.parse(savedBookmarks);
      const bookmarked = allJobs.filter(job => bookmarkedIds.includes(job.id));
      setBookmarkedJobs(bookmarked);
    }
  }, []);

  const handleRemove = (jobId: number) => {
    const savedBookmarks = localStorage.getItem('bookmarkedJobs');
    if (savedBookmarks) {
      const bookmarkedIds = JSON.parse(savedBookmarks);
      const updatedIds = bookmarkedIds.filter((id: number) => id !== jobId);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedIds));
      
      const updatedJobs = bookmarkedJobs.filter(job => job.id !== jobId);
      setBookmarkedJobs(updatedJobs);
    }
  };

  const handleApply = (jobId: number, jobTitle: string) => {
    alert(`Application submitted for: ${jobTitle}`);
  };

  return (
    <div className="min-h-screen py-10 px-8 bg-gradient-to-b from-blue-100 via-white to-blue-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Saved Jobs</h2>
        
        {bookmarkedJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-blue-600">No saved jobs yet. Visit the Find Jobs page to bookmark jobs!</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookmarkedJobs.map((job) => (
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
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button 
                    onClick={() => handleApply(job.id, job.title)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow transition"
                  >
                    Apply
                  </button>
                  <button 
                    onClick={() => handleRemove(job.id)}
                    className="px-3 py-2 rounded border border-red-200 text-red-600 hover:bg-red-100 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
