
import { useState } from "react";
import { BookmarkPlus, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/ApplicationModal";
import AdvancedSearchFilters from "@/components/AdvancedSearchFilters";
import SavedSearchesModal from "@/components/SavedSearchesModal";
import JobSearchForm from "@/components/JobSearchForm";
import JobCard from "@/components/JobCard";
import { useJobFilters } from "@/hooks/useJobFilters";
import { ApplicationModalState } from "@/types/job";

export default function FindJobs() {
  const {
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
  } = useJobFilters();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [applicationModal, setApplicationModal] = useState<ApplicationModalState>({
    isOpen: false,
    jobId: "",
    jobTitle: "",
    company: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURLParams(search, location, role, salary);
  };

  const handleApply = (jobId: number, jobTitle: string, company: string) => {
    setApplicationModal({
      isOpen: true,
      jobId: jobId.toString(),
      jobTitle,
      company,
    });
  };

  const closeApplicationModal = () => {
    setApplicationModal({
      isOpen: false,
      jobId: "",
      jobTitle: "",
      company: "",
    });
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
        <JobSearchForm
          search={search}
          location={location}
          role={role}
          salary={salary}
          onSearchChange={setSearch}
          onLocationChange={setLocation}
          onRoleChange={setRole}
          onSalaryChange={setSalary}
          onSubmit={handleSearch}
          onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
        />

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
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onBookmark={handleBookmark}
                  />
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
