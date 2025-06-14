
import { Briefcase, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/utils/adminData";

interface JobManagementProps {
  jobs: Job[];
  onJobAction: (id: number, status: "Approved" | "Rejected") => void;
}

export default function JobManagement({ jobs, onJobAction }: JobManagementProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
        <Briefcase /> Manage Job Posts ({jobs.length})
      </h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.applicantCount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      job.status === "Approved" ? "default" : 
                      job.status === "Rejected" ? "destructive" : "secondary"
                    }>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.datePosted).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {job.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => onJobAction(job.id, "Approved")}
                        >
                          <Check size={14} />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => onJobAction(job.id, "Rejected")}
                        >
                          <X size={14} />
                          Reject
                        </Button>
                      </div>
                    )}
                    {job.status !== "Pending" && (
                      <Badge variant="outline">{job.status}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
