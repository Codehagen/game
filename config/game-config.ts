import { GameConfig } from "@/types/game";

export const gameConfig: GameConfig = {
  rules: [
    {
      id: 1,
      description: "Use a descriptive commit message",
      validator: (commit) => commit.length > 10,
    },
    {
      id: 2,
      description:
        "Include a TypeScript-related keyword (e.g., 'interface', 'type', 'enum')",
      validator: (commit) =>
        /\b(interface|type|enum|generic|union|intersection|tuple|keyof|typeof|readonly|as)\b/i.test(
          commit
        ),
    },
    {
      id: 3,
      description: "Reference a Jira ticket number (e.g., TS-123)",
      validator: (commit) => /\b[A-Z]+-\d+\b/.test(commit),
    },
    {
      id: 4,
      description: "Include a meme or pop culture reference",
      validator: (commit) =>
        /(yolo|swag|lol|omg|wtf|tl;dr|fomo|yada yada|bazinga|winter is coming|may the force be with you)/i.test(
          commit
        ),
    },
    {
      id: 5,
      description: "Add a passive-aggressive tone",
      validator: (commit) =>
        /(obviously|clearly|evidently|apparently|of course|naturally|as expected|surprisingly|magically)/i.test(
          commit
        ),
    },
  ],
  conflicts: [
    "Git conflict: Rebase your commit message to include the word 'refactor'",
    "Git conflict: Your commit message must now start with a verb in the imperative mood",
    "Git conflict: Rephrase your commit to use exactly 7 words",
  ],
  codeReviews: [
    "Code review: Your commit must now include an emoji",
    "Code review: Add a self-deprecating comment in parentheses",
    "Code review: Your commit message should rhyme",
  ],
};
