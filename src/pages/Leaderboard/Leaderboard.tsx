"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./leaderboard.css"

const Leaderboard: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState("leaderboard")

  const navigator = (item: string) => {
    setActiveNavItem(item)
  }

  // Ranking estático
  const ranking = [
    { id: 1, name: "Alice", xp: 120, avatar: "👩" },
    { id: 2, name: "Bruno", xp: 95, avatar: "🧑" },
    { id: 3, name: "Carla", xp: 80, avatar: "👩‍🦱" },
    { id: 4, name: "Daniel", xp: 60, avatar: "👨" },
    { id: 5, name: "Você", xp: 40, avatar: "🙂" },
  ]

  return (
    <div className="leaderboard-layout">
      {/* Sidebar esquerda */}
      <Sidebar activeItem={activeNavItem} onNavigate={navigator} />

      {/* Conteúdo principal */}
      <div className="leaderboard-main">
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

      {/* Sidebar direita estilo path_player */}
      <div className="right-sidebar">
        {/* Stats */}
        <div className="stats">
          <div className="stat-item green">
            <span className="stat-icon">🔥</span>
            <span className="stat-number">0</span>
          </div>
          <div className="stat-item orange">
            <span className="stat-icon">💎</span>
            <span className="stat-number">17</span>
          </div>
          <div className="stat-item purple">
            <span className="stat-icon">⚡</span>
            <span className="stat-number">5</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="widget">
          <div className="widget-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="widget-content">
            <button className="action-btn">Practice Weak Areas</button>
            <button className="action-btn">Review Mistakes</button>
            <button className="action-btn">Take Quiz</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="widget">
          <div className="widget-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="widget-content">
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-text">
                  <div>Bubble Sort Quiz</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📚</div>
                <div className="activity-text">
                  <div>Merge Sort Lesson</div>
                  <div className="activity-time">1 day ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🎯</div>
                <div className="activity-text">
                  <div>Quick Sort Challenge</div>
                  <div className="activity-time">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
