import { useLanguage } from "@/contexts/LanguageContext";
import { BalatroBackground } from "./BalatroBackground";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export const AboutSection = ({ onClose }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  // Indicator will always glow
  const showScrollGlow = true;
  const scrollTicking = useRef(false);

  // Trigger entrance animation on mount and listen for global popupClose events
  useEffect(() => {
    // Defer to next frame so CSS transition can run
    const raf = requestAnimationFrame(() => setIsVisible(true));

    const handlePopupClose = (e) => {
      // Start exit animation; parent will remove the component shortly after
      setIsVisible(false);
      setIsClosing(true);
    };

    const handleScroll = (e) => {
      if (!contentRef.current || isClosing || !scrollIndicatorRef.current) return;
      if (scrollTicking.current) return;
      scrollTicking.current = true;

      requestAnimationFrame(() => {
        const el = contentRef.current;
        const indicator = scrollIndicatorRef.current;

        // Get the position of the scroll indicator relative to the viewport
        const indicatorRect = indicator.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if we're actually scrolled down (not at top)
        const isScrolledDown = el.scrollTop > 50;

        // Show glow effect when indicator is close to triggering
        const distanceFromTop = indicatorRect.top;
        const triggerDistance = viewportHeight * 0.3; // indicator reaches top 30%
        const glowStart = viewportHeight * 0.5; // start glow when within top 50%

        // indicator always glows; no state toggling to avoid flashes

        // If indicator reaches top 30% of viewport AND we've scrolled down, trigger close
        if (isScrolledDown && distanceFromTop < triggerDistance) {
          setIsVisible(false);
          setIsClosing(true);
          // indicator remains glowing
          // Delay notifying parent so exit animation can play
          if (typeof onClose === 'function') {
            setTimeout(() => onClose(), 500);
          }
        }

        scrollTicking.current = false;
      });
    };

    window.addEventListener("popupClose", handlePopupClose);
    // attach scroll listener on the content element if present
    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("popupClose", handlePopupClose);
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className={`relative w-full min-h-screen bg-black text-white overflow-hidden transition-all duration-500 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}>
      {/* Fixed Balatro Background */}
      <div className="fixed inset-0 z-0">
        <BalatroBackground
          pixelFilter={2000}
          spinRotation={-2.0}
          spinSpeed={3.0}
          isRotate={false}
          mouseInteraction={true}
          color1="#050409"   /* very dark base */
          color2="#241331"   /* deep muted purple */
          color3="#3c383cff"   /* toned-down plum accent */
        />
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X size={28} className="text-gray-300 hover:text-white transition-colors" />
        </button>
      )}

      {/* Scrollable Content - No Scrollbar */}
      <div ref={contentRef} className="relative z-10 w-full h-screen overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="w-full py-8 sm:py-10 md:py-12">

          {/* Hero Section (reduced padding, larger intro) */}
          <div className="max-w-8xl mx-auto px-2 sm:px-4 space-y-4 sm:space-y-6 pt-6 sm:pt-8 md:pt-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              {t("about.introduction")}
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-100 font-semibold leading-tight">
              {t("about.currentFocus")}
            </p>
          </div>

          {/* Background Section */}
          <div className="mt-20 sm:mt-24 md:mt-32 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white mb-8 sm:mb-10 md:mb-12 text-left lg:w-[160px] lg:sticky lg:top-24 lg:left-[30px]">
              {t("about.sectionBackground")}
            </h2>
            <div className="max-w-3xl mx-auto px-4 space-y-8 sm:space-y-10 md:space-y-12">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionLocationHistory")}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed text-left">
                  {t("about.location")}. {t("about.background")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionJourney")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.journey")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionKeyExperiences")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.keyExperiences")}
                </p>
              </div>
            </div>
          </div>

          {/* Why Data Science */}
          <div className="mt-20 sm:mt-24 md:mt-32 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white mb-8 sm:mb-10 md:mb-12 text-left lg:w-[160px] lg:sticky lg:top-24 lg:left-[30px]">
              {t("about.sectionWhyDataScience")}
            </h2>
            <div className="max-w-3xl mx-auto px-4 space-y-8 sm:space-y-10 md:space-y-12">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionWhatExcites")}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed text-left">
                  {t("about.whyDataScience")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionProblems")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.problemsToSolve")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionAreas")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.areasOfInterest")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionSkills")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.skillAreas")}
                </p>
              </div>
            </div>
          </div>

          {/* Work Style & Values */}
          <div className="mt-20 sm:mt-24 md:mt-32 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white mb-8 sm:mb-10 md:mb-12 text-left lg:w-[160px] lg:sticky lg:top-24 lg:left-[30px]">
              {t("about.sectionApproach")}
            </h2>
            <div className="max-w-3xl mx-auto px-4 space-y-8 sm:space-y-10 md:space-y-12">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionProblemSolving")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.approachToProblems")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionMotivation")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.motivation")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionValues")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.coreValues")}
                </p>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="mt-20 sm:mt-24 md:mt-32 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white mb-8 sm:mb-10 md:mb-12 text-left lg:w-[160px] lg:sticky lg:top-24 lg:left-[30px]">
              {t("about.sectionLookingAhead")}
            </h2>
            <div className="max-w-3xl mx-auto px-4 space-y-8 sm:space-y-10 md:space-y-12">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionAspirations")}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 text-left">
                  {t("about.aspirations")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionVision")}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 text-left">
                  {t("about.fiveYearVision")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionImpact")}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 text-left">
                  {t("about.impact")}
                </p>
              </div>
            </div>
          </div>

          {/* Outside Work */}
          <div className="mt-20 sm:mt-24 md:mt-32 pb-12 sm:pb-16 md:pb-20 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white mb-8 sm:mb-10 md:mb-12 text-left lg:w-[160px] lg:sticky lg:top-24 lg:left-[30px]">
              {t("about.sectionOutside")}
            </h2>
            <div className="max-w-3xl mx-auto px-4 space-y-8 sm:space-y-10">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionHobbies")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.hobbies")}
                </p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionInspiration")}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                  {t("about.inspiration")}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom navigation / scroll indicator (gives a warning before exit) */}
          <div className="px-12 max-w-6xl mx-auto py-12 pb-24 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-xs uppercase tracking-wider text-white/30">Scroll to exit</span>
                <div
                  ref={scrollIndicatorRef}
                  className="flex-1 h-px"
                  style={{
                    backgroundColor: showScrollGlow ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.06)',
                    boxShadow: showScrollGlow ? '0 0 22px 10px rgba(255,255,255,0.12)' : 'none',
                    transition: 'background-color 300ms ease, box-shadow 400ms ease',
                    willChange: 'background-color, box-shadow'
                  }}
                />
              </div>
              <div className="ml-8 text-xs text-white/60">When the bar reaches the top, the page will close</div>
            </div>
          </div>

          {/* Extra blank space to prevent immediate exit and give a warning area */}
          {/* Increased to viewport-relative heights so the indicator can reach the trigger zone */}
          <div className="h-[60vh] md:h-[80vh] lg:h-[100vh]" />
        </div>
      </div>
    </section>
  );
};
