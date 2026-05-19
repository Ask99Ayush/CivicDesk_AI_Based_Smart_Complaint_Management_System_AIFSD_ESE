import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { complaintAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  StatusBadge,
  CategoryBadge,
  UrgencyBadge,
} from "../components/Badges";

const CATEGORIES = [
  "All",
  "Water Supply",
  "Electricity",
  "Roads",
  "Garbage",
  "Sewage",
  "Public Safety",
  "Other",
];

const STATUSES = [
  "All",
  "Pending",
  "In Progress",
  "Resolved",
  "Closed",
];

export default function ComplaintList() {
  const { isAdmin } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [locationSearch, setLocationSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);

    try {
      const params = {
        page,
        limit: 8,
      };

      if (categoryFilter !== "All") {
        params.category = categoryFilter;
      }

      if (statusFilter !== "All") {
        params.status = statusFilter;
      }

      const { data } = await complaintAPI.getAll(params);

      setComplaints(data.data || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (error) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, [page, categoryFilter, statusFilter]);

  useEffect(() => {
    if (!searchMode) {
      fetchComplaints();
    }
  }, [fetchComplaints, searchMode]);

  const handleSearch = async () => {
    if (!locationSearch.trim()) {
      setSearchMode(false);
      fetchComplaints();
      return;
    }

    setLoading(true);
    setSearchMode(true);

    try {
      const { data } = await complaintAPI.search(locationSearch);

      setComplaints(data.data || []);
      setTotal(data.count || 0);
      setPages(1);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setLocationSearch("");
    setSearchMode(false);
    setPage(1);
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();

    if (!window.confirm("Delete this complaint permanently?")) {
      return;
    }

    try {
      await complaintAPI.delete(id);

      toast.success("Complaint deleted");

      fetchComplaints();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-ink-900 dark:text-white">
            Complaints
          </h1>

          <p className="text-ink-500 dark:text-ink-400 mt-1 font-body">
            {total} total{" "}
            {searchMode && `results for "${locationSearch}"`}
          </p>
        </div>

        <Link
          to="/complaints/new"
          className="btn-primary self-start sm:self-auto"
        >
          New Complaint
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch()
              }
              placeholder="Search by location..."
              className="input-field flex-1"
            />

            <button
              onClick={handleSearch}
              className="btn-primary px-4 py-2 text-sm whitespace-nowrap"
            >
              Search
            </button>

            {searchMode && (
              <button
                onClick={clearSearch}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
                setSearchMode(false);
              }}
              className="input-field text-sm"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
                setSearchMode(false);
              }}
              className="input-field text-sm"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-ink-100 dark:bg-ink-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : complaints.length === 0 ? (
        /* Empty State */
        <div className="card p-16 text-center">
          <div className="text-ink-400 dark:text-ink-600 font-body">
            No complaints found.{" "}
            <Link
              to="/complaints/new"
              className="text-ember-500 hover:text-ember-600"
            >
              Submit one now
            </Link>
          </div>
        </div>
      ) : (
        /* Complaint List */
        <AnimatePresence>
          <div className="space-y-3">
            {complaints.map((complaint, index) => (
              <motion.div
                key={complaint._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  to={`/complaints/${complaint._id}`}
                  className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-ember-200 dark:hover:border-ember-800 transition-all duration-200 group"
                >
                  {/* Left Section */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-ink-900 dark:text-ink-100 group-hover:text-ember-500 transition-colors">
                        {complaint.title}
                      </h3>

                      {complaint.aiAnalysis && (
                        <UrgencyBadge
                          urgency={complaint.aiAnalysis.urgency}
                        />
                      )}
                    </div>

                    <p className="text-sm font-body text-ink-500 dark:text-ink-400 truncate mb-2">
                      {complaint.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <CategoryBadge
                        category={complaint.category}
                      />

                      <span className="text-xs font-mono text-ink-400 dark:text-ink-600">
                        {complaint.location}
                      </span>

                      <span className="text-xs font-mono text-ink-300 dark:text-ink-700">
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={complaint.status} />

                    {isAdmin && (
                      <button
                        onClick={(e) =>
                          handleDelete(complaint._id, e)
                        }
                        className="p-2 rounded-lg text-crimson-400 hover:bg-crimson-50 dark:hover:bg-crimson-900/20 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}

                    <svg
                      className="w-4 h-4 text-ink-400 group-hover:text-ember-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {pages > 1 && !searchMode && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() =>
              setPage((prev) => Math.max(1, prev - 1))
            }
            disabled={page === 1}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-mono text-ink-500 dark:text-ink-400 px-4">
            Page {page} of {pages}
          </span>

          <button
            onClick={() =>
              setPage((prev) => Math.min(pages, prev + 1))
            }
            disabled={page === pages}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}