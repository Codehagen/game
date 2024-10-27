import { GameConfig } from "@/types/game";

const TODAY = new Date().toISOString().split("T")[0];
// This will be visible in source code
const SECRET_TOKEN = "ts_wizardry_42";

// Generate a random color hex code
const RANDOM_COLOR = `#${Math.floor(Math.random() * 16777215)
  .toString(16)
  .padStart(6, "0")}`;

export const gameConfig: GameConfig = {
  rules: [
    {
      id: 1,
      description: "Use a descriptive commit message",
      validator: (commit) => commit.length > 10,
    },
    {
      id: 2,
      description: "Reference a Jira ticket number (e.g., TS-123)",
      validator: (commit) => /\b[A-Z]+-\d+\b/.test(commit),
    },
    {
      id: 3,
      description: "Include a meme or pop culture reference",
      validator: (commit) =>
        /(yolo|swag|lol|omg|wtf|tl;dr|fomo|yada yada|bazinga|winter is coming|may the force be with you)/i.test(
          commit
        ),
    },
    {
      id: 4,
      description:
        "Keep it under 72 characters (because somehow that's still a thing)",
      validator: (commit) => commit.length <= 72,
    },
    {
      id: 5,
      description: "Must include the word 'fix' (but not 'prefix' or 'suffix')",
      validator: (commit) =>
        /\bfix\b/i.test(commit) && !/(pre|suf)fix/i.test(commit),
    },
    {
      id: 6,
      description:
        "Include a TypeScript-related keyword (type, interface, enum, etc.)",
      validator: (commit) =>
        /\b(type|interface|enum|generic|typing|typescript|ts)\b/i.test(commit),
    },
    {
      id: 7,
      description: "Must not contain the word 'bug' (use 'feature' instead)",
      validator: (commit) =>
        !/\bbug\b/i.test(commit) && /\bfeature\b/i.test(commit),
    },
    {
      id: 8,
      description: "Add more bugs to the code 🐛",
      progressMax: 4,
      validator: (commit) => {
        const bugCount = (commit.match(/🐛/g) || []).length;
        return bugCount === 4;
      },
      getProgress: (commit) => (commit.match(/🐛/g) || []).length,
    },
    {
      id: 9,
      description: "Include the hexadecimal code for this color",
      color: RANDOM_COLOR,
      validator: (commit) => {
        // Extract all potential hex codes from commit (with or without #)
        const hexPattern = /#?[0-9a-f]{6}/gi;
        const commitHexCodes = commit.match(hexPattern) || [];

        // Clean up the target hex code
        const targetHex = RANDOM_COLOR.replace("#", "").toLowerCase();

        // Check if any of the found hex codes match our target
        return commitHexCodes.some(
          (hex) => hex.replace("#", "").toLowerCase() === targetHex
        );
      },
    },
    {
      id: 10,
      description: "Include today's date in ISO format (YYYY-MM-DD)",
      validator: (commit) => commit.includes(TODAY),
    },
    // {
    //   id: 11,
    //   description: "Include the current GitHub trending TypeScript repo name",
    //   validator: async (commit) => {
    //     try {
    //       const response = await fetch(
    //         "https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc"
    //       );
    //       const data = await response.json();
    //       const trendingRepo = data.items[0].name.toLowerCase();
    //       return commit.toLowerCase().includes(trendingRepo);
    //     } catch {
    //       return false;
    //     }
    //   },
    // },
    // {
    //   id: 12,
    //   description: "Reference the current Bitcoin price (within $1000 range)",
    //   validator: async (commit) => {
    //     try {
    //       const response = await fetch(
    //         "https://api.coindesk.com/v1/bpi/currentprice.json"
    //       );
    //       const data = await response.json();
    //       const currentPrice = Math.floor(data.bpi.USD.rate_float);
    //       const priceMatch = commit.match(/\$(\d{4,6})/);
    //       if (!priceMatch) return false;
    //       const committedPrice = parseInt(priceMatch[1]);
    //       return Math.abs(currentPrice - committedPrice) <= 1000;
    //     } catch {
    //       return false;
    //     }
    //   },
    // },
    {
      id: 13,
      description: "Include exactly four spaces (no more, no less)",
      validator: (commit) => (commit.match(/ /g) || []).length === 4,
    },
  ],
  conflicts: [
    "CONFLICT: Your use of 'fix' conflicts with the team's new policy of only using 'resolve'",
    "CONFLICT: The word 'feature' is now reserved for premium commits only",
    "CONFLICT: Spaces are temporarily deprecated, please use tabs",
    "CONFLICT: Your Jira ticket was just reassigned to another sprint",
    "CONFLICT: That meme reference is now considered legacy syntax",
    "CONFLICT: TypeScript keywords must now be in SCREAMING_SNAKE_CASE",
    "CONFLICT: Bitcoin price in commit is from wrong timezone",
    "CONFLICT: Date format should use stardate notation",
    "CONFLICT: GitHub trending repo was updated 0.03 seconds ago",
    "CONFLICT: Your commit doesn't account for quantum fluctuations in the blockchain",
    "CONFLICT: The secret token has been encrypted with ROT13",
    "CONFLICT: You found the wrong secret token (try viewing page source)",
    "CONFLICT: Color must be in CMYK format",
    "CONFLICT: That hex code is from last week's design system",
    "CONFLICT: Please use the colorblind-friendly version",
    "CONFLICT: This color has been deprecated in the design system",
  ],
  codeReviews: [
    "Code review: Please rewrite using only palindromes",
    "Code review: Can you make it more enterprise-grade™?",
    "Code review: Needs more design patterns",
    "Code review: This commit message isn't web-scale enough",
    "Code review: Please align with our new AI-first commit strategy",
    "Code review: Could you make it more buzzword-compliant?",
    "Code review: Please add more cryptocurrency references",
    "Code review: Date should be in Mars Sol format",
    "Code review: Need to reference at least 3 trending repos",
    "Code review: The secret token should be in hexadecimal",
    "Code review: Have you tried looking at the source code?",
    "Code review: Can we use a warmer color?",
    "Code review: This hex code doesn't follow material design",
    "Code review: Please use CSS color names instead",
  ],
};

// Nice job finding the secret token!
// Now include 'ts_wizardry_42' in your commit message
