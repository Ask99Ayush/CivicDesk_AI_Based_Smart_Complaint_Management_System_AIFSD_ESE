import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { complaintAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import { StatusBadge, CategoryBadge } from "../components/Badges";

const StatCard = ({ label, value, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="card p-6"
  >
    <div className={`text-3xl font-display font-bold ${accent} mb-1`}>{value}</div>
    <div className="text-sm font-body text-ink-500 dark:text-ink-400">{label}</div>
  </motion.div>
);

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    complaintAPI.getAll({ limit: 100 })
      .then(({ data }) => setComplaints(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const recent = complaints.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-ink-900 dark:text-white">
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},{" "}
          <span className="text-ember-500">{user?.name?.split(" ")[0]}</span>
        </h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1 font-body">
          {isAdmin ? "Admin dashboard — managing all civic complaints" : "Your complaint tracking overview"}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Complaints" value={stats.total} accent="text-ink-900 dark:text-white" delay={0.1} />
        <StatCard label="Pending" value={stats.pending} accent="text-amber-500" delay={0.15} />
        <StatCard label="In Progress" value={stats.inProgress} accent="text-sky-500" delay={0.2} />
        <StatCard label="Resolved" value={stats.resolved} accent="text-jade-500" delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-ink-900 dark:text-ink-100">Recent Complaints</h2>
            <Link to="/complaints" className="text-sm text-ember-500 hover:text-ember-600 font-display font-medium transition-colors">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-ink-100 dark:bg-ink-800 rounded-xl animate-pulse" />)}
            </div>
          ) : recent.length === 0 ? (
            <div className="text-center py-12 text-ink-400 dark:text-ink-600">
              <p className="font-body text-sm">No complaints yet.</p>
              <Link to="/complaints/new" className="btn-primary text-sm px-4 py-2 mt-4 inline-block">Submit First Complaint</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((c, i) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Link to={`/complaints/${c._id}`}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors group"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="font-display font-medium text-ink-900 dark:text-ink-100 truncate group-hover:text-ember-500 transition-colors">{c.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <CategoryBadge category={c.category} />
                        <span className="text-xs font-mono text-ink-400">{c.location}</span>
                      </div>
                    </div>
                    <StatusBadge status={c.status} />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="card p-6"
        >
          <h2 className="font-display font-semibold text-ink-900 dark:text-ink-100 mb-5">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/complaints/new" className="flex items-center gap-3 p-4 rounded-xl bg-ember-50 dark:bg-ember-900/20 hover:bg-ember-100 dark:hover:bg-ember-900/30 transition-colors group">
              <div className="w-10 h-10 bg-ember-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
              </div>
              <div>
                <div className="text-sm font-display font-semibold text-ember-700 dark:text-ember-400">New Complaint</div>
                <div className="text-xs font-body text-ember-600/70 dark:text-ember-500/70">Submit a civic issue</div>
              </div>
            </Link>
            <Link to="/complaints" className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors group">
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <div>
                <div className="text-sm font-display font-semibold text-sky-700 dark:text-sky-400">Track Complaints</div>
                <div className="text-xs font-body text-sky-600/70 dark:text-sky-500/70">View and filter issues</div>
              </div>
            </Link>
          </div>

          <div className="mt-6 pt-5 border-t border-ink-100 dark:border-ink-800">
            <div className="text-xs font-mono text-ink-400 dark:text-ink-600 mb-3 uppercase tracking-wider">Category Breakdown</div>
            {Object.entries(
              complaints.reduce((acc, c) => { acc[c.category] = (acc[c.category] || 0) + 1; return acc; }, {})
            ).slice(0, 4).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-2 mb-2">
                <div className="flex-1 text-xs font-body text-ink-600 dark:text-ink-400 truncate">{cat}</div>
                <div className="text-xs font-mono font-medium text-ink-900 dark:text-ink-100">{count}</div>
                <div className="w-16 h-1.5 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
                  <div className="h-full bg-ember-500 rounded-full" style={{ width: `${(count / stats.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}