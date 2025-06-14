
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Briefcase, Building, Download, Filter, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('6months');
  const [dataType, setDataType] = useState('overview');
  const { toast } = useToast();

  // Enhanced mock data
  const overviewData = [
    { month: "Jul", applications: 145, jobPosts: 23, hires: 12, revenue: 15000 },
    { month: "Aug", applications: 189, jobPosts: 31, hires: 18, revenue: 22000 },
    { month: "Sep", applications: 234, jobPosts: 28, hires: 21, revenue: 28000 },
    { month: "Oct", applications: 312, jobPosts: 45, hires: 29, revenue: 35000 },
    { month: "Nov", applications: 289, jobPosts: 38, hires: 25, revenue: 31000 },
    { month: "Dec", applications: 356, jobPosts: 52, hires: 34, revenue: 42000 },
  ];

  const industryData = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 22, color: '#10b981' },
    { name: 'Finance', value: 18, color: '#f59e0b' },
    { name: 'Education', value: 12, color: '#ef4444' },
    { name: 'Retail', value: 8, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const performanceMetrics = {
    applicationConversionRate: 12.5,
    averageTimeToHire: 18,
    candidateSatisfaction: 4.2,
    employerSatisfaction: 4.5,
    platformGrowth: 23.8,
    activeJobseekers: 2847,
    activeEmployers: 156,
    successfulPlacements: 234
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download",
    });
    
    // Simulate data export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your analytics report has been downloaded",
      });
    }, 2000);
  };

  const chartConfig = {
    applications: { label: "Applications" },
    jobPosts: { label: "Job Posts" },
    hires: { label: "Hires" },
    revenue: { label: "Revenue" }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="applications">Applications</SelectItem>
              <SelectItem value="employers">Employers</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-600" size={20} />
              <div>
                <div className="text-xl font-bold">{performanceMetrics.applicationConversionRate}%</div>
                <div className="text-xs text-gray-600">Conversion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={20} />
              <div>
                <div className="text-xl font-bold">{performanceMetrics.averageTimeToHire}</div>
                <div className="text-xs text-gray-600">Avg. Days to Hire</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="text-purple-600" size={20} />
              <div>
                <div className="text-xl font-bold">{performanceMetrics.candidateSatisfaction}</div>
                <div className="text-xs text-gray-600">Candidate Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="text-orange-600" size={20} />
              <div>
                <div className="text-xl font-bold">{performanceMetrics.employerSatisfaction}</div>
                <div className="text-xs text-gray-600">Employer Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer>
                <AreaChart data={overviewData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer>
                <BarChart data={overviewData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer>
                <LineChart data={overviewData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="hires" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Growth Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Growth Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{performanceMetrics.activeJobseekers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Job Seekers</div>
              <div className="text-xs text-green-600 mt-1">+{performanceMetrics.platformGrowth}% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{performanceMetrics.activeEmployers}</div>
              <div className="text-sm text-gray-600">Active Employers</div>
              <div className="text-xs text-green-600 mt-1">+15.2% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{performanceMetrics.successfulPlacements}</div>
              <div className="text-sm text-gray-600">Successful Placements</div>
              <div className="text-xs text-green-600 mt-1">+18.7% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">${(173000).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-green-600 mt-1">+22.1% this month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
