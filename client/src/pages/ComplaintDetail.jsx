import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { complaintAPI, aiAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import { StatusBadge, CategoryBadge } from "../components/Badges";
import AIAnalysisCard from "../components/AIAnalysisCard";

const STATUSES = ["Pending", "In Progress", "Resolved", "Closed"];

export default function ComplaintDetail() {
  const { id } = useParams();
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    complaintAPI.getById(id)
      .then(({ data }) => { setComplaint(data.data); setSelectedStatus(data.data.status); })
      .catch(() => { toast.error("Complaint not found"); navigate("/complaints"); })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleStatusUpdate = async () => {
    if (selectedStatus === complaint.status) return;
    setStatusLoading(true);
    try {
      const { data } = await complaintAPI.updateStatus(id, selectedStatus);
      setComplaint(data.data);
      toast.success("Status updated successfully");
    } catch { toast.error("Failed to update status"); }
    finally { setStatusLoading(false); }
  };

  const handleAIAnalyze = async () => {
    setAiLoading(true);
    try {
      const { data } = await aiAPI.analyze({
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        location: complaint.location,
      });
      const { data: updated } = await complaintAPI.saveAIAnalysis(id, data.data);
      setComplaint(updated.data);
      toast.success("AI analysis complete");
    } catch (err) {
      toast.error(err.response?.data?.message || "AI analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this complaint permanently?")) return;
    try {
      await complaintAPI.delete(id);
      toast.success("Complaint deleted");
      navigate("/complaints");
    } catch { toast.error("Delete failed"); }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-ink-100 dark:bg-ink-800 rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!complaint) return null;

  const canEdit = isAdmin || complaint.user === user?.id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
        <Link to="/complaints" className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <span className="text-ink-400 dark:text-ink-600 font-mono text-sm">Complaint Detail</span>
      </motion.div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <StatusBadge status={complaint.status} />
                <CategoryBadge category={complaint.category} />
                <span className="text-xs font-mono text-ink-400 dark:text-ink-600">{new Date(complaint.createdAt).toLocaleString("en-IN")}</span>
              </div>
              <h1 className="text-2xl font-display font-bold text-ink-900 dark:text-white">{complaint.title}</h1>
            </div>
            {isAdmin && (
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-xl text-crimson-500 hover:bg-crimson-50 dark:hover:bg-crimson-900/20 transition-colors text-sm font-display font-medium self-start">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6 pb-6 border-b border-ink-100 dark:border-ink-800">
            {[
              ["Complainant", complaint.name],
              ["Email", complaint.email],
              ["Location", complaint.location],
              ["Last Updated", new Date(complaint.updatedAt).toLocaleString("en-IN")],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-xs font-mono text-ink-400 dark:text-ink-600 uppercase tracking-wider mb-1">{label}</div>
                <div className="text-sm font-body text-ink-800 dark:text-ink-200">{value}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs font-mono text-ink-400 dark:text-ink-600 uppercase tracking-wider mb-3">Description</div>
            <p className="font-body text-ink-700 dark:text-ink-300 leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
          </div>
        </motion.div>

        {(isAdmin || canEdit) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
            <h3 className="font-display font-semibold text-ink-900 dark:text-ink-100 mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-2 flex-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-display font-medium transition-all duration-150 border ${
                      selectedStatus === s
                        ? "border-ember-500 bg-ember-50 dark:bg-ember-900/20 text-ember-600 dark:text-ember-400"
                        : "border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-ink-300 dark:hover:border-ink-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={handleStatusUpdate}
                disabled={statusLoading || selectedStatus === complaint.status}
                className="btn-primary px-6 py-2 text-sm flex items-center gap-2"
              >
                {statusLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : "Save Status"}
              </button>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <AIAnalysisCard
            analysis={complaint.aiAnalysis}
            hasAnalysis={!!complaint.aiAnalysis}
            onAnalyze={handleAIAnalyze}
            loading={aiLoading}
          />
        </motion.div>
      </div>
    </div>
  );
}