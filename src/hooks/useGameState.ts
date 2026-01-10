import { useState, useCallback, useEffect, useRef } from "react";
import {
  Country,
  BrazilianState,
  getCountriesByContinent,
  brazilianStates,
} from "@/data/geography";

export type GameMode = "world" | "brazil";
export type Difficulty = "easy" | "medium" | "hard";
export type Continent = "africa" | "america" | "asia" | "europe" | "oceania" | "all";

interface GameQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
  flag?: string;
}

interface GameState {
  mode: GameMode;
  continent: Continent;
  difficulty: Difficulty;
  timerEnabled: boolean;
  timeRemaining: number;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  streak: number;
  questions: GameQuestion[];
  isPlaying: boolean;
  isFinished: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

const QUESTIONS_PER_GAME = 10;
const DIFFICULTY_OPTIONS: Record<Difficulty, number> = {
  easy: 2,
  medium: 4,
  hard: 6,
};
const TIME_PER_QUESTION: Record<Difficulty, number> = {
  easy: 15,
  medium: 10,
  hard: 7,
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateQuestions(
  mode: GameMode,
  continent: Continent,
  difficulty: Difficulty
): GameQuestion[] {
  const numOptions = DIFFICULTY_OPTIONS[difficulty];
  let items: { question: string; answer: string; flag?: string }[] = [];

  if (mode === "world") {
    const countries = getCountriesByContinent(continent);
    items = countries.map((c) => ({
      question: c.name,
      answer: c.capital,
      flag: c.flag,
    }));
  } else {
    items = brazilianStates.map((s) => ({
      question: s.name,
      answer: s.capital,
      flag: "🇧🇷",
    }));
  }

  const shuffledItems = shuffleArray(items);
  const selectedItems = shuffledItems.slice(0, QUESTIONS_PER_GAME);
  const allAnswers = items.map((i) => i.answer);

  return selectedItems.map((item) => {
    const wrongAnswers = shuffleArray(
      allAnswers.filter((a) => a !== item.answer)
    ).slice(0, numOptions - 1);

    const options = shuffleArray([item.answer, ...wrongAnswers]);

    return {
      question: item.question,
      correctAnswer: item.answer,
      options,
      flag: item.flag,
    };
  });
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    mode: "world",
    continent: "all",
    difficulty: "medium",
    timerEnabled: true,
    timeRemaining: TIME_PER_QUESTION.medium,
    currentQuestion: 0,
    totalQuestions: QUESTIONS_PER_GAME,
    score: 0,
    streak: 0,
    questions: [],
    isPlaying: false,
    isFinished: false,
    selectedAnswer: null,
    isCorrect: null,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (!state.timerEnabled) return;

    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 1) {
          // Time's up - auto answer wrong
          return {
            ...prev,
            timeRemaining: 0,
            selectedAnswer: "",
            isCorrect: false,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  }, [state.timerEnabled, clearTimer]);

  useEffect(() => {
    if (state.isPlaying && !state.selectedAnswer && state.timerEnabled) {
      startTimer();
    }
    return clearTimer;
  }, [state.isPlaying, state.currentQuestion, state.selectedAnswer, startTimer, clearTimer]);

  const setMode = useCallback((mode: GameMode) => {
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const setContinent = useCallback((continent: Continent) => {
    setState((prev) => ({ ...prev, continent }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState((prev) => ({ ...prev, difficulty }));
  }, []);

  const setTimerEnabled = useCallback((timerEnabled: boolean) => {
    setState((prev) => ({ ...prev, timerEnabled }));
  }, []);

  const startGame = useCallback(() => {
    const questions = generateQuestions(
      state.mode,
      state.continent,
      state.difficulty
    );
    setState((prev) => ({
      ...prev,
      questions,
      currentQuestion: 0,
      score: 0,
      streak: 0,
      isPlaying: true,
      isFinished: false,
      selectedAnswer: null,
      isCorrect: null,
      timeRemaining: TIME_PER_QUESTION[prev.difficulty],
    }));
  }, [state.mode, state.continent, state.difficulty]);

  const answerQuestion = useCallback((answer: string) => {
    setState((prev) => {
      if (prev.selectedAnswer !== null) return prev;

      const currentQ = prev.questions[prev.currentQuestion];
      const isCorrect = answer === currentQ.correctAnswer;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const streakBonus = isCorrect && prev.streak >= 2 ? prev.streak * 10 : 0;
      const basePoints = isCorrect ? 100 : 0;
      const timeBonus =
        isCorrect && prev.timerEnabled
          ? Math.floor(prev.timeRemaining * 5)
          : 0;

      return {
        ...prev,
        selectedAnswer: answer,
        isCorrect,
        score: prev.score + basePoints + streakBonus + timeBonus,
        streak: newStreak,
      };
    });
    clearTimer();
  }, [clearTimer]);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentQuestion + 1;
      if (nextIndex >= prev.totalQuestions) {
        return { ...prev, isFinished: true, isPlaying: false };
      }
      return {
        ...prev,
        currentQuestion: nextIndex,
        selectedAnswer: null,
        isCorrect: null,
        timeRemaining: TIME_PER_QUESTION[prev.difficulty],
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isFinished: false,
      currentQuestion: 0,
      score: 0,
      streak: 0,
      questions: [],
      selectedAnswer: null,
      isCorrect: null,
    }));
  }, [clearTimer]);

  const currentQuestionData = state.questions[state.currentQuestion];

  return {
    ...state,
    currentQuestionData,
    currentQuestionIndex: state.currentQuestion,
    setMode,
    setContinent,
    setDifficulty,
    setTimerEnabled,
    startGame,
    answerQuestion,
    nextQuestion,
    resetGame,
  };
}
