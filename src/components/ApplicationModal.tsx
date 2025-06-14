
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
  jobTitle: string;
  company: string;
}

export default function ApplicationModal({ isOpen, onClose, jobId, jobTitle, company }: ApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Mock application submission
    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const newApplication = {
        id: Math.random().toString(36).substr(2, 9),
        jobId,
        jobTitle,
        company,
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        coverLetter,
        status: 'pending',
        appliedAt: new Date().toISOString(),
      };

      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));

      toast({
        title: "Application Submitted!",
        description: `Your application for ${jobTitle} at ${company} has been submitted successfully.`,
      });

      setIsSubmitting(false);
      setCoverLetter('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Submit your application to {company}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell the employer why you're interested in this position..."
              rows={6}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
