
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface AdvancedFilters {
  experienceLevel: string;
  jobType: string;
  remoteOption: string;
  companySize: string;
  sortBy: string;
  skills: string[];
  salaryMin: string;
  salaryMax: string;
}

interface AdvancedSearchFiltersProps {
  filters: AdvancedFilters;
  onFiltersChange: (filters: AdvancedFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const skillOptions = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 
  'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'GraphQL',
  'UI/UX', 'Figma', 'Leadership', 'Agile', 'Project Management'
];

export default function AdvancedSearchFilters({ 
  filters, 
  onFiltersChange, 
  onApplyFilters, 
  onClearFilters 
}: AdvancedSearchFiltersProps) {
  const updateFilter = (key: keyof AdvancedFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleSkill = (skill: string) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    updateFilter('skills', updatedSkills);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Advanced Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Experience Level */}
        <div>
          <label className="text-sm font-medium mb-2 block">Experience Level</label>
          <Select value={filters.experienceLevel} onValueChange={(value) => updateFilter('experienceLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
              <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Job Type</label>
          <Select value={filters.jobType} onValueChange={(value) => updateFilter('jobType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Remote Option */}
        <div>
          <label className="text-sm font-medium mb-2 block">Work Arrangement</label>
          <Select value={filters.remoteOption} onValueChange={(value) => updateFilter('remoteOption', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select work arrangement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Fully Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div>
          <label className="text-sm font-medium mb-2 block">Company Size</label>
          <Select value={filters.companySize} onValueChange={(value) => updateFilter('companySize', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup (1-50)</SelectItem>
              <SelectItem value="small">Small (51-200)</SelectItem>
              <SelectItem value="medium">Medium (201-1000)</SelectItem>
              <SelectItem value="large">Large (1000+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Salary Range</label>
          <div className="flex gap-2">
            <Input
              placeholder="Min salary"
              value={filters.salaryMin}
              onChange={(e) => updateFilter('salaryMin', e.target.value)}
            />
            <Input
              placeholder="Max salary"
              value={filters.salaryMax}
              onChange={(e) => updateFilter('salaryMax', e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Skills */}
        <div>
          <label className="text-sm font-medium mb-2 block">Skills</label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={filters.skills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                />
                <label htmlFor={skill} className="text-sm cursor-pointer">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Sort Options */}
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date Posted</SelectItem>
              <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
              <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
              <SelectItem value="company">Company Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={onApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={onClearFilters} className="flex-1">
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
