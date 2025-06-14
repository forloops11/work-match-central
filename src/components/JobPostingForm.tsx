
import { useState } from "react";
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

export default function JobPostingForm({ isOpen, onClose, onJobPosted, editingJob }: JobPostingFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: editingJob?.title || "",
    company: editingJob?.company || "ACME Corp.",
    location: editingJob?.location || "",
    salary: editingJob?.salary || "",
    jobType: editingJob?.jobType || "Full-time",
    description: editingJob?.description || "",
    requirements: editingJob?.requirements || "",
    skills: editingJob?.skills || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      setFormData({
        title: "",
        company: "ACME Corp.",
        location: "",
        salary: "",
        jobType: "Full-time",
        description: "",
        requirements: "",
        skills: "",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
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
                required
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary Range *</Label>
              <Input
                id="salary"
                placeholder="e.g. $80k - $120k"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                required
              />
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
              required
            />
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingJob ? "Update Job" : "Post Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
