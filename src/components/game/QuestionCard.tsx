import { useEffect, useState } from "react";

interface QuestionCardProps {
  question: string;
  flag?: string;
  correctAnswer: string;
  options: string[];
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export function QuestionCard({
  question,
  flag,
  correctAnswer,
  options,
  selectedAnswer,
  isCorrect,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const timer = setTimeout(() => setShowNext(true), 800);
      return () => clearTimeout(timer);
    }
    setShowNext(false);
  }, [selectedAnswer]);

  const getOptionClass = (option: string) => {
    if (selectedAnswer === null) return "option-btn";
    
    if (option === correctAnswer) {
      return "option-btn correct";
    }
    
    if (option === selectedAnswer && !isCorrect) {
      return "option-btn incorrect";
    }
    
    return "option-btn opacity-50";
  };

  return (
    <div className="game-card p-6 md:p-8 animate-scale-in">
      {/* Question */}
      <div className="text-center mb-8">
        <div className="floating-emoji text-6xl md:text-7xl mb-4">{flag}</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Qual é a capital de
        </h2>
        <p className="font-display text-3xl md:text-4xl font-bold title-gradient mt-2">
          {question}?
        </p>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={selectedAnswer !== null}
            className={getOptionClass(option)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-lg">{option}</span>
          </button>
        ))}
      </div>

      {/* Feedback & Next button */}
      {selectedAnswer !== null && (
        <div className="text-center animate-fade-in">
          {isCorrect ? (
            <p className="text-success text-xl font-semibold mb-4">
              ✨ Correto! +100 pontos
            </p>
          ) : (
            <p className="text-destructive text-xl font-semibold mb-4">
              ❌ A resposta correta era: <span className="text-foreground">{correctAnswer}</span>
            </p>
          )}

          {showNext && (
            <button onClick={onNext} className="btn-game animate-scale-in">
              Próxima Pergunta →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
