import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import TextType from "@/components/TextType";

export const HeroSection = ({ onOpenWindow }) => {
  const { t, language } = useLanguage();
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 sm:pt-20"
    >
      <div className="container max-w-4xl sm:max-w-5xl mx-auto text-center z-10">
        {showHero && (
          <div className="space-y-10 sm:space-y-12 animate-text-fade">
            {/* Main heading */}
            <div className="space-y-4 sm:space-y-6">
              <TextType
                as="h1"
                text={[t("hero.greeting")]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight break-words"
              />

              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight break-words">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                  {t("hero.name")} {t("hero.lastname")}
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm xs:text-base sm:text-lg text-foreground/70 max-w-md sm:max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-2">
              {t("hero.description")}
            </p>

            {/* CTA Buttons: CV (language-aware) and GitHub */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full">
              {/* CV link - uses language from context to pick EN/FR PDF in /cv/ */}
              <a
                href={language === 'fr' ? '/cv/raphael_martin_cv_fr.pdf' : '/cv/raphael_martin_cv_en.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-3 bg-primary text-primary-foreground font-semibold
                         transition-all duration-300 uppercase tracking-widest text-xs
                         border border-primary hover:bg-transparent hover:text-primary
                         hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                aria-label={t("hero.cv")}
              >
                {t("hero.cv")}
              </a>

              {/* GitHub link - replace with your username */}
              <a
                href="https://github.com/Le-skal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-3 bg-transparent text-foreground font-semibold
                         transition-all duration-300 uppercase tracking-widest text-xs
                         border border-foreground/30 hover:border-foreground
                         hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
