import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">CD</span>
          </div>
          <span className="font-display font-bold text-lg">CivicDesk</span>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-ink-900 dark:text-white">Create account</h2>
          <p className="text-ink-500 dark:text-ink-400 mt-2 font-body">Start managing civic complaints with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Rahul Kumar" className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Account Type</label>
            <select name="role" value={form.role} onChange={handleChange} className="input-field">
              <option value="user">User (Submit Complaints)</option>
              <option value="admin">Admin (Manage All Complaints)</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</> : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm font-body text-ink-500 dark:text-ink-400 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-ember-500 hover:text-ember-600 font-medium transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}