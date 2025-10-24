import { X, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import "./WindowsXPPopup.css";

export const WindowsXPPopup = ({ title, children, onClose, windowId }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      style={{ pointerEvents: "auto" }}
    >
      {/* Semi-transparent overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 animate-fade-in"
        onClick={handleClose}
      />

      {/* Window - VRAI Windows XP Style */}
      <div
        className={`relative z-50 w-[900px] max-w-[90vw] bg-gradient-to-b from-cyan-400 to-cyan-500 border-2 border-cyan-600 shadow-2xl flex flex-col max-h-[85vh] ${
          isClosing ? 'animate-popup-out' : 'animate-popup-in'
        }`}
        style={{
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar - Windows XP Blue */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-1 py-0.5 flex items-center justify-between select-none flex-shrink-0 border-b border-blue-700" style={{
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.6)'
        }}>
          <h2 className="text-white font-bold text-sm ml-1">{title}</h2>
          <div className="flex gap-0.5">
            <button
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-black text-xs font-bold w-6 h-5 flex items-center justify-center border border-gray-400 transition-all active:border-gray-500 active:shadow-inset"
              style={{
                boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(0,0,0,0.4)'
              }}
              title="Minimize"
            >
              −
            </button>
            <button
              onClick={handleClose}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold w-6 h-5 flex items-center justify-center border border-red-800 transition-all active:border-red-900 active:shadow-inset"
              style={{
                boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.6)'
              }}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Border frame - Classic XP look */}
        <div className="border-2 border-cyan-300 m-1 flex-1 overflow-hidden flex flex-col" style={{
          boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.3), inset -1px -1px 0 rgba(255,255,255,0.7)'
        }}>
          {/* Content */}
          <div className="xp-scrollbar flex-1 p-4 text-gray-700 text-sm font-sans overflow-y-auto bg-gray-300 border border-gray-400">
            {children}
          </div>
        </div>

        {/* Status Bar - Classic XP */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-300 px-1 py-0.5 border-t border-gray-500 flex items-center text-xs text-gray-700 flex-shrink-0" style={{
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.8)'
        }}>
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
          <span className="font-medium">{windowId || "Ready"}</span>
        </div>
      </div>
    </div>
  );
};
