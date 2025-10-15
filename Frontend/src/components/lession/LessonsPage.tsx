"use client"

import React, { useState, useEffect } from "react"
import LessonTemplate from "./LessonTemplate"
import { lessonsData } from "./lessonsData"

const LessonsPage: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [showSummary, setShowSummary] = useState(false)

  const currentPhase = lessonsData[currentLesson]
  const totalQuestions = currentPhase.questions.length
  const currentQuestionData = currentPhase.questions[currentQuestion]

  useEffect(() => {
    setCurrentQuestion(0)
    setAnswers([])
    setStartTime(Date.now())
    setShowSummary(false)
  }, [currentLesson])

  const handleAnswerComplete = (isCorrect: boolean) => {
    setAnswers((prev) => [...prev, isCorrect])
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setShowSummary(true)
      }
    }, 500)
  }

  const handlePhaseComplete = () => {
    if (currentLesson < lessonsData.length - 1) {
      setCurrentLesson((prev) => prev + 1)
    } else {
      alert("🎉 Você concluiu todas as fases do curso!")
    }
  }

  const handleExit = () => {
    alert("Saindo da fase atual...")
  }

  if (showSummary) {
    const total = answers.length
    const correct = answers.filter((a) => a).length
    const wrong = total - correct
    const timeTaken = Math.round((Date.now() - startTime) / 1000)

    return (
      <div className="summary-container">
        <div className="summary-card">
          <h1>🎉 Fase Concluída!</h1>
          <h2>{currentPhase.title}</h2>

          <p>
            Você respondeu <b>{total}</b> perguntas em <b>{timeTaken}</b> segundos.
          </p>
          <p>
            ✅ Acertos: <b>{correct}</b> &nbsp;&nbsp; ❌ Erros: <b>{wrong}</b>
          </p>

          <button className="continue-button" onClick={handlePhaseComplete}>
            {currentLesson < lessonsData.length - 1
              ? "Avançar para a próxima fase"
              : "Finalizar Jornada"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <LessonTemplate
      key={`${currentLesson}-${currentQuestion}`}
      lessonData={{
        title: `${currentPhase.title} — Pergunta ${currentQuestion + 1}/${totalQuestions}`,
        question: currentQuestionData.question,
        alternatives: currentQuestionData.alternatives,
        correctAnswer: currentQuestionData.correctAnswer,
        explanation: currentQuestionData.explanation,

      }}
      onComplete={() => handleAnswerComplete(true)}
      onIncorrect={() => handleAnswerComplete(false)}
      onExit={handleExit}
    />
  )
}

export default LessonsPage
