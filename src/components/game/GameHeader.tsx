import { Globe, MapPin, Timer, TimerOff, Flame } from "lucide-react";
import { GameMode, Difficulty, Continent } from "@/hooks/useGameState";
import { continentNames } from "@/data/geography";

interface GameHeaderProps {
  mode: GameMode;
  continent: Continent;
  difficulty: Difficulty;
  timerEnabled: boolean;
  streak: number;
  score: number;
  timeRemaining: number;
  currentQuestion: number;
  totalQuestions: number;
  isPlaying: boolean;
  onModeChange: (mode: GameMode) => void;
  onContinentChange: (continent: Continent) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onTimerToggle: (enabled: boolean) => void;
}

export function GameHeader({
  mode,
  continent,
  difficulty,
  timerEnabled,
  streak,
  score,
  timeRemaining,
  currentQuestion,
  totalQuestions,
  isPlaying,
  onModeChange,
  onContinentChange,
  onDifficultyChange,
  onTimerToggle,
}: GameHeaderProps) {
  const continentOptions: Continent[] = ["all", "africa", "america", "asia", "europe", "oceania"];
  const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

  const difficultyLabels: Record<Difficulty, string> = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  };

  return (
    <div className="w-full space-y-4">
      {/* Top bar with score and streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Score */}
          <div className="glass-panel px-4 py-2">
            <span className="text-muted-foreground text-sm">Pontos</span>
            <p className="font-display text-2xl font-bold text-primary">{score}</p>
          </div>

          {/* Streak */}
          {streak >= 2 && (
            <div className="streak-badge animate-scale-in">
              <Flame className="h-4 w-4" />
              <span>{streak}x</span>
            </div>
          )}
        </div>

        {/* Timer */}
        {isPlaying && timerEnabled && (
          <div className="glass-panel px-4 py-2 flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <span
              className={`font-display text-2xl font-bold ${
                timeRemaining <= 3 ? "text-destructive" : "text-foreground"
              }`}
            >
              {timeRemaining}s
            </span>
          </div>
        )}

        {/* Progress */}
        {isPlaying && (
          <div className="glass-panel px-4 py-2">
            <span className="text-muted-foreground text-sm">Progresso</span>
            <p className="font-display text-lg font-semibold">
              {currentQuestion + 1}/{totalQuestions}
            </p>
          </div>
        )}
      </div>

      {/* Settings row (only when not playing) */}
      {!isPlaying && (
        <div className="flex flex-wrap items-center gap-3 animate-fade-in">
          {/* Mode selector */}
          <div className="flex rounded-xl overflow-hidden border border-border/50">
            <button
              onClick={() => onModeChange("world")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                mode === "world"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <Globe className="h-4 w-4" />
              Mundo
            </button>
            <button
              onClick={() => onModeChange("brazil")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                mode === "brazil"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <MapPin className="h-4 w-4" />
              Brasil
            </button>
          </div>

          {/* Continent selector (only for world mode) */}
          {mode === "world" && (
            <select
              value={continent}
              onChange={(e) => onContinentChange(e.target.value as Continent)}
              className="rounded-xl border border-border/50 bg-card px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {continentOptions.map((c) => (
                <option key={c} value={c}>
                  {continentNames[c]}
                </option>
              ))}
            </select>
          )}

          {/* Difficulty selector */}
          <div className="flex rounded-xl overflow-hidden border border-border/50">
            {difficultyOptions.map((d) => (
              <button
                key={d}
                onClick={() => onDifficultyChange(d)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  difficulty === d
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {difficultyLabels[d]}
              </button>
            ))}
          </div>

          {/* Timer toggle */}
          <button
            onClick={() => onTimerToggle(!timerEnabled)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              timerEnabled
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border/50 bg-card text-muted-foreground"
            }`}
          >
            {timerEnabled ? (
              <Timer className="h-4 w-4" />
            ) : (
              <TimerOff className="h-4 w-4" />
            )}
            Timer
          </button>
        </div>
      )}

      {/* Progress bar */}
      {isPlaying && (
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
