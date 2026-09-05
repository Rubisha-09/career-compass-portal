import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  Folder,
  GraduationCap,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Wrench,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getCareerById } from "../data/careers";

const PLATFORMS: Record<string, string> = {
  Coursera: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Udemy: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  edX: "bg-red-500/20 text-red-300 border-red-500/30",
  freeCodeCamp: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "fast.ai": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Microsoft: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  AWS: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Google: "bg-green-500/20 text-green-300 border-green-500/30",
  CompTIA: "bg-red-500/20 text-red-300 border-red-500/30",
  "EC-Council": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  ISTQB: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Interaction Design Foundation":
    "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Skillshare: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  NPTEL: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "MIT OpenCourseWare": "bg-red-500/20 text-red-300 border-red-500/30",
};

type ProjectLevel = "Beginner" | "Intermediate" | "Advanced";

const LEVEL_STYLES = {
  Beginner: {
    card: "border-emerald-500/30 bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  Intermediate: {
    card: "border-blue-500/30 bg-blue-500/5",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    active: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  },
  Advanced: {
    card: "border-purple-500/30 bg-purple-500/5",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    active: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  },
};

export default function CareerDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/career/$id" });
  const career = getCareerById(id ?? "");
  const [activeYear, setActiveYear] = useState<number | null>(1);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [projectLevel, setProjectLevel] = useState<ProjectLevel>("Beginner");

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Career not found
          </h2>
          <Button
            onClick={() => navigate({ to: "/" })}
            data-ocid="error.primary_button"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const totalSkills = career.requiredSkillsForGap.length;
  const haveCount = selectedSkills.size;
  const gapPct =
    totalSkills > 0 ? Math.round((haveCount / totalSkills) * 100) : 0;
  const skillLevel =
    gapPct >= 67 ? "Advanced" : gapPct >= 34 ? "Intermediate" : "Beginner";
  const skillLevelColor =
    skillLevel === "Advanced"
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
      : skillLevel === "Intermediate"
        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
        : "bg-red-500/20 text-red-300 border-red-500/40";
  const missingSkills = career.requiredSkillsForGap.filter(
    (s) => !selectedSkills.has(s),
  );

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  };

  const filteredProjects = career.projects.find(
    (p) => p.level === projectLevel,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/40 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ to: "/results" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="career.cancel_button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            <span className="font-heading font-bold text-sm">
              Career Compass
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="career.primary_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Take Quiz
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Career Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 sm:p-10"
          data-ocid="career.card"
        >
          <div className="flex items-start gap-6 mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background: `${career.color}20`,
                border: `1px solid ${career.color}40`,
              }}
            >
              {career.icon}
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {career.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {career.description}
              </p>
            </div>
          </div>
          {/* View Roadmap CTA */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() =>
                navigate({
                  to: "/career/$id/roadmap",
                  params: { id: id ?? "" },
                })
              }
              data-ocid="career.view_roadmap_button"
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 font-semibold"
              variant="outline"
            >
              View Full Roadmap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() =>
                navigate({ to: "/career/$id/resume", params: { id: id ?? "" } })
              }
              data-ocid="career.view_resume_button"
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold"
              variant="outline"
            >
              📄 View Sample Resume
            </Button>
            <Button
              onClick={() =>
                navigate({
                  to: "/career/$id/linkedin",
                  params: { id: id ?? "" },
                })
              }
              data-ocid="career.view_linkedin_button"
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 font-semibold"
              variant="outline"
            >
              💼 Build LinkedIn Profile
            </Button>
          </div>
        </motion.div>

        {/* Skills + Languages + Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Skills Required",
              icon: Briefcase,
              items: career.skills,
              color: "text-blue-400",
            },
            {
              title: "Programming Languages",
              icon: Code2,
              items: career.languages,
              color: "text-emerald-400",
            },
            {
              title: "Industry Tools",
              icon: BookOpen,
              items: career.tools,
              color: "text-purple-400",
            },
          ].map(({ title, icon: Icon, items, color }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`w-5 h-5 ${color}`} />
                <h2 className="font-heading font-bold text-foreground">
                  {title}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge
                    key={item}
                    className="bg-muted/60 text-foreground border-border/40 text-xs"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION A: What Companies Expect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8"
          data-ocid="career.expectations_section"
        >
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-foreground text-xl">
              What Companies Expect
            </h2>
            <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 text-xs">
              Industry Standard
            </Badge>
          </div>
          <div className="space-y-3">
            {career.companyExpectations.map((expectation, i) => (
              <motion.div
                key={expectation}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/25 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">
                  {expectation}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION B: Skill Gap Analyzer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8"
          data-ocid="career.skill_gap_section"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-5 h-5 text-amber-400" />
            <h2 className="font-heading font-bold text-foreground text-xl">
              Skill Gap Analyzer
            </h2>
            <Badge className="ml-auto bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
              Interactive
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Click the skills you already have. We'll show your missing skills
            and level.
          </p>

          {/* Skill Toggle Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {career.requiredSkillsForGap.map((skill, i) => {
              const have = selectedSkills.has(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  data-ocid={`career.skill_toggle.${i + 1}`}
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    have
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                      : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                  }`}
                >
                  {have ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {skill}
                </button>
              );
            })}
          </div>

          {/* Progress + Level */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Your skill gap score:
              </span>
              <span className="font-heading font-bold text-foreground">
                {haveCount}/{totalSkills} skills
              </span>
            </div>
            <Progress value={gapPct} className="h-3 rounded-full" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {gapPct}% complete
              </span>
              <Badge
                data-ocid="career.skill_level_badge"
                className={`text-xs border font-bold ${skillLevelColor}`}
              >
                {skillLevel}
              </Badge>
            </div>
          </div>

          {/* Skills to learn next */}
          {missingSkills.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Skills to learn next:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-red-500/10 text-red-400 border-red-500/30 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {haveCount === totalSkills && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center"
            >
              <p className="text-emerald-300 font-semibold">
                🎉 You have all required skills! You're job ready!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* SECTION C: Company Role Mapping */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8"
          data-ocid="career.companies_section"
        >
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h2 className="font-heading font-bold text-foreground text-xl">
              Top Companies Hiring for This Role
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {career.companies.map((company) => (
              <div
                key={company}
                className="glass-card rounded-xl p-4 border-border/60 hover:border-primary/40 transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-2 font-heading font-bold text-primary group-hover:bg-primary/30 transition-colors">
                  {company[0]}
                </div>
                <div className="text-sm font-semibold text-foreground leading-tight">
                  {company}
                </div>
                <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Hiring
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION D: Project Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8"
          data-ocid="career.projects_section"
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="font-heading font-bold text-foreground text-xl">
              Recommended Projects
            </h2>
          </div>

          {/* Level Tabs */}
          <div className="flex gap-2 mb-6">
            {(["Beginner", "Intermediate", "Advanced"] as ProjectLevel[]).map(
              (lvl) => {
                const ocid =
                  lvl === "Beginner"
                    ? "career.projects_beginner_tab"
                    : lvl === "Intermediate"
                      ? "career.projects_intermediate_tab"
                      : "career.projects_advanced_tab";
                const style = LEVEL_STYLES[lvl];
                const isActive = projectLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    data-ocid={ocid}
                    onClick={() => setProjectLevel(lvl)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      isActive
                        ? `${style.active}`
                        : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              },
            )}
          </div>

          {/* Projects List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={projectLevel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl border p-5 ${LEVEL_STYLES[projectLevel].card}`}
            >
              {filteredProjects ? (
                <div className="space-y-3">
                  {filteredProjects.items.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30 hover:border-border/50 transition-colors"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${LEVEL_STYLES[projectLevel].badge}`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">
                          {item}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {projectLevel} level project
                        </div>
                      </div>
                      <Folder
                        className={`w-4 h-4 ${LEVEL_STYLES[projectLevel].badge.split(" ")[1]}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No projects available for this level.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Courses */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <h2 className="font-heading font-bold text-foreground">
              Recommended Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {career.courses.map((course) => (
              <div
                key={course.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 hover:border-border/70 transition-colors"
              >
                <Badge
                  className={`flex-shrink-0 text-xs border ${
                    PLATFORMS[course.platform] ??
                    "bg-muted/60 text-muted-foreground border-border/40"
                  }`}
                >
                  {course.platform}
                </Badge>
                <span className="text-sm text-foreground font-medium leading-snug">
                  {course.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Roadmap (inline preview) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8"
          data-ocid="career.panel"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              4-Year Career Roadmap
            </h2>
            <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 text-xs">
              Interactive
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Preview your journey year by year. Click a year to expand it, or
            view the full tree roadmap.
          </p>

          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border/30" />
            <div className="space-y-4">
              {career.roadmap.map((yearData, idx) => (
                <div key={yearData.year} className="relative pl-16">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveYear(
                        activeYear === yearData.year ? null : yearData.year,
                      )
                    }
                    data-ocid={`career.roadmap.toggle.${idx + 1}`}
                    className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all z-10 ${
                      activeYear === yearData.year
                        ? "bg-primary text-primary-foreground glow-blue scale-110"
                        : "bg-muted border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    Y{yearData.year}
                  </button>

                  <div
                    className={`rounded-xl border transition-all overflow-hidden ${
                      activeYear === yearData.year
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/40 bg-muted/10 hover:border-border/60"
                    }`}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() =>
                        setActiveYear(
                          activeYear === yearData.year ? null : yearData.year,
                        )
                      }
                    >
                      <div>
                        <span className="font-heading font-bold text-foreground">
                          Year {yearData.year}
                        </span>
                        <span className="text-xs text-muted-foreground ml-3">
                          {yearData.topics.length} topics ·{" "}
                          {yearData.projects.length} projects
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: activeYear === yearData.year ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeYear === yearData.year && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-border/30 pt-4">
                            <div>
                              <div className="flex items-center gap-1.5 mb-3">
                                <BookOpen className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                                  Learn
                                </span>
                              </div>
                              <ul className="space-y-2">
                                {yearData.topics.map((topic) => (
                                  <li
                                    key={topic}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 mb-3">
                                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                                  Languages
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {yearData.languages.map((lang) => (
                                  <Badge
                                    key={lang}
                                    className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-xs"
                                  >
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 mb-3">
                                <Folder className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                                  Projects
                                </span>
                              </div>
                              <ul className="space-y-2">
                                {yearData.projects.map((project) => (
                                  <li
                                    key={project}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    {project}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() =>
                navigate({
                  to: "/career/$id/roadmap",
                  params: { id: id ?? "" },
                })
              }
              data-ocid="career.view_roadmap_button"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow font-semibold"
            >
              View Full Tree Roadmap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Ready to start your journey?
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="career.submit_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8"
          >
            Take Career Assessment
          </Button>
        </div>
      </main>
    </div>
  );
}
