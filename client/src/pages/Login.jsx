import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-ink-900 dark:bg-ink-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ember-600/30 via-ink-900 to-sky-600/20" />
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="relative z-10 flex flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ember-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold">CD</span>
            </div>
            <span className="text-white font-display font-bold text-xl">CivicDesk</span>
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl font-display font-bold text-white leading-tight mb-6"
            >
              Smart Complaint Management System
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-ink-300 font-body text-lg leading-relaxed"
            >
              AI-powered complaint resolution. Submit, track, and resolve civic issues with intelligent automation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[["AI Analysis", "Automatic priority detection"], ["Fast Routing", "Smart department assignment"], ["Real-time", "Track complaint status"]].map(([title, desc]) => (
                <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-sm font-display font-semibold text-white mb-1">{title}</div>
                  <div className="text-xs font-body text-ink-400">{desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">CD</span>
              </div>
              <span className="font-display font-bold text-lg">CivicDesk</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-ink-900 dark:text-white">Welcome back</h2>
            <p className="text-ink-500 dark:text-ink-400 mt-2 font-body">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="input-field" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm font-body text-ink-500 dark:text-ink-400 mt-8">
            No account?{" "}
            <Link to="/register" className="text-ember-500 hover:text-ember-600 font-medium transition-colors">Create one here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}