import { useState, useCallback, useEffect, useRef } from "react";
import { getCountriesByContinent, brazilianStates } from "@/data/geography";

export type GameMode = "world" | "brazil";
export type Difficulty = "easy" | "medium" | "hard";
export type Continent = "africa" | "america" | "asia" | "europe" | "oceania" | "all";

interface GameQuestion {
  prompt: string;
  question: string;
  correctAnswer: string;
  options: string[];
  flag?: string;
}

export interface ScoreBreakdown {
  total: number;
  base: number;
  difficulty: number;
  time: number;
  streak: number;
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
  correctAnswers: number;
  streak: number;
  questions: GameQuestion[];
  isPlaying: boolean;
  isFinished: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  lastScore: ScoreBreakdown | null;
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
const DIFFICULTY_MULTIPLIER: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.2,
  hard: 1.4,
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
  const allQuestions = items.map((i) => i.question);

  return selectedItems.map((item) => {
    const useReverse = Math.random() < 0.35;
    const prompt = useReverse
      ? mode === "world"
        ? "Qual país tem a capital"
        : "De qual estado é a capital"
      : "Qual é a capital de";
    const correctAnswer = useReverse ? item.question : item.answer;
    const optionPool = useReverse ? allQuestions : allAnswers;
    const wrongAnswers = shuffleArray(
      optionPool.filter((a) => a !== correctAnswer)
    ).slice(0, numOptions - 1);
    const options = shuffleArray([correctAnswer, ...wrongAnswers]);
    return {
      prompt,
      question: useReverse ? item.answer : item.question,
      correctAnswer,
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
    correctAnswers: 0,
    streak: 0,
    questions: [],
    isPlaying: false,
    isFinished: false,
    selectedAnswer: null,
    isCorrect: null,
    lastScore: null,
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
            lastScore: {
              total: 0,
              base: 0,
              difficulty: 0,
              time: 0,
              streak: 0,
            },
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
      correctAnswers: 0,
      streak: 0,
      isPlaying: true,
      isFinished: false,
      selectedAnswer: null,
      isCorrect: null,
      lastScore: null,
      timeRemaining: TIME_PER_QUESTION[prev.difficulty],
    }));
  }, [state.mode, state.continent, state.difficulty]);

  const answerQuestion = useCallback((answer: string) => {
    setState((prev) => {
      if (prev.selectedAnswer !== null) return prev;

      const isCorrect = answer === prev.questions[prev.currentQuestion].correctAnswer;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const basePoints = 100;
      const difficultyBonus = isCorrect
        ? Math.round(basePoints * (DIFFICULTY_MULTIPLIER[prev.difficulty] - 1))
        : 0;
      const timeBonus =
        isCorrect && prev.timerEnabled
          ? Math.floor(
              (prev.timeRemaining / TIME_PER_QUESTION[prev.difficulty]) * 50
            )
          : 0;
      const streakBonus =
        isCorrect && newStreak > 1 ? Math.min(newStreak - 1, 4) * 15 : 0;
      const totalPoints = isCorrect
        ? basePoints + difficultyBonus + timeBonus + streakBonus
        : 0;

      return {
        ...prev,
        selectedAnswer: answer,
        isCorrect,
        score: prev.score + totalPoints,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        streak: newStreak,
        lastScore: {
          total: totalPoints,
          base: isCorrect ? basePoints : 0,
          difficulty: difficultyBonus,
          time: timeBonus,
          streak: streakBonus,
        },
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
        lastScore: null,
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
      correctAnswers: 0,
      streak: 0,
      questions: [],
      selectedAnswer: null,
      isCorrect: null,
      lastScore: null,
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
