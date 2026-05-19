import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { complaintAPI } from "../api";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["Water Supply", "Electricity", "Roads", "Garbage", "Sewage", "Public Safety", "Other"];

export default function NewComplaint() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    title: "",
    description: "",
    category: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await complaintAPI.create(form);
      toast.success("Complaint submitted successfully");
      navigate(`/complaints/${data.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "Rahul Kumar", span: 1 },
    { label: "Email Address", name: "email", type: "email", placeholder: "rahul@gmail.com", span: 1 },
    { label: "Complaint Title", name: "title", type: "text", placeholder: "Brief, descriptive title of the issue", span: 2 },
    { label: "Location", name: "location", type: "text", placeholder: "e.g. Ghaziabad, Sector 12", span: 2 },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-ink-900 dark:text-white">Submit Complaint</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-2 font-body">Report a civic issue. AI will analyze and route it to the right department.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">{f.label}</label>
                <input
                  type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                  placeholder={f.placeholder} className="input-field" required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field" required>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-display font-medium text-ink-700 dark:text-ink-300 mb-2">
                Description
                <span className="ml-2 text-xs font-mono text-ink-400">({form.description.length} chars)</span>
              </label>
              <textarea
                name="description" value={form.description} onChange={handleChange}
                placeholder="Provide detailed information about the issue — location specifics, severity, duration, and any relevant context..."
                className="input-field resize-none" rows={5} required
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-ink-100 dark:border-ink-800">
            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : "Submit Complaint"}
            </button>
            <button type="button" onClick={() => navigate("/complaints")} className="btn-secondary w-full sm:w-auto">Cancel</button>
          </div>
        </form>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="mt-6 bg-gradient-to-r from-ember-50 to-amber-50 dark:from-ember-900/20 dark:to-amber-900/10 border border-ember-200 dark:border-ember-800/50 rounded-2xl p-5"
      >
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <div className="text-sm font-display font-semibold text-ember-700 dark:text-ember-400 mb-1">AI-Powered Analysis</div>
            <p className="text-xs font-body text-ember-700/70 dark:text-ember-400/70 leading-relaxed">
              After submission, you can run AI analysis to automatically detect urgency, identify the responsible department, and generate a personalized response.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}