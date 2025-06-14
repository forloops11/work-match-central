
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onJobPosted: (job: any) => void;
  editingJob?: any;
}

const initialFormData = {
  title: "",
  company: "ACME Corp.",
  location: "",
  salary: "",
  jobType: "Full-time",
  description: "",
  requirements: "",
  skills: "",
};

export default function JobPostingForm({ isOpen, onClose, onJobPosted, editingJob }: JobPostingFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when editingJob changes
  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title || "",
        company: editingJob.company || "ACME Corp.",
        location: editingJob.location || "",
        salary: editingJob.salary || "",
        jobType: editingJob.jobType || "Full-time",
        description: editingJob.description || "",
        requirements: editingJob.requirements || "",
        skills: Array.isArray(editingJob.skills) ? editingJob.skills.join(", ") : editingJob.skills || "",
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [editingJob, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary range is required";
    if (!formData.description.trim()) newErrors.description = "Job description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const skillsArray = formData.skills.split(",").map(skill => skill.trim()).filter(Boolean);
      
      const newJob = {
        id: editingJob?.id || Date.now(),
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary: formData.salary,
        jobType: formData.jobType,
        description: formData.description,
        requirements: formData.requirements,
        skills: skillsArray,
        applications: editingJob?.applications || 0,
        status: editingJob?.status || "Open",
        datePosted: editingJob?.datePosted || new Date().toLocaleDateString(),
      };

      onJobPosted(newJob);
      
      toast({
        title: editingJob ? "Job Updated" : "Job Posted",
        description: `${formData.title} has been ${editingJob ? "updated" : "posted"} successfully.`,
      });
      
      onClose();
      
      // Reset form if not editing
      if (!editingJob) {
        setFormData(initialFormData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingJob ? "Edit Job Posting" : "Post New Job"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>
            <div>
              <Label htmlFor="salary">Salary Range *</Label>
              <Input
                id="salary"
                placeholder="e.g. $80k - $120k"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className={errors.salary ? "border-red-500" : ""}
              />
              {errors.salary && <p className="text-sm text-red-500 mt-1">{errors.salary}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <select
              id="jobType"
              className="w-full border rounded px-3 py-2"
              value={formData.jobType}
              onChange={(e) => setFormData({...formData, jobType: e.target.value})}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="skills">Required Skills (comma-separated)</Label>
            <Input
              id="skills"
              placeholder="e.g. React, TypeScript, Node.js"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : (editingJob ? "Update Job" : "Post Job")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
