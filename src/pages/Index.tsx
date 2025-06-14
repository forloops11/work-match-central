
import { Mail, Search, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Index() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword.trim()) {
      params.set('keyword', searchKeyword.trim());
    }
    if (searchLocation.trim()) {
      params.set('location', searchLocation.trim());
    }
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col hero-gradient text-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-12 py-32 lg:py-42 relative z-10">
        <div className="max-w-4xl text-center animate-slide-up">
          <div className="glass-card inline-block px-6 py-2 mb-6 rounded-full border border-white/20">
            <span className="text-white/90 font-medium">#1 Job Portal for Modern Professionals</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 font-poppins">
            Find Your <span className="gradient-text">Dream Job</span>
            <br />
            <span className="text-5xl md:text-6xl">Transform Your Career</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover amazing opportunities, connect with top companies, and accelerate your career journey with our AI-powered job matching platform.
          </p>
          
          <form
            className="glass-card p-6 rounded-2xl max-w-4xl mx-auto mb-8 animate-slide-up"
            onSubmit={handleSearchSubmit}
            style={{animationDelay: '0.2s'}}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="professional-input w-full text-white placeholder-white/60"
                />
              </div>
              <div className="w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="professional-input w-full md:w-48 text-white placeholder-white/60"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-8"
              >
                <Search size={20} />
                Search Jobs
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 stagger-animation">
            <Link
              className="btn-primary flex items-center gap-3 px-8 py-4 justify-center"
              to="/register"
            >
              <Mail size={20} />
              Create Free Account
              <Sparkles size={18} />
            </Link>
            <Link
              className="glass-button px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center"
              to="/employer"
            >
              Post a Job
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="bg-white/10 backdrop-blur-lg py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text font-poppins">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            <div className="card-3d glass-card p-8 rounded-2xl text-center group">
              <div className="text-5xl mb-6 animate-float">🎯</div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                Smart Matching
              </h3>
              <p className="text-white/80 leading-relaxed">
                Our AI-powered algorithm finds the perfect job matches based on your skills, experience, and preferences.
              </p>
            </div>
            
            <div className="card-3d glass-card p-8 rounded-2xl text-center group">
              <div className="text-5xl mb-6 animate-float" style={{animationDelay: '1s'}}>⚡</div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                One-Click Apply
              </h3>
              <p className="text-white/80 leading-relaxed">
                Apply to multiple jobs instantly with your saved profile. Track applications and get real-time updates.
              </p>
            </div>
            
            <div className="card-3d glass-card p-8 rounded-2xl text-center group">
              <div className="text-5xl mb-6 animate-float" style={{animationDelay: '2s'}}>🚀</div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                Career Growth
              </h3>
              <p className="text-white/80 leading-relaxed">
                Access exclusive opportunities, salary insights, and career guidance from industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Showcase */}
      <section className="py-20 px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12 gradient-text font-poppins">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="glass-card p-6 rounded-2xl card-3d group">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
                alt="Microsoft" 
                className="h-8 filter brightness-0 invert group-hover:filter-none transition-all duration-300"
              />
            </div>
            <div className="glass-card p-6 rounded-2xl card-3d group">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                alt="Google" 
                className="h-8 filter brightness-0 invert group-hover:filter-none transition-all duration-300"
              />
            </div>
            <div className="glass-card p-6 rounded-2xl card-3d group">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg" 
                alt="LinkedIn" 
                className="h-8 filter brightness-0 invert group-hover:filter-none transition-all duration-300"
              />
            </div>
            <div className="glass-card p-6 rounded-2xl card-3d group">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" 
                alt="Company" 
                className="h-8 filter brightness-0 invert group-hover:filter-none transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Link to="/jobs" className="floating-action flex items-center justify-center text-white animate-glow">
        <Search className="h-6 w-6" />
      </Link>
    </div>
  );
}
