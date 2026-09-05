import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Screen =
  | "intro"
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "level5"
  | "results";

interface Scores {
  logic: number;
  pattern: number;
  design: number;
  bug: number;
  security: number;
}

// ─── Level dot progress ───────────────────────────────────────────────────────
const LEVEL_COLORS: Record<string, string> = {
  level1: "#3b82f6",
  level2: "#a855f7",
  level3: "#ec4899",
  level4: "#f59e0b",
  level5: "#ef4444",
};
const LEVELS = ["level1", "level2", "level3", "level4", "level5"] as const;

function LevelDots({ current }: { current: Screen }) {
  const idx = LEVELS.indexOf(current as (typeof LEVELS)[number]);
  if (idx < 0) return null;
  return (
    <div className="flex gap-2 justify-center">
      {LEVELS.map((l, i) => (
        <div
          key={l}
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            background: i <= idx ? LEVEL_COLORS[l] : "rgba(255,255,255,0.15)",
            boxShadow: i === idx ? `0 0 8px ${LEVEL_COLORS[l]}` : "none",
            transform: i === idx ? "scale(1.3)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}

function LevelBadge({ level, label }: { level: number; label: string }) {
  const colors = ["#3b82f6", "#a855f7", "#ec4899", "#f59e0b", "#ef4444"];
  const color = colors[level - 1] ?? colors[0];
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
      style={{
        background: `${color}22`,
        border: `1.5px solid ${color}55`,
        color,
      }}
    >
      <span>Level {level}</span>
      <span>{label}</span>
    </div>
  );
}

// ─── Wrapper ──────────────────────────────────────────────────────────────────
function ScreenWrapper({
  children,
  level,
}: {
  children: React.ReactNode;
  level: Screen;
}) {
  return (
    <motion.div
      key={level}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  const levels = [
    { icon: "🔢", label: "Level 1 – Logic Puzzle", color: "#3b82f6" },
    { icon: "🔍", label: "Level 2 – Pattern Recognition", color: "#a855f7" },
    { icon: "🎨", label: "Level 3 – Design Challenge", color: "#ec4899" },
    { icon: "🐛", label: "Level 4 – Bug Fixing", color: "#f59e0b" },
    { icon: "🔒", label: "Level 5 – Security Challenge", color: "#ef4444" },
  ];

  return (
    <ScreenWrapper level="intro">
      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <img
          src="/assets/generated/techquest-banner.dim_1200x400.jpg"
          alt="Tech Quest Banner"
          className="w-full rounded-2xl object-cover shadow-2xl"
          style={{ maxHeight: 280 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Tech Quest
          </h1>
          <p
            className="font-heading text-lg sm:text-xl font-semibold mb-4"
            style={{ color: "#a855f7" }}
          >
            Problem Solving Adventure
          </p>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Play through 5 challenges. The system will analyze your behavior and
            predict your ideal tech career.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full max-w-md grid gap-3"
        >
          {levels.map((lv, i) => (
            <motion.div
              key={lv.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: `${lv.color}12`,
                border: `1px solid ${lv.color}30`,
              }}
            >
              <span className="text-2xl">{lv.icon}</span>
              <span
                className="font-semibold text-sm"
                style={{ color: lv.color }}
              >
                {lv.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85 }}
        >
          <Button
            size="lg"
            onClick={onStart}
            data-ocid="techquest.start_button"
            className="px-10 h-14 text-lg font-bold rounded-full"
            style={{ background: "#a855f7", color: "white" }}
          >
            Start Adventure →
          </Button>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Level 1 ──────────────────────────────────────────────────────────────────
function Level1({ onComplete }: { onComplete: (score: number) => void }) {
  const NUMBERS = [42, 7, 93, 15, 61, 28];
  const SORTED = [...NUMBERS].sort((a, b) => a - b);
  const [selected, setSelected] = useState<number[]>([]);
  const [tileState, setTileState] = useState<
    Record<number, "default" | "correct" | "wrong">
  >({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [done, setDone] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [done]);

  const handleTileClick = useCallback(
    (num: number) => {
      if (done || selected.includes(num)) return;
      const nextExpected = SORTED[selected.length];
      if (num === nextExpected) {
        const newSelected = [...selected, num];
        setTileState((prev) => ({ ...prev, [num]: "correct" }));
        setSelected(newSelected);
        if (newSelected.length === 6) {
          setDone(true);
        }
      } else {
        setTileState((prev) => ({ ...prev, [num]: "wrong" }));
        setTimeout(() => {
          setTileState((prev) => ({ ...prev, [num]: "default" }));
        }, 500);
      }
    },
    [done, selected, SORTED],
  );

  function calcScore() {
    const correctCount = selected.length;
    let score = correctCount * 15;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    if (correctCount === 6 && elapsed < 15) score += 10;
    return Math.min(100, score);
  }

  return (
    <ScreenWrapper level="level1">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <LevelBadge level={1} label="Logic Puzzle 🔢" />
          <LevelDots current="level1" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Arrange the numbers smallest → largest
        </h2>
        <p className="text-muted-foreground mb-4">
          Click each number in ascending order as fast as you can.
        </p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Time remaining</span>
            <span
              className="font-bold"
              style={{ color: timeLeft <= 10 ? "#ef4444" : "#3b82f6" }}
            >
              {timeLeft}s
            </span>
          </div>
          <Progress
            value={(timeLeft / 30) * 100}
            className="h-2"
            style={{ background: "rgba(59,130,246,0.15)" }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          {NUMBERS.map((num, i) => {
            const state = tileState[num] ?? "default";
            const isSelected = selected.includes(num);
            return (
              <motion.button
                key={num}
                data-ocid={`level1.tile.${i + 1}`}
                onClick={() => handleTileClick(num)}
                whileHover={!isSelected && !done ? { scale: 1.1 } : {}}
                whileTap={!isSelected && !done ? { scale: 0.95 } : {}}
                animate={{
                  scale:
                    state === "correct"
                      ? [1, 1.15, 1]
                      : state === "wrong"
                        ? [1, 0.9, 1]
                        : 1,
                }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-xl text-2xl font-bold flex items-center justify-center cursor-pointer transition-all select-none"
                style={{
                  background:
                    state === "correct"
                      ? "#22c55e33"
                      : state === "wrong"
                        ? "#ef444433"
                        : isSelected
                          ? "#22c55e33"
                          : "rgba(255,255,255,0.07)",
                  border:
                    state === "correct" || isSelected
                      ? "2px solid #22c55e"
                      : state === "wrong"
                        ? "2px solid #ef4444"
                        : "2px solid rgba(255,255,255,0.12)",
                  color:
                    state === "correct" || isSelected
                      ? "#22c55e"
                      : state === "wrong"
                        ? "#ef4444"
                        : "white",
                  boxShadow:
                    state === "correct" || isSelected
                      ? "0 0 12px #22c55e44"
                      : state === "wrong"
                        ? "0 0 12px #ef444444"
                        : "none",
                  opacity: isSelected ? 0.6 : 1,
                  cursor: isSelected || done ? "not-allowed" : "pointer",
                }}
              >
                {num}
              </motion.button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div
            className="mb-6 p-4 rounded-xl"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid #22c55e33",
            }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              Your order so far:
            </p>
            <div className="flex gap-2 flex-wrap">
              {selected.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 rounded-full text-sm font-bold"
                  style={{ background: "#22c55e22", color: "#22c55e" }}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={() => onComplete(calcScore())}
              data-ocid="level1.next_button"
              size="lg"
              className="w-full h-12 font-bold text-base rounded-xl"
              style={{ background: "#3b82f6", color: "white" }}
            >
              Next Level →
            </Button>
          </motion.div>
        )}
      </div>
    </ScreenWrapper>
  );
}

// ─── Level 2 ──────────────────────────────────────────────────────────────────
const PATTERN_QUESTIONS = [
  {
    sequence: ["2", "4", "8", "16", "___"],
    options: ["24", "32", "28", "20"],
    correct: "32",
    type: "text" as const,
  },
  {
    sequence: ["🔴", "🔵", "🔴", "🔵", "___"],
    options: ["🟢", "🔴", "🔵", "🟡"],
    correct: "🔴",
    type: "emoji" as const,
  },
  {
    sequence: ["1", "4", "9", "16", "___"],
    options: ["20", "25", "24", "18"],
    correct: "25",
    type: "text" as const,
  },
];

function Level2({ onComplete }: { onComplete: (score: number) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [flash, setFlash] = useState<
    Record<string, "correct" | "wrong" | null>
  >({});
  const [answered, setAnswered] = useState(false);
  const [levelDone, setLevelDone] = useState(false);

  const q = PATTERN_QUESTIONS[qIdx];

  function handleOption(opt: string) {
    if (answered || levelDone) return;
    const isCorrect = opt === q.correct;
    setFlash({ [opt]: isCorrect ? "correct" : "wrong" });
    if (isCorrect) setCorrectCount((c) => c + 1);
    setAnswered(true);
    const isLastQ = qIdx === PATTERN_QUESTIONS.length - 1;
    setTimeout(() => {
      setFlash({});
      if (isLastQ) {
        setLevelDone(true);
      } else {
        setAnswered(false);
        setQIdx((i) => i + 1);
      }
    }, 700);
  }

  const allDone = levelDone;
  const score = correctCount === 3 ? 100 : correctCount * 33;

  return (
    <ScreenWrapper level="level2">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <LevelBadge level={2} label="Pattern Recognition 🔍" />
          <LevelDots current="level2" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          What comes next in the sequence?
        </h2>
        <p className="text-muted-foreground mb-6">
          Question {qIdx + 1} of {PATTERN_QUESTIONS.length}
        </p>

        <div
          className="mb-8 p-6 rounded-2xl flex items-center justify-center gap-4 flex-wrap"
          style={{
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
        >
          {q.sequence.map((item) => (
            <span
              key={item === "___" ? "blank" : item}
              className="text-3xl font-bold"
              style={{ color: item === "___" ? "#a855f7" : "white" }}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {q.options.map((opt, i) => (
            <motion.button
              key={opt}
              data-ocid={`level2.option.${i + 1}`}
              onClick={() => handleOption(opt)}
              whileHover={!answered ? { scale: 1.03 } : {}}
              whileTap={!answered ? { scale: 0.97 } : {}}
              className="py-4 rounded-xl text-2xl font-bold transition-all"
              style={{
                background:
                  flash[opt] === "correct"
                    ? "#22c55e33"
                    : flash[opt] === "wrong"
                      ? "#ef444433"
                      : "rgba(255,255,255,0.07)",
                border:
                  flash[opt] === "correct"
                    ? "2px solid #22c55e"
                    : flash[opt] === "wrong"
                      ? "2px solid #ef4444"
                      : "2px solid rgba(168,85,247,0.25)",
                color:
                  flash[opt] === "correct"
                    ? "#22c55e"
                    : flash[opt] === "wrong"
                      ? "#ef4444"
                      : "white",
                cursor: answered ? "not-allowed" : "pointer",
              }}
            >
              {opt}
            </motion.button>
          ))}
        </div>

        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={() => onComplete(score)}
              data-ocid="level2.next_button"
              size="lg"
              className="w-full h-12 font-bold text-base rounded-xl"
              style={{ background: "#a855f7", color: "white" }}
            >
              Next Level →
            </Button>
          </motion.div>
        )}
      </div>
    </ScreenWrapper>
  );
}

// ─── Level 3 ──────────────────────────────────────────────────────────────────
const DESIGN_ELEMENTS = [
  { id: "navbar", label: "🧭 Navigation Bar" },
  { id: "hero", label: "🦸 Hero / Banner Section" },
  { id: "features", label: "📦 Features Cards Row" },
  { id: "cta", label: "📣 Call-to-Action Button" },
  { id: "footer", label: "📝 Footer" },
];
const CORRECT_ORDER = ["navbar", "hero", "features", "cta", "footer"];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function Level3({ onComplete }: { onComplete: (score: number) => void }) {
  const [shuffled] = useState(() => shuffle(DESIGN_ELEMENTS));
  const [placed, setPlaced] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done && doneRef.current) {
      setTimeout(() => {
        doneRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    }
  }, [done]);

  function handleClick(id: string) {
    if (done || placed.includes(id)) return;
    const newPlaced = [...placed, id];
    setPlaced(newPlaced);
    if (newPlaced.length === 5) setDone(true);
  }

  function calcScore() {
    return placed.reduce((acc, id, i) => {
      return acc + (CORRECT_ORDER[i] === id ? 20 : 0);
    }, 0);
  }

  return (
    <ScreenWrapper level="level3">
      {/* Fixed bottom bar when done */}
      {done && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          style={{
            background: "rgba(10,10,20,0.95)",
            borderTop: "1px solid rgba(236,72,153,0.4)",
          }}
        >
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <span
              className="text-sm font-bold"
              style={{ color: calcScore() >= 80 ? "#22c55e" : "#f59e0b" }}
            >
              Score: {calcScore()} / 100
            </span>
            <Button
              onClick={() => onComplete(calcScore())}
              data-ocid="level3.next_button"
              size="lg"
              className="flex-1 h-12 font-bold text-base rounded-xl"
              style={{ background: "#ec4899", color: "white" }}
            >
              Next Level →
            </Button>
          </div>
        </div>
      )}
      <div
        className="max-w-3xl mx-auto px-4 py-10"
        style={{ paddingBottom: done ? "100px" : undefined }}
      >
        <div className="flex items-center justify-between mb-6">
          <LevelBadge level={3} label="Design Challenge 🎨" />
          <LevelDots current="level3" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Build a correct webpage layout
        </h2>
        <p className="text-muted-foreground mb-6">
          Click elements in the correct order: Top → Bottom of a webpage.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Available Elements
            </p>
            <div className="grid gap-3">
              {shuffled.map((el, i) => {
                const isPlaced = placed.includes(el.id);
                return (
                  <motion.button
                    key={el.id}
                    data-ocid={`level3.element.${i + 1}`}
                    onClick={() => handleClick(el.id)}
                    whileHover={!isPlaced ? { scale: 1.02, x: 4 } : {}}
                    whileTap={!isPlaced ? { scale: 0.98 } : {}}
                    className="text-left px-4 py-3 rounded-xl font-medium transition-all"
                    style={{
                      background: isPlaced
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(236,72,153,0.08)",
                      border: isPlaced
                        ? "1.5px solid rgba(255,255,255,0.07)"
                        : "1.5px solid rgba(236,72,153,0.3)",
                      color: isPlaced ? "rgba(255,255,255,0.25)" : "white",
                      cursor: isPlaced ? "not-allowed" : "pointer",
                      opacity: isPlaced ? 0.5 : 1,
                    }}
                  >
                    {el.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Webpage Preview
            </p>
            <div
              className="min-h-64 rounded-xl p-3 flex flex-col gap-2"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1.5px dashed rgba(236,72,153,0.25)",
              }}
            >
              <AnimatePresence>
                {placed.map((id, i) => {
                  const el = DESIGN_ELEMENTS.find((e) => e.id === id)!;
                  const correct = CORRECT_ORDER[i] === id;
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                      style={{
                        background: correct
                          ? "rgba(34,197,94,0.12)"
                          : "rgba(239,68,68,0.12)",
                        border: correct
                          ? "1px solid #22c55e44"
                          : "1px solid #ef444444",
                        color: correct ? "#22c55e" : "#ef4444",
                      }}
                    >
                      <span>{correct ? "✓" : "✗"}</span>
                      {el.label}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {placed.length === 0 && (
                <p className="text-center text-muted-foreground text-sm mt-6">
                  Click elements on the left to place them here
                </p>
              )}
            </div>
          </div>
        </div>

        {done && (
          <motion.div
            ref={doneRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div
              className="p-4 rounded-xl mb-4 text-center"
              style={{
                background:
                  calcScore() >= 80
                    ? "rgba(34,197,94,0.1)"
                    : "rgba(245,158,11,0.1)",
                border: `1px solid ${calcScore() >= 80 ? "#22c55e44" : "#f59e0b44"}`,
              }}
            >
              <p
                className="font-bold text-lg"
                style={{ color: calcScore() >= 80 ? "#22c55e" : "#f59e0b" }}
              >
                Score: {calcScore()} / 100
              </p>
            </div>
            <Button
              onClick={() => onComplete(calcScore())}
              data-ocid="level3.next_button_inline"
              size="lg"
              className="w-full h-12 font-bold text-base rounded-xl"
              style={{ background: "#ec4899", color: "white" }}
            >
              Next Level →
            </Button>
          </motion.div>
        )}
      </div>
    </ScreenWrapper>
  );
}

// ─── Level 4 ──────────────────────────────────────────────────────────────────
const BUG_QUESTIONS = [
  {
    code: [
      { text: "for i in range(5)", color: "#f97316" },
      { text: "\n  print(i)", color: "#e2e8f0" },
    ],
    options: [
      { label: "A) for i in range(5):", correct: true },
      { label: "B) for i in range[5]:", correct: false },
      { label: "C) for (i in range(5)):", correct: false },
    ],
  },
  {
    code: [
      { text: "function add(a, b) {", color: "#60a5fa" },
      { text: "\n  return a ", color: "#e2e8f0" },
      { text: "- b;", color: "#f87171" },
      { text: "\n}", color: "#60a5fa" },
    ],
    options: [
      { label: "A) Change - to *", correct: false },
      { label: "B) Change - to +", correct: true },
      { label: "C) Add console.log", correct: false },
    ],
  },
  {
    code: [
      { text: "SELECT * ", color: "#60a5fa" },
      { text: "WHERE", color: "#f97316" },
      { text: " users;", color: "#e2e8f0" },
    ],
    options: [
      { label: "A) SELECT * FROM users;", correct: true },
      { label: "B) SELECT ALL IN users;", correct: false },
      { label: "C) SELECT users WHERE *;", correct: false },
    ],
  },
];

function Level4({ onComplete }: { onComplete: (score: number) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [optState, setOptState] = useState<
    Record<number, "correct" | "wrong" | null>
  >({});
  const [retried, setRetried] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = BUG_QUESTIONS[qIdx];

  function handleOption(idx: number, correct: boolean) {
    if (answered) return;
    if (correct) {
      setOptState({ [idx]: "correct" });
      if (!retried) setCorrectCount((c) => c + 1);
      setAnswered(true);
      const isLast = qIdx === BUG_QUESTIONS.length - 1;
      if (isLast) {
        setFinished(true);
      } else {
        setTimeout(() => {
          setOptState({});
          setAnswered(false);
          setRetried(false);
          setQIdx((i) => i + 1);
        }, 800);
      }
    } else {
      setOptState((prev) => ({ ...prev, [idx]: "wrong" }));
      setRetried(true);
      // allow retry: don't advance
      if (retried) {
        // 2nd wrong – auto move on
        const isLast = qIdx === BUG_QUESTIONS.length - 1;
        if (isLast) {
          setFinished(true);
        } else {
          setTimeout(() => {
            setOptState({});
            setAnswered(false);
            setRetried(false);
            setQIdx((i) => i + 1);
          }, 800);
        }
      }
    }
  }

  const lastQ = finished;
  const score = correctCount * 33;

  return (
    <ScreenWrapper level="level4">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <LevelBadge level={4} label="Bug Fixing 🐛" />
          <LevelDots current="level4" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Spot and fix the bug
        </h2>
        <p className="text-muted-foreground mb-6">
          Question {qIdx + 1} of {BUG_QUESTIONS.length} — Choose the correct fix
        </p>

        <div
          className="mb-6 p-5 rounded-xl font-mono text-sm whitespace-pre leading-relaxed"
          style={{
            background: "#0d1117",
            border: "1.5px solid rgba(245,158,11,0.3)",
            color: "#e2e8f0",
          }}
        >
          {q.code.map((seg) => (
            <span key={seg.text} style={{ color: seg.color }}>
              {seg.text}
            </span>
          ))}
        </div>

        <div className="grid gap-3 mb-8">
          {q.options.map((opt, i) => (
            <motion.button
              key={opt.label}
              data-ocid={`level4.fix_option.${i + 1}`}
              onClick={() => handleOption(i, opt.correct)}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              className="text-left px-5 py-4 rounded-xl font-medium text-sm transition-all"
              style={{
                background:
                  optState[i] === "correct"
                    ? "rgba(34,197,94,0.15)"
                    : optState[i] === "wrong"
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(245,158,11,0.06)",
                border:
                  optState[i] === "correct"
                    ? "1.5px solid #22c55e"
                    : optState[i] === "wrong"
                      ? "1.5px solid #ef4444"
                      : "1.5px solid rgba(245,158,11,0.3)",
                color:
                  optState[i] === "correct"
                    ? "#22c55e"
                    : optState[i] === "wrong"
                      ? "#ef4444"
                      : "white",
                cursor: answered ? "not-allowed" : "pointer",
              }}
            >
              {optState[i] === "correct" && (
                <span className="mr-2">✓ Fixed!</span>
              )}
              {optState[i] === "wrong" && (
                <span className="mr-2">✗ Try again</span>
              )}
              {opt.label}
            </motion.button>
          ))}
        </div>

        {lastQ && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={() => onComplete(score)}
              data-ocid="level4.next_button"
              size="lg"
              className="w-full h-12 font-bold text-base rounded-xl"
              style={{ background: "#f59e0b", color: "black" }}
            >
              Next Level →
            </Button>
          </motion.div>
        )}
      </div>
    </ScreenWrapper>
  );
}

// ─── Level 5 ──────────────────────────────────────────────────────────────────
const SECURITY_QUESTIONS = [
  {
    scenario:
      'You receive an email from "your bank" asking you to click a link and enter your password.',
    options: [
      { label: "A) Click the link and enter your password", correct: false },
      { label: "B) Ignore and report the email as phishing", correct: true },
      { label: "C) Forward to friends", correct: false },
    ],
  },
  {
    scenario:
      "You are setting a password for a new account. Which is most secure?",
    options: [
      { label: "A) password123", correct: false },
      { label: "B) myname2000", correct: false },
      { label: "C) Tr0ub4dor&3!", correct: true },
    ],
  },
  {
    scenario:
      '"Your computer has a virus! Call this number now!" pops up on a website.',
    options: [
      { label: "A) Call the number immediately", correct: false },
      {
        label: "B) Close the tab and run your actual antivirus",
        correct: true,
      },
      { label: "C) Share the page on social media", correct: false },
    ],
  },
];

function Level5({ onComplete }: { onComplete: (score: number) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [flash, setFlash] = useState<
    Record<number, "correct" | "wrong" | null>
  >({});
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = SECURITY_QUESTIONS[qIdx];

  function handleOption(idx: number, correct: boolean) {
    if (answered) return;
    setFlash({ [idx]: correct ? "correct" : "wrong" });
    if (correct) {
      setCorrectCount((c) => c + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
    setAnswered(true);
    const isLast = qIdx === SECURITY_QUESTIONS.length - 1;
    if (isLast) {
      setFinished(true);
    } else {
      setTimeout(() => {
        setFlash({});
        setAnswered(false);
        setQIdx((i) => i + 1);
      }, 900);
    }
  }

  const lastQ = finished;
  const score = correctCount * 33;

  return (
    <ScreenWrapper level="level5">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <LevelBadge level={5} label="Security Challenge 🔒" />
          <LevelDots current="level5" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Choose the SECURE action
        </h2>
        <p className="text-muted-foreground mb-6">
          Scenario {qIdx + 1} of {SECURITY_QUESTIONS.length}
        </p>

        {showConfetti && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
            {[
              "p0",
              "p1",
              "p2",
              "p3",
              "p4",
              "p5",
              "p6",
              "p7",
              "p8",
              "p9",
              "p10",
              "p11",
              "p12",
              "p13",
              "p14",
              "p15",
            ].map((pid, i) => (
              <motion.div
                key={pid}
                className="absolute w-2 h-2 rounded-full"
                initial={{
                  x: "50vw",
                  y: "40vh",
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: `${30 + Math.random() * 40}vw`,
                  y: `${10 + Math.random() * 50}vh`,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{
                  background: [
                    "#22c55e",
                    "#3b82f6",
                    "#f59e0b",
                    "#ec4899",
                    "#a855f7",
                  ][i % 5],
                }}
              />
            ))}
          </div>
        )}

        <div
          className="mb-6 p-6 rounded-2xl text-base font-medium leading-relaxed"
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1.5px solid rgba(239,68,68,0.2)",
            color: "white",
          }}
        >
          <span className="text-2xl mr-2">⚠️</span>
          {q.scenario}
        </div>

        <div className="grid gap-3 mb-8">
          {q.options.map((opt, i) => (
            <motion.button
              key={opt.label}
              data-ocid={`level5.action.${i + 1}`}
              onClick={() => handleOption(i, opt.correct)}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              className="text-left px-5 py-4 rounded-xl font-medium transition-all"
              style={{
                background:
                  flash[i] === "correct"
                    ? "rgba(34,197,94,0.15)"
                    : flash[i] === "wrong"
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(239,68,68,0.06)",
                border:
                  flash[i] === "correct"
                    ? "1.5px solid #22c55e"
                    : flash[i] === "wrong"
                      ? "1.5px solid #ef4444"
                      : "1.5px solid rgba(239,68,68,0.25)",
                color:
                  flash[i] === "correct"
                    ? "#22c55e"
                    : flash[i] === "wrong"
                      ? "#ef4444"
                      : "white",
                cursor: answered ? "not-allowed" : "pointer",
              }}
            >
              {flash[i] === "correct" && (
                <span className="mr-2">✓ Secure!</span>
              )}
              {flash[i] === "wrong" && <span className="mr-2">✗ Risky!</span>}
              {opt.label}
            </motion.button>
          ))}
        </div>

        {lastQ && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={() => onComplete(score)}
              data-ocid="level5.next_button"
              size="lg"
              className="w-full h-12 font-bold text-base rounded-xl"
              style={{ background: "#ef4444", color: "white" }}
            >
              See My Results 🏁
            </Button>
          </motion.div>
        )}
      </div>
    </ScreenWrapper>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────
const CAREER_ID_MAP: Record<string, string> = {
  "Software Developer": "software-developer",
  "AI / ML Engineer": "ai-ml-engineer",
  "Data Analyst": "data-analyst",
  "UI/UX Designer": "ui-ux-designer",
  "QA / Software Tester": "qa-engineer",
  "Cybersecurity Analyst": "cybersecurity-analyst",
  "Cloud Engineer": "cloud-engineer",
};

const RANK_BADGES = ["🥇", "🥈", "🥉"];

function ResultsScreen({
  scores,
  onReplay,
}: {
  scores: Scores;
  onReplay: () => void;
}) {
  const navigate = useNavigate();

  const skillRows = [
    { label: "🔢 Logic Solving", score: scores.logic },
    { label: "🔍 Pattern Detection", score: scores.pattern },
    { label: "🎨 Design Thinking", score: scores.design },
    { label: "🐛 Bug Detection", score: scores.bug },
    { label: "🔒 Security Thinking", score: scores.security },
  ];

  const careerScores = [
    {
      career: "Software Developer",
      score: Math.round(scores.logic * 0.6 + scores.pattern * 0.4),
    },
    {
      career: "AI / ML Engineer",
      score: Math.round(scores.logic * 0.5 + scores.pattern * 0.5),
    },
    {
      career: "Data Analyst",
      score: Math.round(scores.pattern * 0.7 + scores.logic * 0.3),
    },
    {
      career: "UI/UX Designer",
      score: Math.round(scores.design * 0.8 + scores.pattern * 0.2),
    },
    {
      career: "QA / Software Tester",
      score: Math.round(scores.bug * 0.8 + scores.logic * 0.2),
    },
    {
      career: "Cybersecurity Analyst",
      score: Math.round(scores.security * 0.8 + scores.logic * 0.2),
    },
    {
      career: "Cloud Engineer",
      score: Math.round(
        scores.logic * 0.4 + scores.bug * 0.3 + scores.security * 0.3,
      ),
    },
  ].sort((a, b) => b.score - a.score);

  const top3 = careerScores.slice(0, 3);
  const rankColors = ["#f59e0b", "#94a3b8", "#cd7c54"];

  return (
    <ScreenWrapper level="results">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🧠</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Career Analysis Complete!
          </h2>
          <p className="text-muted-foreground">
            Based on your gameplay behavior, here are your predicted career
            matches:
          </p>
        </motion.div>

        {/* Skill Score Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 mb-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="font-heading font-bold text-lg text-foreground mb-5">
            Your Skill Profile
          </h3>
          <div className="grid gap-4">
            {skillRows.map((row, i) => (
              <div key={row.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">
                    {row.label}
                  </span>
                  <span className="font-bold" style={{ color: "#a855f7" }}>
                    {row.score}%
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${row.score}%` }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    style={{
                      background: "linear-gradient(90deg, #3b82f6, #a855f7)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top 3 Career Matches */}
        <div className="mb-8">
          <h3 className="font-heading font-bold text-xl text-foreground mb-6 text-center">
            🎯 Top 3 Career Matches
          </h3>
          <div className="grid gap-4">
            {top3.map((c, i) => (
              <motion.div
                key={c.career}
                data-ocid={`results.career_card.${i + 1}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                className="rounded-2xl p-5"
                style={{
                  background: `${rankColors[i]}10`,
                  border: `2px solid ${rankColors[i]}40`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{RANK_BADGES[i]}</span>
                    <div>
                      <p
                        className="font-heading font-bold text-lg"
                        style={{ color: rankColors[i] }}
                      >
                        {c.career}
                      </p>
                      <Badge
                        className="text-xs mt-1"
                        style={{
                          background: `${rankColors[i]}20`,
                          color: rankColors[i],
                          border: `1px solid ${rankColors[i]}40`,
                        }}
                      >
                        Match Score: {c.score}%
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate({
                        to: "/career/$id",
                        params: {
                          id: CAREER_ID_MAP[c.career] ?? "software-developer",
                        },
                      })
                    }
                    data-ocid={`results.explore_button.${i + 1}`}
                    className="font-bold text-sm"
                    style={{
                      background: `${rankColors[i]}22`,
                      color: rankColors[i],
                      border: `1px solid ${rankColors[i]}55`,
                    }}
                  >
                    Explore →
                  </Button>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.score}%` }}
                    transition={{
                      delay: 0.9 + i * 0.15,
                      duration: 1,
                      ease: "easeOut",
                    }}
                    style={{ background: rankColors[i] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Button
            onClick={onReplay}
            data-ocid="results.replay_button"
            size="lg"
            variant="outline"
            className="w-full h-12 font-bold text-base rounded-xl border-border/40 hover:bg-muted/30"
          >
            🔄 Play Again
          </Button>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Main Game ────────────────────────────────────────────────────────────────
export default function TechQuestPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [scores, setScores] = useState<Scores>({
    logic: 0,
    pattern: 0,
    design: 0,
    bug: 0,
    security: 0,
  });

  function handleReset() {
    setScores({ logic: 0, pattern: 0, design: 0, bug: 0, security: 0 });
    setScreen("intro");
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, oklch(0.22 0.12 260) 0%, oklch(0.1 0.04 260) 60%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Back nav */}
      {screen !== "intro" && screen !== "results" && (
        <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Quit Game
          </button>
          <LevelDots current={screen} />
          <div /> {/* spacer */}
        </div>
      )}

      <div
        className={screen !== "intro" && screen !== "results" ? "pt-16" : ""}
      >
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <IntroScreen onStart={() => setScreen("level1")} />
          )}
          {screen === "level1" && (
            <Level1
              onComplete={(s) => {
                setScores((prev) => ({ ...prev, logic: s }));
                setScreen("level2");
              }}
            />
          )}
          {screen === "level2" && (
            <Level2
              onComplete={(s) => {
                setScores((prev) => ({ ...prev, pattern: s }));
                setScreen("level3");
              }}
            />
          )}
          {screen === "level3" && (
            <Level3
              onComplete={(s) => {
                setScores((prev) => ({ ...prev, design: s }));
                setScreen("level4");
              }}
            />
          )}
          {screen === "level4" && (
            <Level4
              onComplete={(s) => {
                setScores((prev) => ({ ...prev, bug: s }));
                setScreen("level5");
              }}
            />
          )}
          {screen === "level5" && (
            <Level5
              onComplete={(s) => {
                setScores((prev) => ({ ...prev, security: s }));
                setScreen("results");
              }}
            />
          )}
          {screen === "results" && (
            <ResultsScreen scores={scores} onReplay={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
