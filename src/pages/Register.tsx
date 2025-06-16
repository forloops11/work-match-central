import { useState } from "react";
import { UserPlus, LogIn, Briefcase } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [regType, setRegType] = useState<"jobseeker" | "employer">("jobseeker");
  const [regTab, setRegTab] = useState<"login" | "register">("login");
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center bg-gradient-to-tr from-blue-200 via-blue-50 to-blue-100">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row animate-scale-in">
        <aside className="bg-gradient-to-b from-blue-900 to-blue-700 text-white p-8 flex flex-col justify-center items-center md:w-1/2">
          <Briefcase size={42} className="mb-4" />
          <h2 className="text-2xl font-bold mb-3">
            {regTab === "login"
              ? "Welcome Back!"
              : regType === "jobseeker"
              ? "Register as Job Seeker"
              : "Register as Employer"}
          </h2>
          {regTab === "register" && (
            <>
              <button
                onClick={() => setRegType("jobseeker")}
                className={`mt-4 mb-1 w-full rounded px-5 py-2 text-white font-semibold transition ${
                  regType === "jobseeker"
                    ? "bg-white/20 shadow border border-blue-200"
                    : "bg-blue-900/50 hover:bg-white/20"
                }`}
              >
                I am a Job Seeker
              </button>
              <button
                onClick={() => setRegType("employer")}
                className={`mb-1 w-full rounded px-5 py-2 text-white font-semibold transition ${
                  regType === "employer"
                    ? "bg-white/20 shadow border border-blue-200"
                    : "bg-blue-900/50 hover:bg-white/20"
                }`}
              >
                I am an Employer
              </button>
            </>
          )}
          <div className="mt-6 text-sm text-blue-100/70">
            {regTab === "login" ? (
              <>New here?{" "}
                <button
                  className="underline text-blue-200"
                  onClick={() => setRegTab("register")}
                >
                  Register
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button
                  className="underline text-blue-200"
                  onClick={() => setRegTab("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </aside>
        <main className="p-8 md:w-1/2 flex flex-col justify-center">
          <Tabs value={regTab} onValueChange={v => setRegTab(v as "login" | "register")}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1 flex items-center justify-center gap-2">
                <LogIn size={18} /> Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1 flex items-center justify-center gap-2">
                <UserPlus size={18} /> Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              {regType === "jobseeker" ? <JobSeekerRegistrationForm /> : <EmployerRegistrationForm />}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function LoginForm() {
  const [type, setType] = useState<"jobseeker" | "employer">("jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password, type);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 w-full animate-fade-in" onSubmit={handleSubmit}>
      <div className="flex mb-3">
        <button
          type="button"
          className={`flex-1 py-2 rounded-l font-semibold transition ${
            type === "jobseeker"
              ? "bg-blue-700 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setType("jobseeker")}
        >
          Job Seeker
        </button>
        <button
          type="button"
          className={`flex-1 py-2 rounded-r font-semibold transition ${
            type === "employer"
              ? "bg-blue-700 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setType("employer")}
        >
          Employer
        </button>
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Email Address</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@email.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-blue-900 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

function JobSeekerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    experience: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        type: "jobseeker",
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: formData.experience,
      }, formData.password);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Welcome to QuickHire! Please check your email to verify your account.",
        });
        navigate("/");
      } else {
        toast({
          title: "Registration Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 w-full animate-fade-in" onSubmit={handleSubmit}>
      <div>
        <label className="font-semibold mb-1 block">Full Name</label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="John Doe"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Email Address</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="john@email.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Password</label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="********"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="font-semibold mb-1 block">Skills</label>
          <Input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
            placeholder="React, Node.js, AWS..."
          />
        </div>
        <div className="flex-1">
          <label className="font-semibold mb-1 block">Experience</label>
          <Input
            type="text"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            placeholder="e.g. 3 years"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-blue-900 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

function EmployerRegistrationForm() {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    password: "",
    website: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.company) newErrors.company = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await register({
        name: formData.company,
        email: formData.email,
        type: "employer",
        company: formData.company,
        website: formData.website,
      }, formData.password);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Welcome to QuickHire! Please check your email to verify your account.",
        });
        navigate("/");
      } else {
        toast({
          title: "Registration Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 w-full animate-fade-in" onSubmit={handleSubmit}>
      <div>
        <label className="font-semibold mb-1 block">Company Name</label>
        <Input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          placeholder="ACME Corp."
          className={errors.company ? "border-red-500" : ""}
        />
        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Contact Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="jobs@acme.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Password</label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="********"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <label className="font-semibold mb-1 block">Company Website</label>
        <Input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({...formData, website: e.target.value})}
          placeholder="https://www.example.com"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-blue-900 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
