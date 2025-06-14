
import { useState } from "react";
import { FileText, Users } from "lucide-react";

const dummyJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    applications: 12,
    status: "Open",
  },
  {
    id: 2,
    title: "Data Scientist",
    applications: 6,
    status: "Closed",
  },
];

export default function EmployerPortal() {
  const [tab, setTab] = useState<"jobs" | "profile">("jobs");
  return (
    <div className="min-h-screen py-12 px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-1">Employer Portal</h2>
        <div className="flex gap-4 mt-4">
          <button
            className={`px-5 py-2 rounded-t font-semibold transition border-b-2 ${
              tab === "jobs"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("jobs")}
          >
            My Job Openings
          </button>
          <button
            className={`px-5 py-2 rounded-t font-semibold transition border-b-2 ${
              tab === "profile"
                ? "bg-white border-blue-700 text-blue-900"
                : "text-blue-700 border-transparent bg-blue-50 hover:bg-white"
            }`}
            onClick={() => setTab("profile")}
          >
            Company Profile
          </button>
        </div>
        <div className="bg-white p-6 rounded-b-lg shadow border border-blue-100">
          {tab === "jobs" ? <MyJobOpenings /> : <CompanyProfile />}
        </div>
      </div>
    </div>
  );
}

function MyJobOpenings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileText /> Posted Jobs <span className="ml-2 text-blue-700">(Sample)</span>
        </h3>
        <button className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 shadow">
          + Post New Job
        </button>
      </div>
      <table className="w-full mt-2 table-auto">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Title</th>
            <th className="pb-2">Applications</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyJobs.map((job) => (
            <tr key={job.id} className="border-t border-blue-50 hover:bg-blue-50">
              <td className="py-2">{job.title}</td>
              <td>{job.applications}</td>
              <td>
                <span
                  className={
                    job.status === "Open"
                      ? "text-green-600 font-bold"
                      : "text-gray-600"
                  }
                >
                  {job.status}
                </span>
              </td>
              <td>
                <button className="text-blue-600 hover:underline mr-3">View</button>
                <button className="text-blue-700 hover:underline mr-3">Applicants</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompanyProfile() {
  return (
    <form className="max-w-lg space-y-4">
      <h3 className="text-lg font-bold mb-2">Manage Company Profile</h3>
      <div>
        <label className="font-semibold mb-1 block">Company Name</label>
        <input className="w-full border rounded px-4 py-2" required type="text" defaultValue="ACME Corp." />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Website</label>
        <input className="w-full border rounded px-4 py-2" required type="url" defaultValue="https://acme.com" />
      </div>
      <div>
        <label className="font-semibold mb-1 block">About Company</label>
        <textarea className="w-full border rounded px-4 py-2" rows={4} defaultValue="A leading tech solutions provider." />
      </div>
      <button className="mt-3 rounded px-5 py-2 bg-blue-800 text-white font-semibold hover:bg-blue-700 transition-all" type="submit">
        Save Changes
      </button>
    </form>
  );
}
