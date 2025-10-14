"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Task from "../../components/Task/Task"
import Lesson from "../../components/lession/Lession"
import "./path_player.css"

const Path_player: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState("journey")
  const [isTaskOpen, setIsTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isLessonActive, setIsLessonActive] = useState(false)

  // Novos estados para pop-ups
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  // Campos e mensagens para login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Campos e mensagens para cadastro
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerError, setRegisterError] = useState("")

  // Usuário logado
  const user = JSON.parse(localStorage.getItem("user") || "null")

  // Função de login
  const handleLogin = async () => {
    setLoginError("")
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erro no login")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("✅ Login realizado com sucesso!")
      setShowLogin(false)
      window.location.reload()
    } catch (err: any) {
      setLoginError(err.message)
    }
  }

  // Função de cadastro
  const handleRegister = async () => {
    setRegisterError("")
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erro no cadastro")

      alert("✅ Cadastro realizado com sucesso!")
      setShowRegister(false)
      setShowLogin(true)
    } catch (err: any) {
      setRegisterError(err.message)
    }
  }

  const navigator = (item: string) => {
    setActiveNavItem(item)
    console.log(`[v0] Navegando para: ${item}`)
  }

  // Dados da tarefa
  const taskData = {
    icon: "🧠",
    title: "Introdução aos Algoritmos de Ordenação",
    description:
      "Entenda o que são os algoritmos de ordenação e como eles organizam dados de forma eficiente.",
    difficulty: "Iniciante",
    xp: 10,
    progress: 45,
    learningPoints: [
      "Conceito de algoritmos de ordenação",
      "Diferença entre Bubble, Merge e Quick Sort",
      "Quando utilizar cada algoritmo",
      "Exemplo prático de ordenação em JavaScript",
    ],
  }

  const handleNodeClick = () => {
    setSelectedTask(taskData)
    setIsTaskOpen(true)
  }

  const handleCloseTask = () => {
    setIsTaskOpen(false)
    setSelectedTask(null)
  }

  const handleStartLesson = () => {
    console.log("[v0] Iniciando lição...")
    setIsLessonActive(true)
    handleCloseTask()
  }

  const handleExitLesson = () => setIsLessonActive(false)
  const handleLessonComplete = () => setIsLessonActive(false)

  // Dados da lição
  const lessonData = {
    title: "Fundamentos dos Algoritmos de Ordenação",
    content:
      "Os algoritmos de ordenação são métodos utilizados para organizar dados em uma determinada ordem — geralmente crescente ou decrescente.",
    explanation:
      "O Bubble Sort troca repetidamente elementos adjacentes se estiverem na ordem errada. O Merge Sort divide a lista em partes e as une novamente em ordem. O Quick Sort escolhe um pivô e particiona os elementos ao redor dele.",
    question: "Qual das afirmações abaixo é VERDADEIRA sobre os algoritmos de ordenação?",
    alternatives: [
      "O Merge Sort tem uma complexidade de tempo pior que o Bubble Sort.",
      "O Quick Sort utiliza a técnica de dividir-para-conquistar.",
      "O Bubble Sort é mais rápido que o Quick Sort para grandes conjuntos de dados.",
      "Todos os algoritmos de ordenação funcionam em tempo constante.",
    ],
    correctAnswer: 1,
  }

  if (isLessonActive) {
    return (
      <Lesson
        lessonData={lessonData}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
      />
    )
  }

  return (
    <div className="app-container">
      <Sidebar activeItem={activeNavItem} onNavigate={navigator} />

      {/* Conteúdo Principal */}
      <div className="main-content">
        <div className="content-header">
          <button className="back-button">←</button>
          <div className="header-info">
            <h2>Seção 1, Capítulo 1</h2>
            <p>Fundamentos dos Algoritmos de Ordenação</p>
          </div>
        </div>

        <div className="learning-path">
          <div className="path-title">Fundamentos dos Algoritmos de Ordenação</div>
          <div className="path-nodes">
            <div className="path-node completed" onClick={handleNodeClick}>
              <div className="node-circle">
                <span className="checkmark">✓</span>
              </div>
            </div>
            <div className="path-connector"></div>
            <div className="path-node completed" onClick={handleNodeClick}>
              <div className="node-circle">
                <span className="checkmark">✓</span>
              </div>
            </div>
            <div className="path-connector"></div>
            <div className="path-node completed" onClick={handleNodeClick}>
              <div className="node-circle">
                <span className="checkmark">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Lateral Direita */}
      <div className="right-sidebar">
        {/* Estatísticas */}
        <div className="stats">
          <div className="stat-item green">
            <span className="stat-icon">🔥</span>
            <span className="stat-number">0</span>
          </div>
          <div className="stat-item orange">
            <span className="stat-icon">💎</span>
            <span className="stat-number">{user?.diamonds ?? 17}</span>
          </div>
          <div className="stat-item purple">
            <span className="stat-icon">⚡</span>
            <span className="stat-number">{user?.xp ?? 5}</span>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="widget">
          <div className="widget-header">
            <h3>Ações Rápidas</h3>
          </div>
          <div className="widget-content">
            <button className="action-btn">Praticar Áreas Fracas</button>
            <button className="action-btn">Revisar Erros</button>
            <button className="action-btn">Fazer Quiz</button>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="widget">
          <div className="widget-header">
            <h3>Atividades Recentes</h3>
          </div>
          <div className="widget-content">
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-text">
                  <div>Quiz de Bubble Sort</div>
                  <div className="activity-time">há 2 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📚</div>
                <div className="activity-text">
                  <div>Lição de Merge Sort</div>
                  <div className="activity-time">há 1 dia</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🎯</div>
                <div className="activity-text">
                  <div>Desafio de Quick Sort</div>
                  <div className="activity-time">há 3 dias</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget de Login/Cadastro OU Perfil */}
        {/* Login/Cadastro */}
        {!user && (
          <div className="widget login-widget">
            <div className="widget-header">
              <h3>Crie seu perfil e salve seu progresso!</h3>
            </div>
            <div className="widget-content">
              <button className="login-btn create-btn" onClick={() => setShowRegister(true)}>
                Criar Conta
              </button>
              <button className="login-btn login-btn-alt" onClick={() => setShowLogin(true)}>
                Entrar
              </button>
            </div>
          </div>
        )}

      </div>

      {/* POP-UP DE LOGIN */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowLogin(false)}>✕</button>
            <h2>Entrar</h2>
            <input
              type="email"
              placeholder="E-mail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <button className="confirm-btn-jorney" onClick={handleLogin}>Entrar</button>
            <p className="modal-text">
              Não tem conta?{" "}
              <span onClick={() => { setShowLogin(false); setShowRegister(true); }}>Crie uma!</span>
            </p>
          </div>
        </div>
      )}

      {/* POP-UP DE CADASTRO */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowRegister(false)}>✕</button>
            <h2>Criar Conta</h2>
            <input
              type="text"
              placeholder="Nome"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            {registerError && <p style={{ color: "red" }}>{registerError}</p>}
            <button className="confirm-btn-jorney" onClick={handleRegister}>Cadastrar</button>
            <p className="modal-text">
              Já tem uma conta?{" "}
              <span onClick={() => { setShowRegister(false); setShowLogin(true); }}>Entrar</span>
            </p>
          </div>
        </div>
      )}

      {/* Modal da Tarefa */}
      {selectedTask && (
        <Task
          isOpen={isTaskOpen}
          onClose={handleCloseTask}
          taskData={selectedTask}
          onStartLesson={handleStartLesson}
        />
      )}
    </div>
  )
}

export default Path_player
