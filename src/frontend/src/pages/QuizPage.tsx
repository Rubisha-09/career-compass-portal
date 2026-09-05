import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Compass } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { quizResults } from "../App";
import { type QuizAnswers, calculateScores } from "../utils/scoring";

const QUESTIONS = [
  {
    id: "q1",
    question: "Which activities do you enjoy the most?",
    options: [
      { label: "Building websites and apps", emoji: "💻" },
      { label: "Solving logical / math problems", emoji: "🧮" },
      { label: "Analyzing data and finding patterns", emoji: "📊" },
      { label: "Testing and finding bugs in software", emoji: "🔍" },
      { label: "Designing user interfaces and experiences", emoji: "🎨" },
    ],
  },
  {
    id: "q2",
    question: "Which subjects do you like most?",
    options: [
      { label: "Programming / Computer Science", emoji: "💡" },
      { label: "Mathematics / Statistics", emoji: "📐" },
      { label: "Design and creativity", emoji: "🎭" },
      { label: "Electrical / Electronics", emoji: "⚡" },
      { label: "Problem solving / Logic", emoji: "🧩" },
    ],
  },
  {
    id: "q3",
    question: "Which work style do you prefer?",
    options: [
      { label: "Building new applications from scratch", emoji: "🏗️" },
      { label: "Finding and fixing bugs in software", emoji: "🐛" },
      { label: "Working with datasets and reports", emoji: "📈" },
      { label: "Creating AI and ML models", emoji: "🤖" },
      { label: "Designing user experiences", emoji: "✨" },
    ],
  },
  {
    id: "q4",
    question: "How comfortable are you with coding?",
    options: [
      { label: "Beginner — just started", emoji: "🌱" },
      { label: "Intermediate — know the basics", emoji: "📚" },
      { label: "Advanced — build real projects", emoji: "🚀" },
      { label: "Not comfortable — prefer design/analysis", emoji: "🎨" },
    ],
  },
  {
    id: "q5",
    question: "Which tools interest you most?",
    options: [
      { label: "Web technologies (HTML, CSS, JS)", emoji: "🌐" },
      { label: "Data tools (SQL, Excel, Python)", emoji: "🗃️" },
      { label: "AI / ML tools (TensorFlow, PyTorch)", emoji: "🧠" },
      { label: "Testing tools (Selenium, JIRA)", emoji: "🧪" },
      { label: "Design tools (Figma, Adobe XD)", emoji: "🖌️" },
    ],
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [direction, setDirection] = useState(1);

  const currentKey = `q${currentQ + 1}` as keyof QuizAnswers;
  const selected = answers[currentKey];
  const isLast = currentQ === QUESTIONS.length - 1;
  const progress =
    ((currentQ + (selected !== undefined ? 1 : 0)) / QUESTIONS.length) * 100;

  function handleSelect(idx: number) {
    setAnswers((prev) => ({ ...prev, [currentKey]: idx }));
  }

  function handleNext() {
    if (selected === undefined) return;
    if (isLast) {
      const fullAnswers = answers as QuizAnswers;
      const scores = calculateScores(fullAnswers);
      quizResults.scores = scores;
      navigate({ to: "/results" });
    } else {
      setDirection(1);
      setCurrentQ((p) => p + 1);
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      navigate({ to: "/" });
    } else {
      setDirection(-1);
      setCurrentQ((p) => p - 1);
    }
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="glass-card border-b border-border/40 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Compass className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold">Career Compass</span>
          </button>
          <span className="text-sm text-muted-foreground">
            Question {currentQ + 1} of {QUESTIONS.length}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Assessment Progress
            </span>
            <span className="text-xs text-primary font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < currentQ
                    ? "bg-primary text-primary-foreground"
                    : i === currentQ
                      ? "bg-primary/30 border-2 border-primary text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentQ ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQ}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="glass-card rounded-3xl p-8 sm:p-12">
                <div className="mb-3">
                  <span className="text-xs text-primary font-semibold uppercase tracking-widest">
                    Question {currentQ + 1}
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
                  {QUESTIONS[currentQ].question}
                </h2>

                <div className="grid gap-3">
                  {QUESTIONS[currentQ].options.map((opt, idx) => (
                    <motion.button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      data-ocid={`quiz.option.${idx + 1}`}
                      className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-xl border text-left transition-all ${
                        selected === idx
                          ? "border-primary bg-primary/15 shadow-glow"
                          : "border-border/40 bg-muted/20 hover:border-border/70 hover:bg-muted/40"
                      }`}
                    >
                      <span className="text-2xl w-10 text-center flex-shrink-0">
                        {opt.emoji}
                      </span>
                      <span
                        className={`font-medium text-sm sm:text-base ${
                          selected === idx
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {selected === idx && (
                        <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              data-ocid="quiz.cancel_button"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentQ === 0 ? "Back to Home" : "Previous"}
            </Button>

            <Button
              onClick={handleNext}
              disabled={selected === undefined}
              data-ocid={isLast ? "quiz.submit_button" : "quiz.primary_button"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
            >
              {isLast ? "See My Career Matches" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
