import { Play, Globe, MapPin, Info } from "lucide-react";
import { GameMode, Difficulty, Continent } from "@/hooks/useGameState";
import { continentNames } from "@/data/geography";

interface StartScreenProps {
  mode: GameMode;
  continent: Continent;
  difficulty: Difficulty;
  onStart: () => void;
}

export function StartScreen({ mode, continent, difficulty, onStart }: StartScreenProps) {
  const difficultyLabels: Record<Difficulty, string> = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  };

  const difficultyDescriptions: Record<Difficulty, string> = {
    easy: "2 opções por pergunta",
    medium: "4 opções por pergunta",
    hard: "6 opções por pergunta",
  };

  return (
    <div className="game-card p-8 text-center max-w-lg mx-auto animate-scale-in">
      {/* Icon */}
      <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
        {mode === "world" ? (
          <Globe className="h-10 w-10 text-primary-foreground" />
        ) : (
          <MapPin className="h-10 w-10 text-primary-foreground" />
        )}
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl font-bold mb-2">
        {mode === "world" ? "Modo Mundo" : "Modo Brasil"}
      </h2>
      <p className="text-muted-foreground mb-6">
        {mode === "world"
          ? `Países e capitais - ${continentNames[continent]}`
          : "Estados e capitais do Brasil"}
      </p>

      {/* Game info */}
      <div className="glass-panel p-4 mb-6 text-left space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">10 perguntas</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-xs">
            {difficulty === "easy" ? "F" : difficulty === "medium" ? "M" : "D"}
          </span>
          <span className="text-muted-foreground">
            {difficultyLabels[difficulty]} - {difficultyDescriptions[difficulty]}
          </span>
        </div>
      </div>

      {/* Start button */}
      <button onClick={onStart} className="btn-game w-full flex items-center justify-center gap-2">
        <Play className="h-5 w-5" />
        Começar Jogo
      </button>
    </div>
  );
}
