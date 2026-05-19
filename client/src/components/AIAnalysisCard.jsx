import React from "react";
import { motion } from "framer-motion";
import { UrgencyBadge } from "./Badges";

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default function AIAnalysisCard({ analysis, onAnalyze, loading, hasAnalysis }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-ember-500 rounded-lg flex items-center justify-center">
            <BrainIcon />
          </div>
          <h3 className="font-display font-semibold text-ink-900 dark:text-ink-100">AI Analysis</h3>
        </div>
        {!hasAnalysis && (
          <button onClick={onAnalyze} disabled={loading} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : "Run AI Analysis"}
          </button>
        )}
      </div>

      {!hasAnalysis && !loading && (
        <div className="text-center py-10 text-ink-400 dark:text-ink-600">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center">
            <BrainIcon />
          </div>
          <p className="text-sm font-body">Click "Run AI Analysis" to detect urgency, recommend department, and generate an automated response.</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-2 h-2 bg-ember-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-ember-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-ember-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-sm font-body text-ink-500 dark:text-ink-400">Processing complaint with AI...</p>
        </div>
      )}

      {hasAnalysis && analysis && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
              <div className="text-xs font-mono text-ink-500 dark:text-ink-400 mb-2 uppercase tracking-wider">Urgency Level</div>
              <UrgencyBadge urgency={analysis.urgency} />
            </div>
            <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
              <div className="text-xs font-mono text-ink-500 dark:text-ink-400 mb-2 uppercase tracking-wider">Department</div>
              <div className="text-sm font-display font-semibold text-ink-900 dark:text-ink-100">{analysis.department}</div>
            </div>
          </div>

          <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
            <div className="text-xs font-mono text-ink-500 dark:text-ink-400 mb-2 uppercase tracking-wider">AI Summary</div>
            <p className="text-sm font-body text-ink-700 dark:text-ink-300 leading-relaxed">{analysis.summary}</p>
          </div>

          <div className="bg-gradient-to-br from-ember-50 to-amber-50 dark:from-ember-900/20 dark:to-amber-900/20 border border-ember-200 dark:border-ember-800 rounded-xl p-4">
            <div className="text-xs font-mono text-ember-600 dark:text-ember-400 mb-2 uppercase tracking-wider">Auto-Generated Response</div>
            <p className="text-sm font-body text-ink-700 dark:text-ink-300 leading-relaxed">{analysis.autoResponse}</p>
          </div>

          {analysis.analyzedAt && (
            <div className="text-xs font-mono text-ink-400 dark:text-ink-600">
              Analyzed: {new Date(analysis.analyzedAt).toLocaleString()}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}