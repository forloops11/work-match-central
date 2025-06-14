
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Send, User, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'received' | 'sent';
}

export default function MessagingCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'compose'>('inbox');
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', content: '' });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  // Mock messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'TechCorp HR',
      to: 'me',
      subject: 'Interview Invitation - Software Developer Position',
      content: 'We are pleased to invite you for an interview regarding the Software Developer position. Please let us know your availability.',
      timestamp: new Date('2025-06-13T10:30:00'),
      read: false,
      type: 'received'
    },
    {
      id: '2',
      from: 'StartupXYZ',
      to: 'me',
      subject: 'Application Status Update',
      content: 'Thank you for your application. We are currently reviewing your profile and will get back to you soon.',
      timestamp: new Date('2025-06-12T14:15:00'),
      read: true,
      type: 'received'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      from: 'me',
      to: newMessage.to,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date(),
      read: true,
      type: 'sent'
    };

    setMessages([message, ...messages]);
    setNewMessage({ to: '', subject: '', content: '' });
    setActiveTab('sent');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully",
    });
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'inbox') return msg.type === 'received';
    if (activeTab === 'sent') return msg.type === 'sent';
    return false;
  });

  const unreadCount = messages.filter(msg => msg.type === 'received' && !msg.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Mail size={20} />
          Messages
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[18px] h-[18px] rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Message Center</DialogTitle>
        </DialogHeader>
        
        <div className="flex h-[60vh]">
          {/* Sidebar */}
          <div className="w-1/3 border-r pr-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={activeTab === 'inbox' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('inbox')}
                className="flex-1"
              >
                Inbox
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">{unreadCount}</Badge>
                )}
              </Button>
              <Button
                variant={activeTab === 'sent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('sent')}
                className="flex-1"
              >
                Sent
              </Button>
              <Button
                variant={activeTab === 'compose' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('compose')}
                className="flex-1"
              >
                Compose
              </Button>
            </div>

            {activeTab !== 'compose' && (
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      } ${!message.read && message.type === 'received' ? 'bg-blue-25 border-blue-100' : ''}`}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) markAsRead(message.id);
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <User size={16} className="mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium text-sm truncate ${!message.read && message.type === 'received' ? 'font-bold' : ''}`}>
                              {message.type === 'received' ? message.from : message.to}
                            </span>
                            {!message.read && message.type === 'received' && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {message.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 pl-4">
            {activeTab === 'compose' ? (
              <div className="space-y-4">
                <h3 className="font-semibold">Compose New Message</h3>
                <Input
                  placeholder="To (company/candidate name)"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                />
                <Input
                  placeholder="Subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                />
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-[300px]"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                />
                <Button onClick={handleSendMessage} className="w-full">
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </div>
            ) : selectedMessage ? (
              <div className="h-full flex flex-col">
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <User size={16} />
                    <span>
                      {selectedMessage.type === 'received' ? `From: ${selectedMessage.from}` : `To: ${selectedMessage.to}`}
                    </span>
                    <span className="ml-auto">{selectedMessage.timestamp.toLocaleString()}</span>
                    {selectedMessage.read && <CheckCircle size={16} className="text-green-500" />}
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </ScrollArea>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="mr-2">Reply</Button>
                  <Button variant="outline">Forward</Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
