import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-foreground
                     border-b-2 border-transparent hover:border-blue-400
                     transition-colors text-sm font-light uppercase tracking-wider
                     hover:text-blue-400"
        >
          <Globe className="h-4 w-4" />
          <span>{language.toUpperCase()}</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-3 left-0 bg-gray-900 border border-gray-700
                          rounded-none shadow-xl min-w-[150px] py-2 z-50">
            <button
              onClick={() => {
                setLanguage("en");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-800
                         transition-colors text-sm text-foreground font-light
                         border-l-2 border-transparent hover:border-blue-400"
            >
              <Check className={`h-4 w-4 ${language === "en" ? "opacity-100" : "opacity-0"}`} />
              English
            </button>
            <button
              onClick={() => {
                setLanguage("fr");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-800
                         transition-colors text-sm text-foreground font-light
                         border-l-2 border-transparent hover:border-blue-400"
            >
              <Check className={`h-4 w-4 ${language === "fr" ? "opacity-100" : "opacity-0"}`} />
              Français
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
