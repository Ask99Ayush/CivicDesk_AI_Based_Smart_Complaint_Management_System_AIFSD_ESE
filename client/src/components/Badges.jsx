import React from "react";

export const StatusBadge = ({ status }) => {
  const map = {
    "Pending": "badge-pending",
    "In Progress": "badge-progress",
    "Resolved": "badge-resolved",
    "Closed": "badge-closed",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${map[status] || "badge-closed"}`}>
      {status}
    </span>
  );
};

export const UrgencyBadge = ({ urgency }) => {
  const map = {
    "Low": "badge-low",
    "Medium": "badge-medium",
    "High": "badge-high",
    "Critical": "badge-critical",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${map[urgency] || "badge-medium"}`}>
      {urgency === "Critical" && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-slow inline-block" />}
      {urgency}
    </span>
  );
};

export const CategoryBadge = ({ category }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
    {category}
  </span>
);