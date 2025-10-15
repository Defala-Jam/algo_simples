"use client"

import React, { useState } from "react"
import "./LessonTemplate.css"

interface LessonData {
  title: string
  question: string
  alternatives: string[]
  correctAnswer: number
  explanation?: string
}

interface LessonTemplateProps {
  lessonData: LessonData
  onComplete: () => void
  onExit: () => void
  onIncorrect: () => void
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  lessonData,
  onComplete,
  onExit,
  onIncorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleAnswerSelect = (index: number) => {
    if (!isSubmitted) setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setIsSubmitted(true)

    const correct = selectedAnswer === lessonData.correctAnswer
    setIsCorrect(correct)

    // ⏳ Aguarda 3 segundos mostrando explicação antes de ir para a próxima
    setTimeout(() => {
      if (correct) onComplete()
      else onIncorrect()
      // ❌ NÃO resetamos isSubmitted aqui — o LessonsPage faz isso ao mudar de pergunta
      setSelectedAnswer(null)
      setIsCorrect(null)
    }, 3000)
  }

  return (
    <div className="lesson-container">
      {/* Lado esquerdo — título */}
      <div className="lesson-left">
        <div className="lesson-header">
          <button className="lesson-exit" onClick={onExit}>
            ✕
          </button>
          <h1 className="lesson-title">{lessonData.title}</h1>
        </div>
      </div>

      {/* Lado direito — pergunta e alternativas */}
      <div className="lesson-right">
        <div className="question-container">
          <h2 className="question-title">{lessonData.question}</h2>

          <div className="alternatives-list">
            {lessonData.alternatives.map((alt, i) => (
              <button
                key={i}
                className={`alternative-button ${
                  selectedAnswer === i ? "selected" : ""
                } ${
                  isSubmitted
                    ? i === lessonData.correctAnswer
                      ? "correct"
                      : selectedAnswer === i
                      ? "incorrect"
                      : ""
                    : ""
                }`}
                onClick={() => handleAnswerSelect(i)}
                disabled={isSubmitted}
              >
                <span className="alternative-letter">{String.fromCharCode(65 + i)}</span>
                <span className="alternative-text">{alt}</span>
              </button>
            ))}
          </div>

          {isSubmitted && (
            <>
              <div
                className={`feedback ${
                  isCorrect ? "correct-feedback" : "incorrect-feedback"
                }`}
              >
                {isCorrect ? "🎉 Parabéns! Resposta correta!" : "💭 Resposta incorreta!"}
              </div>

              {lessonData.explanation && (
                <div className="explanation-box">
                  <h3>🧩 Explicação:</h3>
                  <p>{lessonData.explanation}</p>
                </div>
              )}
            </>
          )}

          <div className="action-buttons">
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitted}
            >
              Confirmar Resposta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonTemplate
