import { Globe } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";
import { useRanking } from "@/hooks/useRanking";
import { GameHeader } from "@/components/game/GameHeader";
import { QuestionCard } from "@/components/game/QuestionCard";
import { StartScreen } from "@/components/game/StartScreen";
import { GameOverModal } from "@/components/game/GameOverModal";
import { RankingPanel } from "@/components/game/RankingPanel";

const Index = () => {
  const game = useGameState();
  const { addScore } = useRanking();

  const handleSaveScore = () => {
    addScore({
      score: game.score,
      mode: game.mode,
      continent: game.mode === "world" ? game.continent : undefined,
      difficulty: game.difficulty,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Logo */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Globe className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold title-gradient">
              GEOGRAFIA
            </h1>
          </div>
          <p className="text-muted-foreground">Teste seus conhecimentos geográficos!</p>
        </div>

        {/* Game Header */}
        <GameHeader
          mode={game.mode}
          continent={game.continent}
          difficulty={game.difficulty}
          timerEnabled={game.timerEnabled}
          streak={game.streak}
          score={game.score}
          timeRemaining={game.timeRemaining}
          currentQuestion={game.currentQuestionIndex}
          totalQuestions={game.totalQuestions}
          isPlaying={game.isPlaying}
          onModeChange={game.setMode}
          onContinentChange={game.setContinent}
          onDifficultyChange={game.setDifficulty}
          onTimerToggle={game.setTimerEnabled}
        />

        {/* Main game area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {!game.isPlaying && !game.isFinished && (
              <StartScreen
                mode={game.mode}
                continent={game.continent}
                difficulty={game.difficulty}
                onStart={game.startGame}
              />
            )}

            {game.isPlaying && game.currentQuestionData && (
              <QuestionCard
                question={game.currentQuestionData.question}
                flag={game.currentQuestionData.flag}
                correctAnswer={game.currentQuestionData.correctAnswer}
                options={game.currentQuestionData.options}
                selectedAnswer={game.selectedAnswer}
                isCorrect={game.isCorrect}
                onAnswer={game.answerQuestion}
                onNext={game.nextQuestion}
              />
            )}
          </div>

          {/* Ranking sidebar */}
          <div className="hidden lg:block">
            <RankingPanel
              currentMode={game.mode}
              currentContinent={game.continent}
              currentDifficulty={game.difficulty}
            />
          </div>
        </div>

        {/* Mobile ranking (below game) */}
        <div className="lg:hidden">
          <RankingPanel
            currentMode={game.mode}
            currentContinent={game.continent}
            currentDifficulty={game.difficulty}
          />
        </div>

        {/* Game Over Modal */}
        {game.isFinished && (
          <GameOverModal
            score={game.score}
            mode={game.mode}
            continent={game.continent}
            difficulty={game.difficulty}
            totalQuestions={game.totalQuestions}
            onPlayAgain={game.startGame}
            onGoHome={game.resetGame}
            onSaveScore={handleSaveScore}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
