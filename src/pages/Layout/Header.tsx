import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header>Header
      <div className="container">
       <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/register" end>
        Sign Up
      </NavLink>
        </nav>
      </div>
    </header>
  )
}
