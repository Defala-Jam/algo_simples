"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Perfil.css"

interface PerfilProps {
  onNavigate?: (section: string) => void
}

const Perfil: React.FC<PerfilProps> = ({ onNavigate }) => {
  const [activeItem, setActiveItem] = useState("profile")

  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [selectedBackground, setSelectedBackground] = useState(0)

  const avatarPresets = [
    { id: 0, name: "Default", emoji: "👤" },
    { id: 1, name: "Coder", emoji: "👨‍💻" },
    { id: 2, name: "Student", emoji: "🎓" },
    { id: 3, name: "Ninja", emoji: "🥷" },
    { id: 4, name: "Robot", emoji: "🤖" },
    { id: 5, name: "Wizard", emoji: "🧙‍♂️" },
  ]

  const backgroundPresets = [
    { id: 0, name: "Default", gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" },
    { id: 1, name: "Ocean", gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)" },
    { id: 2, name: "Forest", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
    { id: 3, name: "Sunset", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
    { id: 4, name: "Purple", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" },
    { id: 5, name: "Night", gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" },
  ]

  const badges = [
    {
      id: 1,
      name: "Basic Profile",
      description: "Added bio to profile",
      progress: "0/3",
      icon: "❓",
      completed: false,
    },
    { id: 2, name: "The Start", description: "Solved 3 coding problems", progress: "1/5", icon: "💡", completed: true },
    {
      id: 3,
      name: "Daily Coder",
      description: "Maintained a 3-day streak",
      progress: "0/5",
      icon: "❓",
      completed: false,
    },
  ]

  const userStats = {
    averageResponseTime: "2.3s",
    correctAnswers: 47,
    totalQuestions: 52,
    leaderboardPosition: 12,
  }

  const navigator = (item: string) => {
    console.log(`[v0] Navigating to: ${item}`)
    setActiveItem(item)
    onNavigate?.(item)
  }

  return (
    <div className="perfil-layout">
      <Sidebar activeItem={activeItem} onNavigate={navigator} />

      <div className="perfil-main">
        <div className="stats-header">
          <div className="stat-item">
            <div className="stat-icon green">🔥</div>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon orange">💎</div>
            <span className="stat-value">17</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon purple">⚡</div>
            <span className="stat-value">5</span>
          </div>
        </div>

        <div className="perfil-content">
          <div className="perfil-header" style={{ background: backgroundPresets[selectedBackground].gradient }}>
            <div className="avatar-silhouette">
              <div className="avatar-display">{avatarPresets[selectedAvatar].emoji}</div>
            </div>
            <button className="edit-button">✏️</button>
          </div>

          <div className="user-info-section">
            <h1 className="username">defalaplay</h1>
            <p className="user-subtitle">Add title</p>
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon-large">🔥</div>
              <div className="stat-info">
                <div className="stat-number">0</div>
                <div className="stat-label">Streak</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-large">⚡</div>
              <div className="stat-info">
                <div className="stat-number">175</div>
                <div className="stat-label">Total XP</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-large">🏆</div>
              <div className="stat-info">
                <div className="stat-number">Starter</div>
                <div className="stat-label">Current league</div>
              </div>
            </div>
          </div>

          <div className="badges-section">
            <h2 className="section-title">Badges</h2>
            <div className="badges-list">
              {badges.map((badge) => (
                <div key={badge.id} className={`badge-item ${badge.completed ? "completed" : ""}`}>
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-info">
                    <h3 className="badge-name">{badge.name}</h3>
                    <p className="badge-description">{badge.description}</p>
                  </div>
                  <div className="badge-progress">{badge.progress}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="customization-section">
            <div className="customization-group">
              <h3 className="customization-title">Choose Avatar</h3>
              <div className="avatar-presets">
                {avatarPresets.map((avatar) => (
                  <button
                    key={avatar.id}
                    className={`avatar-preset ${selectedAvatar === avatar.id ? "selected" : ""}`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    title={avatar.name}
                  >
                    <span className="preset-emoji">{avatar.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="customization-group">
              <h3 className="customization-title">Background Theme</h3>
              <div className="background-presets">
                {backgroundPresets.map((bg) => (
                  <button
                    key={bg.id}
                    className={`background-preset ${selectedBackground === bg.id ? "selected" : ""}`}
                    onClick={() => setSelectedBackground(bg.id)}
                    style={{ background: bg.gradient }}
                    title={bg.name}
                  >
                    <span className="preset-name">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> 

 

      <div className="perfil-right-sidebar">
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💎</span>
            <span className="stat-value">17</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">5</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="action-btn">Practice Weak Areas</button>
          <button className="action-btn">Review Mistakes</button>
          <button className="action-btn">Take Quiz</button>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
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
  )
}

export default Perfil
