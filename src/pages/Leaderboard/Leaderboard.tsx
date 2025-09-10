"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./leaderboard.css"

const Leaderboard: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState("leaderboard")

  const navigator = (item: string) => {
    setActiveNavItem(item)
    console.log(`[v0] Navigating to: ${item}`)
    // Aqui futuramente pode entrar sua lógica de rotas
  }

  // Exemplo de ranking estático
  const ranking = [
    { id: 1, name: "Alice", xp: 120, avatar: "👩" },
    { id: 2, name: "Bruno", xp: 95, avatar: "🧑" },
    { id: 3, name: "Carla", xp: 80, avatar: "👩‍🦱" },
    { id: 4, name: "Daniel", xp: 60, avatar: "👨" },
    { id: 5, name: "Você", xp: 40, avatar: "🙂" },
  ]

  return (
    <div className="app-container">
      <Sidebar activeItem={activeNavItem} onNavigate={navigator} />

      {/* Conteúdo principal */}
      <div className="main-content">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
          <p>Veja sua posição no ranking semanal!</p>
        </div>

        <div className="leaderboard-list">
          {ranking.map((user, index) => (
            <div
              key={user.id}
              className={`leaderboard-item ${user.name === "Você" ? "me" : ""}`}
            >
              <span className="position">#{index + 1}</span>
              <span className="avatar">{user.avatar}</span>
              <span className="name">{user.name}</span>
              <span className="xp">{user.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar direita */}
      <div className="right-sidebar">
        <div className="widget">
          <div className="widget-header">
            <h3>Status</h3>
          </div>
          <div className="widget-content">
            <p>Escolha seu status futuramente...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
