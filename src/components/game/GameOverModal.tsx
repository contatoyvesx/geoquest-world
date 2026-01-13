import { Trophy, RotateCcw, Home, Star } from "lucide-react";
import { useEffect } from "react";
import { GameMode, Difficulty, Continent } from "@/hooks/useGameState";
import { continentNames } from "@/data/geography";

interface GameOverModalProps {
  score: number;
  correctAnswers: number;
  mode: GameMode;
  continent: Continent;
  difficulty: Difficulty;
  totalQuestions: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onSaveScore: () => void;
}

export function GameOverModal({
  score,
  correctAnswers,
  mode,
  continent,
  difficulty,
  totalQuestions,
  onPlayAgain,
  onGoHome,
  onSaveScore,
}: GameOverModalProps) {
  useEffect(() => {
    onSaveScore();
  }, [onSaveScore]);

  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const getMessage = () => {
    if (accuracy >= 90) return { emoji: "🏆", text: "Incrível!" };
    if (accuracy >= 70) return { emoji: "🌟", text: "Muito bem!" };
    if (accuracy >= 50) return { emoji: "👏", text: "Bom trabalho!" };
    return { emoji: "💪", text: "Continue praticando!" };
  };

  const { emoji, text } = getMessage();

  const difficultyLabels: Record<Difficulty, string> = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="game-card max-w-md w-full p-8 text-center animate-scale-in">
        {/* Trophy icon */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-secondary opacity-20 animate-pulse-glow" />
          <div className="relative flex items-center justify-center w-full h-full">
            <span className="text-6xl">{emoji}</span>
          </div>
        </div>

        {/* Message */}
        <h2 className="font-display text-3xl font-bold mb-2">{text}</h2>
        <p className="text-muted-foreground mb-6">Fim de jogo!</p>

        {/* Score display */}
        <div className="glass-panel p-6 mb-6">
          <p className="text-muted-foreground text-sm mb-2">Sua pontuação</p>
          <p className="score-display">{score}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.ceil(accuracy / 20)
                    ? "text-accent fill-accent"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="glass-panel px-3 py-1">
              Acertos {correctAnswers}/{totalQuestions}
            </span>
            <span className="glass-panel px-3 py-1">Precisão {accuracy}%</span>
          </div>
        </div>

        {/* Game info */}
        <div className="flex justify-center gap-4 mb-6 text-sm text-muted-foreground">
          <span className="glass-panel px-3 py-1">
            {mode === "world" ? "🌍 " + continentNames[continent] : "🇧🇷 Brasil"}
          </span>
          <span className="glass-panel px-3 py-1">
            {difficultyLabels[difficulty]}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onGoHome}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-3 font-medium transition-all hover:bg-muted"
          >
            <Home className="h-5 w-5" />
            Menu
          </button>
          <button onClick={onPlayAgain} className="flex-1 btn-game flex items-center justify-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
}
