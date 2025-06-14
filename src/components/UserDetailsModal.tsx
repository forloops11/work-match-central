
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User } from "@/utils/adminData";
import { Mail, Calendar, Clock, Shield } from "lucide-react";

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <Badge variant={user.type === "Employer" ? "default" : "secondary"}>
              {user.type}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-gray-500" />
              <span>{user.email}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-500" />
              <span>Registered: {new Date(user.registrationDate).toLocaleDateString()}</span>
            </div>
            
            {user.lastLogin && (
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-500" />
                <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <Shield size={16} className="text-gray-500" />
              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
