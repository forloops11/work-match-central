
import { useState } from "react";
import { UserPlus, Briefcase } from "lucide-react";

export default function Register() {
  const [type, setType] = useState<"jobseeker" | "employer">("jobseeker");

  return (
    <div className="min-h-screen px-10 py-16 flex items-center justify-center bg-gradient-to-tr from-blue-200 via-blue-50 to-blue-100">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row animate-scale-in">
        <aside className="bg-gradient-to-b from-blue-900 to-blue-700 text-white p-8 flex flex-col justify-center items-center md:w-1/2">
          <UserPlus size={42} className="mb-4" />
          <h2 className="text-2xl font-bold mb-3">
            {type === "jobseeker" ? "Register as Job Seeker" : "Register as Employer"}
          </h2>
          <button
            onClick={() => setType("jobseeker")}
            className={`mt-4 mb-1 w-full rounded px-5 py-2 text-white font-semibold transition ${
              type === "jobseeker"
                ? "bg-white/20 shadow border border-blue-200"
                : "bg-blue-900/50 hover:bg-white/20"
            }`}
          >
            I am a Job Seeker
          </button>
          <button
            onClick={() => setType("employer")}
            className={`mb-1 w-full rounded px-5 py-2 text-white font-semibold transition ${
              type === "employer"
                ? "bg-white/20 shadow border border-blue-200"
                : "bg-blue-900/50 hover:bg-white/20"
            }`}
          >
            I am an Employer
          </button>
          <p className="mt-6 text-sm text-blue-100/70">
            Already have an account? <a className="underline text-blue-200" href="#">Login</a>
          </p>
        </aside>
        <main className="p-8 md:w-1/2 flex flex-col justify-center">
          {type === "jobseeker" ? <JobSeekerRegistrationForm /> : <EmployerRegistrationForm />}
        </main>
      </div>
    </div>
  );
}

function JobSeekerRegistrationForm() {
  return (
    <form className="space-y-4 w-full animate-fade-in" autoComplete="off">
      <div>
        <label className="font-semibold mb-1 block">Full Name</label>
        <input className="w-full border rounded px-4 py-2" required type="text" placeholder="John Doe" />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Email Address</label>
        <input className="w-full border rounded px-4 py-2" required type="email" placeholder="john@email.com" />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Password</label>
        <input className="w-full border rounded px-4 py-2" required type="password" placeholder="********" />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Resume (PDF)</label>
        <input className="w-full border rounded px-4 py-2 bg-blue-50" required type="file" accept="application/pdf" />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="font-semibold mb-1 block">Skills</label>
          <input className="w-full border rounded px-4 py-2" required type="text" placeholder="React, Node.js, AWS..." />
        </div>
        <div className="flex-1">
          <label className="font-semibold mb-1 block">Experience</label>
          <input className="w-full border rounded px-4 py-2" type="text" placeholder="e.g. 3 years" />
        </div>
      </div>
      <button className="mt-3 w-full rounded px-5 py-2 bg-blue-900 text-white font-semibold hover:bg-blue-700 transition-all">
        Register
      </button>
    </form>
  );
}

function EmployerRegistrationForm() {
  return (
    <form className="space-y-4 w-full animate-fade-in">
      <div>
        <label className="font-semibold mb-1 block">Company Name</label>
        <input className="w-full border rounded px-4 py-2" required type="text" placeholder="ACME Corp." />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Contact Email</label>
        <input className="w-full border rounded px-4 py-2" required type="email" placeholder="jobs@acme.com" />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Password</label>
        <input className="w-full border rounded px-4 py-2" required type="password" />
      </div>
      <div>
        <label className="font-semibold mb-1 block">Company Website</label>
        <input className="w-full border rounded px-4 py-2" type="url" placeholder="https://www.example.com" />
      </div>
      <button className="mt-3 w-full rounded px-5 py-2 bg-blue-900 text-white font-semibold hover:bg-blue-700 transition-all">
        Register
      </button>
    </form>
  );
}
