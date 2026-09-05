export interface QuizAnswers {
  q1: number; // 0-4 index
  q2: number;
  q3: number;
  q4: number;
  q5: number;
}

export interface CareerScore {
  careerId: string;
  score: number; // 0-100
}

// Scoring matrix: each career gets points per answer
// Format: [q1Score, q2Score, q3Score, q4Score, q5Score] per answer index
const SCORING_MATRIX: Record<string, number[][]> = {
  "software-developer": [
    [10, 0, 0, 0, 0], // q1: building websites
    [10, 0, 0, 0, 0], // q2: programming/CS
    [10, 0, 0, 0, 0], // q3: building apps
    [0, 5, 10, 0], // q4: coding comfort
    [10, 0, 0, 0, 0], // q5: web tech
  ],
  "ai-ml-engineer": [
    [0, 10, 0, 0, 0], // q1: logical problems
    [0, 10, 0, 0, 0], // q2: mathematics
    [0, 0, 0, 10, 0], // q3: AI/ML models
    [0, 0, 10, 0], // q4: advanced coding
    [0, 0, 10, 0, 0], // q5: AI tools
  ],
  "data-analyst": [
    [0, 0, 10, 0, 0], // q1: analyzing data
    [0, 10, 0, 0, 0], // q2: mathematics/statistics
    [0, 0, 10, 0, 0], // q3: working with data
    [0, 5, 10, 0], // q4: intermediate/advanced
    [0, 10, 0, 0, 0], // q5: data tools
  ],
  "software-tester": [
    [0, 0, 0, 10, 0], // q1: testing
    [10, 0, 0, 0, 0], // q2: programming
    [0, 10, 0, 0, 0], // q3: finding bugs
    [0, 10, 0, 0], // q4: intermediate
    [0, 0, 0, 10, 0], // q5: testing tools
  ],
  "cybersecurity-analyst": [
    [0, 10, 0, 0, 0], // q1: logical problems
    [0, 0, 0, 0, 10], // q2: problem solving/logic
    [0, 10, 0, 0, 0], // q3: finding bugs/security
    [0, 5, 10, 0], // q4: intermediate/advanced
    [10, 0, 0, 0, 0], // q5: web tech (networking)
  ],
  "cloud-engineer": [
    [10, 0, 0, 0, 0], // q1: building
    [10, 0, 0, 0, 0], // q2: programming
    [10, 0, 0, 0, 0], // q3: building apps
    [0, 5, 10, 0], // q4: intermediate/advanced
    [0, 10, 0, 0, 0], // q5: data tools (cloud/infra)
  ],
  "uiux-designer": [
    [0, 0, 0, 0, 10], // q1: designing UI
    [0, 0, 10, 0, 0], // q2: design/creativity
    [0, 0, 0, 0, 10], // q3: designing UX
    [0, 0, 0, 10], // q4: not comfortable with code
    [0, 0, 0, 0, 10], // q5: design tools
  ],
  "embedded-systems": [
    [0, 10, 0, 0, 0], // q1: logical problems
    [0, 0, 0, 10, 0], // q2: electronics
    [10, 0, 0, 0, 0], // q3: building systems
    [0, 5, 10, 0], // q4: intermediate/advanced
    [10, 0, 0, 0, 0], // q5: hardware/electronics
  ],
  "electrical-engineer": [
    [0, 10, 0, 0, 0], // q1: logical problems
    [0, 0, 0, 10, 0], // q2: electrical/electronics
    [10, 0, 0, 0, 0], // q3: building systems
    [0, 5, 10, 0], // q4: intermediate/advanced
    [10, 0, 0, 0, 0], // q5: technical tools
  ],
};

export function calculateScores(answers: QuizAnswers): CareerScore[] {
  const careerIds = Object.keys(SCORING_MATRIX);
  const rawScores: Record<string, number> = {};

  const answerArray = [
    answers.q1,
    answers.q2,
    answers.q3,
    answers.q4,
    answers.q5,
  ];

  for (const careerId of careerIds) {
    let total = 0;
    const matrix = SCORING_MATRIX[careerId];
    answerArray.forEach((answerIdx, qIdx) => {
      const qMatrix = matrix[qIdx];
      if (qMatrix && answerIdx < qMatrix.length) {
        total += qMatrix[answerIdx];
      }
    });
    rawScores[careerId] = total;
  }

  // Normalize to 0-100
  const maxPossible = 50; // max 10 per question × 5 questions
  const scores: CareerScore[] = careerIds.map((id) => ({
    careerId: id,
    score: Math.min(100, Math.round((rawScores[id] / maxPossible) * 100)),
  }));

  // Ensure some variety: add a small base score + some spread
  const maxScore = Math.max(...scores.map((s) => s.score));
  return scores
    .map((s) => ({
      ...s,
      score: maxScore > 0 ? Math.round(20 + (s.score / maxScore) * 80) : 40,
    }))
    .sort((a, b) => b.score - a.score);
}
