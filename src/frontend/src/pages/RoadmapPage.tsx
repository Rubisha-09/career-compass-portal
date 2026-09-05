import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Code2,
  Compass,
  Folder,
  Lightbulb,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getCareerById } from "../data/careers";

const YEAR_COLORS = [
  {
    bg: "bg-blue-500/20",
    border: "border-blue-500/50",
    text: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    line: "#3b82f6",
    activeBg: "bg-blue-500/30",
  },
  {
    bg: "bg-purple-500/20",
    border: "border-purple-500/50",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
    line: "#8b5cf6",
    activeBg: "bg-purple-500/30",
  },
  {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/50",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    line: "#10b981",
    activeBg: "bg-emerald-500/30",
  },
  {
    bg: "bg-amber-500/20",
    border: "border-amber-500/50",
    text: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    line: "#f59e0b",
    activeBg: "bg-amber-500/30",
  },
];

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/career/$id/roadmap" });
  const career = getCareerById(id ?? "");
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Career not found</p>
          <Button onClick={() => navigate({ to: "/" })}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animated-gradient">
      {/* Header */}
      <header className="glass-card border-b border-border/40 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/career/$id", params: { id: id ?? "" } })
            }
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="roadmap.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to {career.title}</span>
          </button>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            <span className="font-heading font-bold text-sm hidden sm:block">
              Career Compass
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl text-4xl mb-4"
            style={{
              background: `${career.color}20`,
              border: `1px solid ${career.color}40`,
            }}
          >
            {career.icon}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {career.title}
          </h1>
          <p className="text-muted-foreground font-heading text-lg">
            4-Year Learning Roadmap
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Click each year to explore topics, languages & projects
          </p>
        </motion.div>

        {/* Tree Structure */}
        <div className="relative">
          {/* Root Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-0"
          >
            <div
              className="glass-card rounded-2xl px-8 py-4 border-2 glow-blue flex items-center gap-3"
              style={{ borderColor: `${career.color}60` }}
            >
              <span className="text-2xl">{career.icon}</span>
              <div>
                <div className="font-heading font-bold text-foreground">
                  {career.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  Your Career Destination
                </div>
              </div>
            </div>
          </motion.div>

          {/* SVG connector from root to first year */}
          <svg
            aria-hidden="true"
            role="presentation"
            className="w-full"
            height="60"
            viewBox="0 0 400 60"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="60"
              stroke="oklch(0.62 0.22 255 / 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Year Nodes */}
          <div className="space-y-0">
            {career.roadmap.map((yearData, idx) => {
              const colors = YEAR_COLORS[idx] ?? YEAR_COLORS[0];
              const isExpanded = expandedYear === yearData.year;

              return (
                <motion.div
                  key={yearData.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                >
                  {/* Year Node Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      data-ocid={`roadmap.year_node.${idx + 1}`}
                      onClick={() =>
                        setExpandedYear(isExpanded ? null : yearData.year)
                      }
                      className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all duration-300 min-w-[280px] sm:min-w-[380px] ${
                        isExpanded
                          ? `${colors.activeBg} ${colors.border} ${colors.glow}`
                          : `glass-card border-border/40 hover:${colors.border}`
                      }`}
                    >
                      {/* Year badge */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-heading font-bold text-lg border-2 transition-all ${
                          isExpanded
                            ? `${colors.bg} ${colors.border} ${colors.text}`
                            : "bg-muted/40 border-border/40 text-muted-foreground"
                        }`}
                      >
                        Y{yearData.year}
                      </div>
                      <div className="flex-1 text-left">
                        <div
                          className={`font-heading font-bold text-base transition-colors ${isExpanded ? colors.text : "text-foreground"}`}
                        >
                          Year {yearData.year}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {yearData.topics.length} topics ·{" "}
                          {yearData.languages.length} languages ·{" "}
                          {yearData.projects.length} projects
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={colors.text}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-center py-4">
                          <div
                            className={`w-full max-w-2xl rounded-2xl border p-6 ${colors.bg} ${colors.border}`}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                              {/* Topics */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <BookOpen
                                    className={`w-4 h-4 ${colors.text}`}
                                  />
                                  <span
                                    className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}
                                  >
                                    Topics to Learn
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {yearData.topics.map((topic) => (
                                    <li
                                      key={topic}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                      <span
                                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.bg} border ${colors.border}`}
                                      />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Languages */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Code2 className={`w-4 h-4 ${colors.text}`} />
                                  <span
                                    className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}
                                  >
                                    Languages
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {yearData.languages.map((lang) => (
                                    <Badge
                                      key={lang}
                                      className={`text-xs border ${colors.bg} ${colors.text} ${colors.border}`}
                                    >
                                      {lang}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Projects */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Folder
                                    className={`w-4 h-4 ${colors.text}`}
                                  />
                                  <span
                                    className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}
                                  >
                                    Build Projects
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {yearData.projects.map((project) => (
                                    <li
                                      key={project}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                      <Lightbulb
                                        className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${colors.text}`}
                                      />
                                      {project}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Connector line to next node */}
                  {idx < career.roadmap.length - 1 && (
                    <svg
                      aria-hidden="true"
                      role="presentation"
                      className="w-full"
                      height="40"
                      viewBox="0 0 400 40"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="50%"
                        y1="0"
                        x2="50%"
                        y2="40"
                        stroke={`${colors.line}60`}
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Final destination badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <div className="glass-card rounded-2xl px-8 py-5 border border-primary/30 glow-blue text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="font-heading font-bold text-foreground">
                Job Ready!
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Ready for top companies
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 pb-8">
          <Button
            onClick={() =>
              navigate({ to: "/career/$id", params: { id: id ?? "" } })
            }
            variant="outline"
            className="border-border/60 text-foreground hover:bg-muted/40 mr-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Career Details
          </Button>
          <Button
            onClick={() => navigate({ to: "/quiz" })}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
          >
            Take Career Quiz
          </Button>
        </div>
      </main>
    </div>
  );
}
