
import { Users, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/utils/adminData";

interface UserManagementProps {
  users: User[];
  onViewUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

export default function UserManagement({ users, onViewUser, onDeleteUser }: UserManagementProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
        <Users /> Manage Users ({users.length})
      </h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name/Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.type === "Employer" ? "default" : "secondary"}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewUser(user)}
                      >
                        <Eye size={14} />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
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
