
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Video, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type InterviewType = 'video' | 'phone' | 'in-person';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: Date;
  time: string;
  duration: number;
  type: InterviewType;
  location?: string;
  meetingLink?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function InterviewScheduler() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newInterview, setNewInterview] = useState({
    candidateName: '',
    position: '',
    time: '',
    duration: 60,
    type: 'video' as InterviewType,
    location: '',
    notes: ''
  });
  const { toast } = useToast();

  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'Alice Johnson',
      position: 'Frontend Developer',
      date: new Date('2025-06-15T14:00:00'),
      time: '14:00',
      duration: 60,
      type: 'video',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'Technical interview focusing on React and TypeScript',
      status: 'scheduled'
    },
    {
      id: '2',
      candidateName: 'Bob Smith',
      position: 'Backend Developer',
      date: new Date('2025-06-16T10:30:00'),
      time: '10:30',
      duration: 45,
      type: 'phone',
      notes: 'Initial screening call',
      status: 'scheduled'
    }
  ]);

  const handleScheduleInterview = () => {
    if (!newInterview.candidateName || !newInterview.position || !newInterview.time || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const interview: Interview = {
      id: Date.now().toString(),
      candidateName: newInterview.candidateName,
      position: newInterview.position,
      date: new Date(selectedDate.setHours(parseInt(newInterview.time.split(':')[0]), parseInt(newInterview.time.split(':')[1]))),
      time: newInterview.time,
      duration: newInterview.duration,
      type: newInterview.type,
      location: newInterview.type === 'in-person' ? newInterview.location : undefined,
      meetingLink: newInterview.type === 'video' ? 'https://zoom.us/j/generated-link' : undefined,
      notes: newInterview.notes,
      status: 'scheduled'
    };

    setInterviews([...interviews, interview]);
    setNewInterview({
      candidateName: '',
      position: '',
      time: '',
      duration: 60,
      type: 'video',
      location: '',
      notes: ''
    });

    toast({
      title: "Interview Scheduled",
      description: `Interview with ${interview.candidateName} has been scheduled for ${interview.date.toLocaleDateString()}`,
    });
  };

  const getInterviewIcon = (type: InterviewType) => {
    switch (type) {
      case 'video':
        return <Video size={16} className="text-blue-500" />;
      case 'phone':
        return <Clock size={16} className="text-green-500" />;
      case 'in-person':
        return <MapPin size={16} className="text-purple-500" />;
      default:
        return <CalendarIcon size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarIcon size={20} className="mr-2" />
          Schedule Interview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Interview Scheduler</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[60vh]">
          {/* Scheduling Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Schedule New Interview</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Candidate Name"
                value={newInterview.candidateName}
                onChange={(e) => setNewInterview({...newInterview, candidateName: e.target.value})}
              />
              <Input
                placeholder="Position"
                value={newInterview.position}
                onChange={(e) => setNewInterview({...newInterview, position: e.target.value})}
              />
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="time"
                value={newInterview.time}
                onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
              />
              <Select
                value={newInterview.duration.toString()}
                onValueChange={(value) => setNewInterview({...newInterview, duration: parseInt(value)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select
              value={newInterview.type}
              onValueChange={(value) => setNewInterview({...newInterview, type: value as InterviewType})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Interview Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="in-person">In Person</SelectItem>
              </SelectContent>
            </Select>

            {newInterview.type === 'in-person' && (
              <Input
                placeholder="Location"
                value={newInterview.location}
                onChange={(e) => setNewInterview({...newInterview, location: e.target.value})}
              />
            )}

            <Textarea
              placeholder="Interview notes (optional)"
              value={newInterview.notes}
              onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
            />

            <Button onClick={handleScheduleInterview} className="w-full">
              Schedule Interview
            </Button>
          </div>

          {/* Scheduled Interviews */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Scheduled Interviews</h3>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {interviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{interview.candidateName}</CardTitle>
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={14} />
                        <span>{interview.position}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon size={14} />
                        <span>{interview.date.toLocaleDateString()}</span>
                        <Clock size={14} />
                        <span>{interview.time} ({interview.duration}min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getInterviewIcon(interview.type)}
                        <span className="capitalize">{interview.type}</span>
                        {interview.meetingLink && (
                          <a href={interview.meetingLink} className="text-blue-500 hover:underline ml-2">
                            Join Meeting
                          </a>
                        )}
                      </div>
                      {interview.notes && (
                        <p className="text-sm text-gray-600 mt-2">{interview.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
