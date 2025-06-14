
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Analytics } from "@/utils/adminData";
import { TrendingUp, Users, Briefcase, Building } from "lucide-react";

interface AnalyticsChartsProps {
  analytics: Analytics;
}

export default function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const monthlyData = [
    { month: "Jul", registrations: analytics.monthlyRegistrations[0], applications: analytics.jobApplications[0] },
    { month: "Aug", registrations: analytics.monthlyRegistrations[1], applications: analytics.jobApplications[1] },
    { month: "Sep", registrations: analytics.monthlyRegistrations[2], applications: analytics.jobApplications[2] },
    { month: "Oct", registrations: analytics.monthlyRegistrations[3], applications: analytics.jobApplications[3] },
    { month: "Nov", registrations: analytics.monthlyRegistrations[4], applications: analytics.jobApplications[4] },
    { month: "Dec", registrations: analytics.monthlyRegistrations[5], applications: analytics.jobApplications[5] },
  ];

  const chartConfig = {
    registrations: {
      label: "Registrations",
    },
    applications: {
      label: "Applications",
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="text-blue-600" size={24} />
              <div>
                <div className="text-2xl font-bold">{analytics.totalUsers}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Briefcase className="text-green-600" size={24} />
              <div>
                <div className="text-2xl font-bold">{analytics.totalJobs}</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building className="text-purple-600" size={24} />
              <div>
                <div className="text-2xl font-bold">{analytics.totalCompanies}</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-orange-600" size={24} />
              <div>
                <div className="text-2xl font-bold">{analytics.pendingApprovals}</div>
                <div className="text-sm text-gray-600">Pending Approvals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="applications" 
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
