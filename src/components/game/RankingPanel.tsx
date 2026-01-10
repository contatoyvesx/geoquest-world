import { Trophy, Medal, Award } from "lucide-react";
import { RankingEntry, useRanking } from "@/hooks/useRanking";
import { continentNames } from "@/data/geography";
import { GameMode, Difficulty, Continent } from "@/hooks/useGameState";
import { useState } from "react";

interface RankingPanelProps {
  currentMode: GameMode;
  currentContinent: Continent;
  currentDifficulty: Difficulty;
}

export function RankingPanel({
  currentMode,
  currentContinent,
  currentDifficulty,
}: RankingPanelProps) {
  const { getFilteredRankings } = useRanking();
  const [filterMode, setFilterMode] = useState<GameMode | undefined>(currentMode);
  const [filterContinent, setFilterContinent] = useState<Continent | undefined>(
    currentMode === "world" ? currentContinent : undefined
  );
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | undefined>(
    currentDifficulty
  );

  const rankings = getFilteredRankings(filterMode, filterContinent, filterDifficulty);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-accent" />;
    if (index === 1) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (index === 2) return <Award className="h-5 w-5 text-secondary" />;
    return <span className="w-5 text-center text-muted-foreground">{index + 1}</span>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const difficultyLabels: Record<Difficulty, string> = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  };

  return (
    <div className="game-card p-6 animate-fade-in">
      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-accent" />
        Ranking
      </h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <select
          value={filterMode || ""}
          onChange={(e) => {
            const val = e.target.value as GameMode | "";
            setFilterMode(val || undefined);
            if (val !== "world") setFilterContinent(undefined);
          }}
          className="rounded-lg border border-border/50 bg-muted px-3 py-1.5 text-sm"
        >
          <option value="">Todos modos</option>
          <option value="world">Mundo</option>
          <option value="brazil">Brasil</option>
        </select>

        {filterMode === "world" && (
          <select
            value={filterContinent || ""}
            onChange={(e) => setFilterContinent((e.target.value as Continent) || undefined)}
            className="rounded-lg border border-border/50 bg-muted px-3 py-1.5 text-sm"
          >
            <option value="">Todos continentes</option>
            {Object.entries(continentNames).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        )}

        <select
          value={filterDifficulty || ""}
          onChange={(e) => setFilterDifficulty((e.target.value as Difficulty) || undefined)}
          className="rounded-lg border border-border/50 bg-muted px-3 py-1.5 text-sm"
        >
          <option value="">Todas dificuldades</option>
          {Object.entries(difficultyLabels).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Ranking list */}
      {rankings.length > 0 ? (
        <div className="space-y-2">
          {rankings.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                index === 0 ? "bg-accent/10 border border-accent/30" : "bg-muted/50"
              }`}
            >
              {getRankIcon(index)}
              <span className="font-display font-bold text-lg flex-1">{entry.score}</span>
              <span className="text-xs text-muted-foreground">
                {entry.mode === "world"
                  ? continentNames[entry.continent || "all"]
                  : "Brasil"}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Nenhum registro ainda. Jogue para entrar no ranking!
        </p>
      )}
    </div>
  );
}
