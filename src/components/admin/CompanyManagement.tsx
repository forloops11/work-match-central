
import { FileText, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/utils/adminData";

interface CompanyManagementProps {
  companies: Company[];
  onCompanyAction: (id: number, status: "Approved" | "Rejected") => void;
}

export default function CompanyManagement({ companies, onCompanyAction }: CompanyManagementProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
        <FileText /> Company Registrations ({companies.length})
      </h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.contactEmail}</TableCell>
                  <TableCell>{company.employeeCount || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={
                      company.status === "Approved" ? "default" : 
                      company.status === "Rejected" ? "destructive" : "secondary"
                    }>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(company.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {company.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => onCompanyAction(company.id, "Approved")}
                        >
                          <Check size={14} />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => onCompanyAction(company.id, "Rejected")}
                        >
                          <X size={14} />
                          Reject
                        </Button>
                      </div>
                    )}
                    {company.status !== "Pending" && (
                      <Badge variant="outline">{company.status}</Badge>
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
