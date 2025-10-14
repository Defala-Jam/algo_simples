"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import "./Sidebar.css"

interface SidebarProps {
  activeItem: string
  onNavigate: (item: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  const navigate = useNavigate()

  // Itens do menu lateral
  const navItems = [
    { id: "journey", label: "Jornada de Aprendizado", icon: "📖", path: "/path" },
    { id: "leaderboard", label: "Ranking", icon: "🏆", path: "/leaderboard" },
    { id: "store", label: "Loja", icon: "🏪", path: "/store" },
    { id: "profile", label: "Perfil", icon: "👤", path: "/profile" },
    { id: "more", label: "Mais", icon: "⋯", path: "/more" },
  ]

  return (
    <div className="sidebar">
      {/* Logotipo da aplicação */}
      <div className="logo">
        <div className="logo-icon">{"</>"}</div>
        <span className="logo-text">CodePath</span>
      </div>

      {/* Menu de navegação */}
      <nav className="nav-menu">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => {
              onNavigate(item.id)       // mantém o estado do item ativo
              navigate(item.path)       // realiza o roteamento real
            }}
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
