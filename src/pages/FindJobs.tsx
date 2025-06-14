
import { useState } from "react";
import { Search } from "lucide-react";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    salary: "$100k - $130k",
    skills: ["React", "TypeScript", "UI/UX"],
    bookmarked: false,
  },
  {
    id: 2,
    title: "Backend API Developer",
    company: "NetHub Labs",
    location: "San Francisco",
    salary: "$120k - $150k",
    skills: ["Node.js", "API", "SQL"],
    bookmarked: true,
  },
  {
    id: 3,
    title: "Product Manager",
    company: "BizGrowth",
    location: "New York",
    salary: "$95k - $115k",
    skills: ["Agile", "Leadership", "Communication"],
    bookmarked: false,
  },
];

export default function FindJobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div className="min-h-screen py-12 px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 mt-1">Find Jobs</h2>
        <p className="text-blue-800/80 mb-6">Search and filter jobs by your preference</p>
        <form
          className="flex flex-wrap gap-2 mb-8"
          onSubmit={e => e.preventDefault()}
        >
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
          <select className="px-3 py-3 border-t border-b border-blue-200 text-blue-800" defaultValue="">
            <option value="">Role</option>
            <option>Engineer</option>
            <option>Manager</option>
            <option>Product</option>
          </select>
          <select className="px-3 py-3 border-t border-b border-blue-200 text-blue-800" defaultValue="">
            <option value="">Salary</option>
            <option>$50k+</option>
            <option>$100k+</option>
            <option>$150k+</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center rounded-r-lg px-5 py-3 bg-blue-800 text-white font-bold shadow hover:bg-blue-700"
          >
            <Search className="mr-2" />
            Search
          </button>
        </form>
        <div className="grid gap-6">
          {dummyJobs.map((job) => (
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
                <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow transition">
                  Apply
                </button>
                <button className="px-4 py-2 rounded bg-white border border-blue-400 text-blue-700 font-medium hover:bg-blue-100 transition flex items-center gap-2">
                  <span>{job.bookmarked ? "Bookmarked" : "Save"}</span>
                  <Bookmark filled={job.bookmarked} />
                </button>
              </div>
            </div>
          ))}
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
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-3-7 3V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
  );
}
