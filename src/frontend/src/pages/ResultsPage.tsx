import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Compass,
  Medal,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { quizResults } from "../App";
import { CAREERS } from "../data/careers";
import type { CareerScore } from "../utils/scoring";
import { calculateScores } from "../utils/scoring";

const RANK_BADGES = [
  {
    label: "Top Match",
    icon: Trophy,
    color: "text-yellow-400 bg-yellow-400/15 border-yellow-400/30",
  },
  {
    label: "2nd Match",
    icon: Medal,
    color: "text-slate-300 bg-slate-300/15 border-slate-300/30",
  },
  {
    label: "3rd Match",
    icon: Award,
    color: "text-amber-600 bg-amber-600/15 border-amber-600/30",
  },
];

function AnimatedScore({
  target,
  delay = 0,
}: { target: number; delay?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const pct = Math.min(elapsed / duration, 1);
        const ease = 1 - (1 - pct) ** 3;
        setCurrent(Math.round(ease * target));
        if (pct < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return <span>{current}%</span>;
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const [displayProgress, setDisplayProgress] = useState<number[]>([]);

  const scores: CareerScore[] =
    quizResults.scores ??
    calculateScores({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(scores.map((s) => s.score));
    }, 200);
    return () => clearTimeout(timer);
  }, [scores]);

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-amber-500";
    return "bg-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/40 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Compass className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold">Career Compass</span>
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="results.secondary_button"
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-blue">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Your Career Match <span className="gradient-text">Results</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your answers, here are your best career matches
          </p>
        </motion.div>

        {/* Top 3 highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {scores.slice(0, 3).map((score, i) => {
            const career = CAREERS.find((c) => c.id === score.careerId);
            const badge = RANK_BADGES[i];
            if (!career) return null;
            return (
              <motion.div
                key={score.careerId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`glass-card rounded-2xl p-6 text-center ${
                  i === 0
                    ? "border-yellow-400/40 glow-blue"
                    : "border-border/40"
                }`}
              >
                <Badge className={`mb-3 text-xs border ${badge.color}`}>
                  <badge.icon className="w-3 h-3 mr-1" />
                  {badge.label}
                </Badge>
                <div className="text-3xl mb-2">{career.icon}</div>
                <h3 className="font-heading font-bold text-foreground mb-1">
                  {career.title}
                </h3>
                <div className="text-2xl font-bold gradient-text">
                  <AnimatedScore target={score.score} delay={300 + i * 200} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  match score
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All results */}
        <div className="space-y-3">
          {scores.map((score, i) => {
            const career = CAREERS.find((c) => c.id === score.careerId);
            if (!career) return null;
            return (
              <motion.div
                key={score.careerId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                data-ocid={`results.item.${i + 1}`}
                className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${career.color}20` }}
                  >
                    {career.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-foreground text-sm truncate">
                        {career.title}
                      </h3>
                      {i < 3 && (
                        <Badge
                          className={`text-xs border flex-shrink-0 ${RANK_BADGES[i].color}`}
                        >
                          {RANK_BADGES[i].label}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${getProgressColor(score.score)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${displayProgress[i] ?? 0}%` }}
                          transition={{
                            duration: 1.2,
                            delay: 0.3 + i * 0.07,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground w-12 text-right flex-shrink-0">
                        <AnimatedScore
                          target={score.score}
                          delay={300 + i * 70}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    navigate({
                      to: "/career/$id",
                      params: { id: score.careerId },
                    })
                  }
                  className="text-primary hover:bg-primary/10 border border-primary/20 flex-shrink-0"
                  data-ocid="results.career.button"
                >
                  View Roadmap
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Retake CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to explore different answers?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="results.retake_button"
            className="border-border/60 text-foreground hover:bg-muted/40"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
