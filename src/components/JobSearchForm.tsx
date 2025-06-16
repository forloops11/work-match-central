
import React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobSearchFormProps {
  search: string;
  location: string;
  role: string;
  salary: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSalaryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleAdvancedFilters: () => void;
}

export default function JobSearchForm({
  search,
  location,
  role,
  salary,
  onSearchChange,
  onLocationChange,
  onRoleChange,
  onSalaryChange,
  onSubmit,
  onToggleAdvancedFilters,
}: JobSearchFormProps) {
  return (
    <form className="glass-card p-6 rounded-2xl mb-8 animate-slide-up" onSubmit={onSubmit} style={{animationDelay: '0.1s'}}>
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          className="professional-input flex-1 min-w-[200px] text-white placeholder-white/60"
          placeholder="Job title, keywords, or company"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <input
          type="text"
          className="professional-input min-w-[150px] text-white placeholder-white/60"
          placeholder="Location"
          value={location}
          onChange={e => onLocationChange(e.target.value)}
        />
        <select 
          className="professional-input text-white bg-white/10"
          value={role}
          onChange={e => onRoleChange(e.target.value)}
        >
          <option value="" className="text-gray-800">All Roles</option>
          <option value="Engineer" className="text-gray-800">Engineer</option>
          <option value="Manager" className="text-gray-800">Manager</option>
          <option value="Product" className="text-gray-800">Product</option>
        </select>
        <select 
          className="professional-input text-white bg-white/10"
          value={salary}
          onChange={e => onSalaryChange(e.target.value)}
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
          onClick={onToggleAdvancedFilters}
          className="glass-button text-white border-white/30 hover:bg-white/20 flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </form>
  );
}
