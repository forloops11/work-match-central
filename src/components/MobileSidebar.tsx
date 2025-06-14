
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Briefcase } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  {
    section: "Explore",
    links: [
      { name: "Home", to: "/", icon: Briefcase },
      { name: "Find Jobs", to: "/jobs", icon: "search" },
      { name: "Saved Jobs", to: "/bookmarks", icon: "bookmark" },
    ],
  },
  {
    section: "Employers",
    links: [
      { name: "Post a Job", to: "/employer", icon: "calendar" },
      { name: "Applicants", to: "/employer/applications", icon: "users" },
    ],
  },
  {
    section: "Account",
    links: [
      { name: "Register / Login", to: "/register", icon: "log-in" },
    ],
  },
  {
    section: "Admin",
    links: [
      { name: "Admin Panel", to: "/admin", icon: "settings" },
    ],
  },
];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-gradient-to-br from-blue-700 via-blue-900 to-gray-800 text-white border-blue-900">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase size={32} className="text-white" />
          <span className="text-2xl font-bold tracking-tight">QuickHire</span>
        </div>
        
        <nav className="space-y-6">
          {navItems.map(({ section, links }) => (
            <div key={section}>
              <div className="text-xs uppercase text-blue-200/70 font-light mb-2 tracking-wider">
                {section}
              </div>
              <ul className="flex flex-col gap-1">
                {links.map(({ name, to, icon: Icon }) => (
                  <li key={name}>
                    <NavLink
                      to={to}
                      onClick={() => setIsOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
}
