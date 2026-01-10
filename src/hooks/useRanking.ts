import { useState, useEffect, useCallback } from "react";
import { GameMode, Difficulty, Continent } from "./useGameState";

export interface RankingEntry {
  score: number;
  date: string;
  mode: GameMode;
  continent?: Continent;
  difficulty: Difficulty;
}

const STORAGE_KEY = "geografia-ranking";
const MAX_ENTRIES = 10;

export function useRanking() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRankings(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing rankings", e);
      }
    }
  }, []);

  const addScore = useCallback(
    (entry: Omit<RankingEntry, "date">) => {
      const newEntry: RankingEntry = {
        ...entry,
        date: new Date().toISOString(),
      };

      setRankings((prev) => {
        const updated = [...prev, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_ENTRIES * 5); // Keep more entries for filtering

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const getFilteredRankings = useCallback(
    (mode?: GameMode, continent?: Continent, difficulty?: Difficulty) => {
      return rankings
        .filter((r) => {
          if (mode && r.mode !== mode) return false;
          if (continent && r.continent !== continent) return false;
          if (difficulty && r.difficulty !== difficulty) return false;
          return true;
        })
        .slice(0, MAX_ENTRIES);
    },
    [rankings]
  );

  const clearRankings = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRankings([]);
  }, []);

  return { rankings, addScore, getFilteredRankings, clearRankings };
}
