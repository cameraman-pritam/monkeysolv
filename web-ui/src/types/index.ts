export type ExamCategory = 'NCERT' | 'Boards' | 'JEE Mains' | 'JEE Advanced' | 'NEET';

export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  exam: ExamCategory;
  latexContent: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  timeLimitSeconds: number;
}

export interface SprintSession {
  sessionId: string;
  watermark: string; // e.g. "#X7P"
  startTime: number;
  timeRemaining: number;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, number>;
  status: 'idle' | 'active' | 'completed' | 'photo_required' | 'terminated';
  strikes: number;
  score: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  tier: string;
  streakDays: number;
  accuracy: number;
  speedAvgSec: number;
  verifiedScans: number;
  isCurrentUser?: boolean;
}

export interface FeedPost {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    tier: string;
  };
  timeAgo: string;
  topic: string;
  exam: ExamCategory;
  solveTimeSec: number;
  watermark: string;
  scanThumbnailUrl: string;
  challengeCode: string;
  likes: number;
  verified: boolean;
}

export interface SkillNode {
  id: string;
  title: string;
  subject: Subject;
  exam: ExamCategory;
  unlocked: boolean;
  completed: boolean;
  stars: number; // 0 to 3
  prerequisites: string[];
  levelNumber: number;
}

export interface SecurityConfig {
  strictness: 'Strict' | 'Kiosk' | 'Lenient';
  preventCopyPaste: boolean;
  preventContextMenu: boolean;
  preventTabSwitch: boolean;
  fullscreenRequired: boolean;
}
