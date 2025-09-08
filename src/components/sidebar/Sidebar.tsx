"use client"

import type React from "react"
import "./Sidebar.css"

interface SidebarProps {
  activeItem: string
  onNavigate: (item: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  const navItems = [
    { id: "journey", label: "Journey", icon: "📖" },
    { id: "daily-challenge", label: "Daily Challenge", icon: "⚡" },
    { id: "goals", label: "Goals", icon: "🎯" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { id: "store", label: "Store", icon: "🏪" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "more", label: "More", icon: "⋯" },
  ]

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">{"</>"}</div>
        <span className="logo-text">CodePath</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
