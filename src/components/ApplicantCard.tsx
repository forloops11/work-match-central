
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Applicant {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  jobId: number;
  applicationDate: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  resume: string;
  coverLetter: string;
  experience: string;
}

interface ApplicantCardProps {
  applicant: Applicant;
  onStatusUpdate: (applicantId: number, status: string) => void;
}

export default function ApplicantCard({ applicant, onStatusUpdate }: ApplicantCardProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (status: string) => {
    onStatusUpdate(applicant.id, status);
    toast({
      title: "Status Updated",
      description: `${applicant.name}'s application status changed to ${status}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Reviewed": return "bg-blue-100 text-blue-800";
      case "Accepted": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{applicant.name}</CardTitle>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Mail size={14} />
              {applicant.email}
            </p>
            <p className="text-sm text-blue-600 font-medium mt-1">Applied for: {applicant.jobTitle}</p>
          </div>
          <Badge className={getStatusColor(applicant.status)}>
            {applicant.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Applied: {applicant.applicationDate}
          </span>
          <span className="flex items-center gap-1">
            <FileText size={14} />
            {applicant.experience} experience
          </span>
        </div>

        <div className="flex gap-2 mb-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </Button>
          {applicant.status === "Pending" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("Reviewed")}
              >
                Mark Reviewed
              </Button>
              <Button
                size="sm"
                onClick={() => handleStatusChange("Accepted")}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleStatusChange("Rejected")}
              >
                Reject
              </Button>
            </>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t">
            <div>
              <h4 className="font-medium mb-1">Cover Letter:</h4>
              <p className="text-sm text-gray-700">{applicant.coverLetter}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Resume Summary:</h4>
              <p className="text-sm text-gray-700">{applicant.resume}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
