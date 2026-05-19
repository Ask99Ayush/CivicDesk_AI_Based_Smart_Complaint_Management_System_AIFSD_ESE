import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "New Complaint", path: "/complaints/new" },
  { label: "All Complaints", path: "/complaints" },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl border-b border-ink-100 dark:border-ink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">CD</span>
            </div>
            <span className="font-display font-bold text-lg text-ink-900 dark:text-white">CivicDesk</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-display font-medium text-sm transition-colors duration-150 ${
                  location.pathname === link.path
                    ? "bg-ember-50 dark:bg-ember-900/20 text-ember-600 dark:text-ember-400"
                    : "text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 hover:bg-ink-50 dark:hover:bg-ink-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            {user && (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-display font-semibold text-ink-900 dark:text-ink-100">{user.name}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 font-mono">{user.role}</div>
                  </div>
                  <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2">Logout</button>
                </div>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
                  {mobileOpen ? <XIcon /> : <MenuIcon />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-ink-950 border-b border-ink-100 dark:border-ink-800 px-4 pb-4"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg font-display font-medium text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors mt-1">
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-display font-semibold">{user?.name}</div>
                <div className="text-xs text-ink-500 font-mono">{user?.role}</div>
              </div>
              <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2">Logout</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}