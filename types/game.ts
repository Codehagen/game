export interface Rule {
  id: number;
  description: string;
  validator: (commit: string) => boolean;
}

export interface Challenge {
  id: string;
  type: "conflict" | "codeReview";
  message: string;
  validator: (commit: string) => boolean;
  points: number;
}

export interface GameConfig {
  rules: Rule[];
  conflicts: string[];
  codeReviews: string[];
}

export interface GameState {
  score: number;
  level: number;
  completedRules: number[];
}
