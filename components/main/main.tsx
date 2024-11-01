"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, AlertTriangle, Eye } from "lucide-react";
import { gameConfig } from "@/config/game-config";

const TypeScriptCommitLogGame: React.FC = () => {
  const [commit, setCommit] = useState<string>("");
  const [validRules, setValidRules] = useState<Set<number>>(new Set());
  const [visibleRules, setVisibleRules] = useState<number[]>([1]);
  const [conflict, setConflict] = useState<string | null>(null);
  const [codeReview, setCodeReview] = useState<string | null>(null);

  useEffect(() => {
    const validateRules = async () => {
      const validatedRules = await Promise.all(
        gameConfig.rules.map(async (rule) => ({
          id: rule.id,
          isValid: await rule.validator(commit),
        }))
      );

      const newValidRules = new Set(
        validatedRules
          .filter((result) => result.isValid)
          .map((result) => result.id)
      );

      setValidRules(newValidRules);

      const maxVisibleRule = Math.max(...visibleRules);
      if (
        newValidRules.has(maxVisibleRule) &&
        maxVisibleRule < gameConfig.rules.length
      ) {
        // Fix: Ensure we don't add duplicate rules
        setVisibleRules((prev) => {
          const nextRule = maxVisibleRule + 1;
          return prev.includes(nextRule) ? prev : [nextRule, ...prev];
        });

        // Random conflicts and reviews logic
        if (Math.random() < 0.3) {
          setConflict(
            gameConfig.conflicts[
              Math.floor(Math.random() * gameConfig.conflicts.length)
            ]
          );
        } else if (Math.random() < 0.3) {
          setCodeReview(
            gameConfig.codeReviews[
              Math.floor(Math.random() * gameConfig.codeReviews.length)
            ]
          );
        }
      }
    };

    validateRules();
  }, [commit, visibleRules]);

  const handleCommitChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCommit(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      validRules.size === gameConfig.rules.length &&
      !conflict &&
      !codeReview
    ) {
      alert(
        "Congratulations! Your TypeScript commit message is absurdly perfect!"
      );
    }
  };

  const sortedVisibleRules = visibleRules.sort((a, b) => {
    const isValidA = validRules.has(a);
    const isValidB = validRules.has(b);
    if (isValidA === isValidB) {
      // If both have same validity status, maintain original rule order
      return a - b;
    }
    // Invalid rules come first
    return isValidA ? 1 : -1;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-background rounded-lg shadow-lg">
      {/* <!-- 
        Congratulations on finding the source! 
        Secret token: ts_wizardry_42
        Include this in your commit message to pass rule #11
      --> */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        The TypeScript Commit Log Game
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="commit" className="block text-sm font-medium mb-2">
            Enter your TypeScript commit message
          </label>
          <Input
            id="commit"
            type="text"
            value={commit}
            onChange={handleCommitChange}
            className="w-full"
            aria-describedby="commit-rules"
          />
        </div>
        <div className="space-y-2" id="commit-rules">
          <AnimatePresence>
            {sortedVisibleRules.map((ruleId) => {
              const rule = gameConfig.rules.find((r) => r.id === ruleId);
              if (!rule) return null;
              const isValid = validRules.has(rule.id);

              return (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`transform transition-colors duration-300 ${
                      isValid ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        {isValid ? (
                          <Check
                            className="text-green-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <X className="text-red-600" aria-hidden="true" />
                        )}
                        <span className="font-medium">Rule {rule.id}</span>
                      </div>
                      <p className="mt-2 text-sm">{rule.description}</p>
                      {rule.progressMax && rule.getProgress && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  (rule.getProgress(commit) /
                                    rule.progressMax) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          {/* Removed the bug count text */}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  {rule.color && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <Card className="bg-white border-2 border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className="w-full h-24 rounded-md"
                              style={{
                                backgroundColor: rule.color,
                                boxShadow:
                                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                            />
                            <p className="text-sm">
                              Include the hexadecimal code for this color in
                              your commit
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {conflict && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-yellow-100 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle
                    className="text-yellow-600"
                    aria-hidden="true"
                  />
                  <span className="font-medium">Git Conflict</span>
                </div>
                <p className="mt-2 text-sm">{conflict}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {codeReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-blue-100 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="text-blue-600" aria-hidden="true" />
                  <span className="font-medium">Code Review</span>
                </div>
                <p className="mt-2 text-sm">{codeReview}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={
            validRules.size !== gameConfig.rules.length ||
            conflict !== null ||
            codeReview !== null
          }
        >
          Submit Commit
        </Button>
      </form>
    </div>
  );
};

export default TypeScriptCommitLogGame;
