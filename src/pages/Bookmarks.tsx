
const dummyBookmarkedJobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Acme Ltd.",
    location: "Berlin",
    salary: "$95k - $115k",
    dateSaved: "2025-06-14",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Webworks",
    location: "Remote",
    salary: "$80k - $100k",
    dateSaved: "2025-06-12",
  },
];

export default function Bookmarks() {
  return (
    <div className="min-h-screen py-10 px-8 bg-gradient-to-b from-blue-100 via-white to-blue-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Saved Jobs</h2>
        <div className="grid gap-5">
          {dummyBookmarkedJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow px-6 py-5 border border-blue-100 group animate-fade-in"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-blue-900">{job.title}</span>
                  <span className="inline-flex text-xs bg-blue-100 text-blue-800 px-2 py-1 ml-2 rounded">{job.company}</span>
                  <span className="inline-flex text-xs bg-blue-50 text-blue-700 px-2 py-1 ml-2 rounded"><b>{job.location}</b></span>
                </div>
                <div className="font-medium text-blue-800/90">{job.salary}</div>
                <div className="text-xs text-blue-400 mt-1">Saved on {job.dateSaved}</div>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow transition">
                  Apply
                </button>
                <button className="px-3 py-2 rounded border border-red-200 text-red-600 hover:bg-red-100 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
