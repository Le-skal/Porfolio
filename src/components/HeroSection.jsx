import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export const HeroSection = ({ onOpenWindow }) => {
  const { t } = useLanguage();
  const [showHero, setShowHero] = useState(true);

  // Listen for popup opens to hide hero
  useEffect(() => {
    const handlePopupOpen = () => {
      setShowHero(false);
    };

    const handlePopupClose = () => {
      // Small delay to sync with popup close animation
      setTimeout(() => setShowHero(true), 100);
    };

    // We'll trigger these manually from Home.jsx
    window.addEventListener('popupOpen', handlePopupOpen);
    window.addEventListener('popupClose', handlePopupClose);

    return () => {
      window.removeEventListener('popupOpen', handlePopupOpen);
      window.removeEventListener('popupClose', handlePopupClose);
    };
  }, []);
  
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20"
    >
      <div className="container max-w-5xl mx-auto text-center z-10">
        {showHero && (
          <div className="space-y-12 animate-text-fade">
            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight">
                {t("hero.greeting")}
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                  {t("hero.name")} {t("hero.lastname")}
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onOpenWindow && onOpenWindow('projects')}
                className="px-8 py-3 md:px-10 md:py-3 bg-primary text-primary-foreground font-semibold
                         transition-all duration-300 uppercase tracking-widest text-xs
                         border border-primary hover:bg-transparent hover:text-primary
                         hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                {t("hero.cta")}
              </button>
              <button 
                onClick={() => onOpenWindow && onOpenWindow('contact')}
                className="px-8 py-3 md:px-10 md:py-3 bg-transparent text-foreground font-semibold
                         transition-all duration-300 uppercase tracking-widest text-xs
                         border border-foreground/30 hover:border-foreground
                         hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {t("contact.title")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
