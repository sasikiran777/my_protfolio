import React from 'react'
import './Loader.css'

export default function Loader() {
  return (
    <div className="loader-wrap">
      <div className="loader-content">
        <div className="loader-logo">SK</div>
        <div className="loader-bar">
          <div className="loader-fill" />
        </div>
        <p className="loader-text">Initializing Portfolio...</p>
      </div>
    </div>
  )
}
