
import {
  Briefcase,
  Calendar,
  FileText,
  Mail,
  Search,
  Settings,
  Users,
  UserPlus,
  Bookmark,
  Bell,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  {
    section: "Explore",
    links: [
      {
        name: "Home",
        to: "/",
        icon: Briefcase,
      },
      {
        name: "Find Jobs",
        to: "/jobs",
        icon: Search,
      },
      {
        name: "Saved Jobs",
        to: "/bookmarks",
        icon: Bookmark,
      },
    ],
  },
  {
    section: "Employers",
    links: [
      {
        name: "Post a Job",
        to: "/employer",
        icon: Calendar,
      },
      {
        name: "Applicants",
        to: "/employer/applications",
        icon: Users,
      },
    ],
  },
  {
    section: "Account",
    links: [
      {
        name: "Register/Login",
        to: "/register",
        icon: UserPlus,
      },
    ],
  },
  {
    section: "Admin",
    links: [
      {
        name: "Admin Panel",
        to: "/admin",
        icon: Settings,
      },
    ],
  },
];

export default function MainSidebar() {
  const location = useLocation();
  return (
    <aside
      className="bg-gradient-to-br from-blue-700 via-blue-900 to-gray-800 text-white w-64 min-h-screen py-8 border-r border-blue-900 shadow-lg flex flex-col"
      style={{ minWidth: "18rem" }}
    >
      <div className="flex items-center gap-2 mb-8 px-8">
        <Briefcase size={32} className="text-white" />
        <span className="text-2xl font-bold tracking-tight">
          QuickHire
        </span>
      </div>
      <nav className="flex-1 space-y-6 px-4">
        {navItems.map(({ section, links }) => (
          <div key={section}>
            <div className="text-xs uppercase text-blue-200/70 font-light mb-2 tracking-wider px-2">
              {section}
            </div>
            <ul className="flex flex-col gap-1">
              {links.map(({ name, to, icon: Icon }) => (
                <li key={name}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors select-none hover:bg-blue-800/70 hover:text-white text-blue-100 group",
                        isActive
                          ? "bg-white/10 text-white font-semibold"
                          : "font-medium"
                      )
                    }
                  >
                    <Icon size={20} className="shrink-0" />
                    <span>{name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <footer className="mt-auto px-8 text-xs text-blue-300/60">
        &copy; {new Date().getFullYear()} QuickHire
      </footer>
    </aside>
  );
}
