
import { Mail, Search } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_BG =
  "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600";

export default function Index() {
  return (
    <div className={`min-h-screen flex flex-col ${HERO_BG} text-white`}>
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-12 py-32 lg:py-42">
        <div className="max-w-3xl text-center">
          <span className="inline-block bg-blue-900/60 rounded-xl px-4 py-1 mb-4 text-blue-100 shadow-lg">#1 Job Portal for Modern Professionals</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in">
            Find Your <span className="text-blue-300">Dream Job</span> <br /> or Your Next Great Talent
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto mb-8">
            Search, apply, and get hired at lightning speed — while companies find the right fit first.
          </p>
          <form
            className="flex flex-wrap justify-center items-center gap-2 max-w-xl mx-auto px-1 animate-fade-in"
            onSubmit={e => { e.preventDefault(); }}
          >
            <div className="flex-grow min-w-0">
              <input
                type="text"
                placeholder="Role / Keyword"
                className="w-full px-4 py-3 rounded-l-lg border-none outline-none focus:ring-2 focus:ring-blue-300 text-blue-800"
                style={{ minWidth: 160 }}
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-blue-200/30 mx-1"></div>
            <div>
              <input
                type="text"
                placeholder="Location"
                className="w-36 px-3 py-3 rounded-none border-none outline-none focus:ring-2 focus:ring-blue-300 text-blue-800"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 rounded-r-lg font-semibold text-base bg-blue-900 hover:bg-blue-700 transition-300 focus:outline-none ring-2 ring-transparent focus:ring-blue-400"
            >
              <Search size={20} className="mr-2" />
              Search Jobs
            </button>
          </form>
          <div className="flex justify-center gap-6 mt-6 mb-2">
            <Link
              className="animate-scale-in inline-flex items-center gap-2 px-5 py-3 rounded shadow font-semibold bg-blue-100 text-blue-900 hover:bg-blue-200 transition duration-150"
              to="/register"
            >
              <Mail size={18} />
              Create Free Account
            </Link>
            <Link
              className="animate-scale-in px-5 py-3 rounded font-semibold bg-blue-900/60 border border-blue-300 hover:bg-blue-900 transition duration-150"
              to="/employer"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight // Features */}
      <section className="bg-white text-blue-900 py-16 px-6 shadow-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="p-7 rounded-xl bg-blue-50 flex flex-col gap-3 shadow-sm animate-fade-in">
            <h3 className="text-lg font-semibold mb-1">Powerful Filters</h3>
            <p className="text-blue-800/90 mb-2 text-base">
              Search jobs by location, salary, skills, company & more. Find the perfect fit in seconds!
            </p>
          </div>
          <div className="p-7 rounded-xl bg-blue-50 flex flex-col gap-3 shadow-sm animate-fade-in">
            <h3 className="text-lg font-semibold mb-1">1-Click Apply & Save</h3>
            <p className="text-blue-800/90 mb-2 text-base">
              Upload resumes, save/bookmark jobs, apply instantly, get alerts and stay ahead!
            </p>
          </div>
          <div className="p-7 rounded-xl bg-blue-50 flex flex-col gap-3 shadow-sm animate-fade-in">
            <h3 className="text-lg font-semibold mb-1">For Companies</h3>
            <p className="text-blue-800/90 mb-2 text-base">
              Post job openings, manage applicants, search candidates, and grow faster.
            </p>
          </div>
        </div>
      </section>
      {/* Company Showcase or Testimonials */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8 text-blue-900">Featured Employers</h3>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 justify-items-center">
            {/* Dummy logos as examples */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-10 grayscale hover:grayscale-0 transition-all"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-10 grayscale hover:grayscale-0 transition-all"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg" alt="LinkedIn" className="h-10 grayscale hover:grayscale-0 transition-all"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Logo TV" className="h-10 grayscale hover:grayscale-0 transition-all"/>
          </div>
        </div>
      </section>
    </div>
  );
}
