
import React from "react";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onApply: (jobId: number, jobTitle: string, company: string) => void;
  onBookmark: (jobId: number) => void;
}

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

export default function JobCard({ job, onApply, onBookmark }: JobCardProps) {
  return (
    <div className="card-3d glass-card p-6 rounded-2xl group transition-all duration-500">
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
            onClick={() => onApply(job.id, job.title, job.company)}
            className="btn-primary flex-1 lg:flex-none"
          >
            Apply Now
          </button>
          <button 
            onClick={() => onBookmark(job.id)}
            className="glass-button px-4 py-3 rounded-xl text-white border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
          >
            <span>{job.bookmarked ? "Saved ❤️" : "Save"}</span>
            <Bookmark filled={job.bookmarked} />
          </button>
        </div>
      </div>
    </div>
  );
}
