
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, X, Calendar, Mail, User, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'application' | 'interview' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'TechCorp has scheduled an interview for tomorrow at 2:00 PM',
      timestamp: new Date('2025-06-13T16:00:00'),
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'application',
      title: 'Application Viewed',
      message: 'Your application for Software Developer at StartupXYZ has been viewed',
      timestamp: new Date('2025-06-13T14:30:00'),
      read: false,
      actionRequired: false
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'You have received a new message from InnovateCorp',
      timestamp: new Date('2025-06-13T10:15:00'),
      read: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'system',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated',
      timestamp: new Date('2025-06-12T18:45:00'),
      read: true,
      actionRequired: false
    }
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated",
    });
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar size={16} className="text-blue-500" />;
      case 'application':
        return <Briefcase size={16} className="text-green-500" />;
      case 'message':
        return <Mail size={16} className="text-purple-500" />;
      case 'system':
        return <User size={16} className="text-gray-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell size={20} />
          Notifications
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[18px] h-[18px] rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[70vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check size={16} className="mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh]">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${!notification.read ? 'font-bold' : ''}`}>
                            {notification.title}
                            {notification.actionRequired && (
                              <Badge className="ml-2 bg-orange-500 text-white text-xs">Action Required</Badge>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Check size={14} />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissNotification(notification.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      </div>
                      {notification.actionRequired && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="h-8">
                            {notification.type === 'interview' ? 'Confirm Interview' : 'Take Action'}
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
