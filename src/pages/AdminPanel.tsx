
import { useState } from "react";
import { Users, Briefcase, FileText, Check, X, Calendar, Settings } from "lucide-react";

const dummyUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@email.com", type: "Job Seeker" },
  { id: 2, name: "Big Data LLC", email: "hr@bigdata.com", type: "Employer" },
];

const dummyJobs = [
  { id: 2, title: "Data Engineer", company: "Big Data LLC", status: "Pending" },
  { id: 3, title: "Product Manager", company: "GrowthHunt", status: "Approved" },
];

const dummyCompanies = [
  { id: 1, name: "NetHub Labs", status: "Pending" },
  { id: 2, name: "GrowthHunt", status: "Approved" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("users");

  return (
    <div className="min-h-screen py-10 px-8 bg-gradient-to-b from-blue-100 via-white to-blue-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
        <div className="flex gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "users"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("users")}
          >
            Users
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "jobs"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("jobs")}
          >
            Job Posts
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "companies"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("companies")}
          >
            Company Registrations
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold border-b-2 ${
              tab === "analytics"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("analytics")}
          >
            Site Analytics
          </button>
        </div>
        <div className="bg-white rounded-b-lg shadow p-6 border border-blue-100">
          {tab === "users" && <UserManagement />}
          {tab === "jobs" && <JobManagement />}
          {tab === "companies" && <CompanyManagement />}
          {tab === "analytics" && <AnalyticsPanel />}
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><Users /> Manage Users</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name/Company</th>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map(user => (
            <tr key={user.id} className="border-t border-blue-50 hover:bg-blue-50">
              <td className="py-2">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>
                <button className="text-blue-600 hover:underline mr-2">View</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function JobManagement() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><Briefcase /> Manage Job Posts</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyJobs.map(job => (
            <tr key={job.id} className="border-t border-blue-50 hover:bg-blue-50">
              <td className="py-2">{job.title}</td>
              <td>{job.company}</td>
              <td>
                <span className={job.status === "Pending" ? "text-yellow-700" : "text-green-700 font-semibold"}>
                  {job.status}
                </span>
              </td>
              <td>
                <button className="mr-2 inline-flex gap-1 items-center text-green-700 hover:underline">
                  <Check size={16}/> Approve
                </button>
                <button className="inline-flex gap-1 items-center text-red-700 hover:underline">
                  <X size={16}/> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompanyManagement() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><FileText /> Company Registrations</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Company</th>
            <th>Status</th>
            <th>Moderation</th>
          </tr>
        </thead>
        <tbody>
          {dummyCompanies.map(company => (
            <tr key={company.id} className="border-t border-blue-50 hover:bg-blue-50">
              <td className="py-2">{company.name}</td>
              <td>
                <span className={company.status === "Pending" ? "text-yellow-700" : "text-green-700 font-semibold"}>
                  {company.status}
                </span>
              </td>
              <td>
                <button className="mr-2 inline-flex gap-1 items-center text-green-700 hover:underline">
                  <Check size={16}/> Approve
                </button>
                <button className="inline-flex gap-1 items-center text-red-700 hover:underline">
                  <X size={16}/> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyticsPanel() {
  // Placeholder for future charts/graphs
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><Settings /> Site Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="text-3xl font-extrabold mb-2">1,250</div>
          <div className="text-blue-900 font-semibold">Active Users</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="text-3xl font-extrabold mb-2">350</div>
          <div className="text-blue-900 font-semibold">Job Posts</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="text-3xl font-extrabold mb-2">97</div>
          <div className="text-blue-900 font-semibold">Companies Registered</div>
        </div>
      </div>
    </div>
  );
}
