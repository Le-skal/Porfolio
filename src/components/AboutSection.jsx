import { useLanguage } from "@/contexts/LanguageContext";
import { BalatroBackground } from "./BalatroBackground";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export const AboutSection = ({ onClose }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const contentRef = useRef(null);

  // Trigger entrance animation on mount and listen for global popupClose events
  useEffect(() => {
    // Defer to next frame so CSS transition can run
    const raf = requestAnimationFrame(() => setIsVisible(true));

    const handlePopupClose = (e) => {
      // Start exit animation; parent will remove the component shortly after
      setIsVisible(false);
      setIsClosing(true);
    };

    // scroll-to-exit removed: no scroll handler

    window.addEventListener("popupClose", handlePopupClose);
    // no scroll-to-exit listener attached

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("popupClose", handlePopupClose);
      // no scroll listener to remove
    };
  }, []);

  return (
    <section
      className={`relative w-full min-h-screen text-white transition-all duration-500 ease-out transform 
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}
      bg-black [background-color:#000]`}
      style={{ backfaceVisibility: "hidden", willChange: "opacity, transform" }}
    >

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
      {/* Use min-h-screen so content flows on small devices and allow full-screen scrolling on md+ */}
      <div ref={contentRef} className="relative z-10 w-full min-h-screen md:h-screen overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="w-full py-6 sm:py-8 md:py-10">

          {/* Hero Section (reduced padding, larger intro) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-4 sm:space-y-6 pt-4 sm:pt-6 md:pt-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              {t("about.introduction")}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-semibold leading-tight">
              {t("about.currentFocus")}
            </p>
          </div>

          {/* Background Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:grid lg:grid-cols-[180px_1fr] lg:items-start lg:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6 sm:mb-8 md:mb-10 text-left w-full sm:w-auto lg:sticky lg:top-24 lg:left-6">
              {t("about.sectionBackground")}
            </h2>
            <div className="max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 md:space-y-10">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionLocationHistory")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed text-left">
                  {t("about.location")}. {t("about.background")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionJourney")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.journey")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionKeyExperiences")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.keyExperiences")}
                </p>
              </div>
            </div>
          </div>

          {/* Why Data Science */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:grid lg:grid-cols-[180px_1fr] lg:items-start lg:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6 sm:mb-8 md:mb-10 text-left w-full sm:w-auto lg:sticky lg:top-24 lg:left-6">
              {t("about.sectionWhyDataScience")}
            </h2>
            <div className="max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 md:space-y-10">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionWhatExcites")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.whyDataScience")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionProblems")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.problemsToSolve")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionAreas")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.areasOfInterest")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionSkills")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.skillAreas")}
                </p>
              </div>
            </div>
          </div>

          {/* Work Style & Values */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:grid lg:grid-cols-[180px_1fr] lg:items-start lg:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6 sm:mb-8 md:mb-10 text-left w-full sm:w-auto lg:sticky lg:top-24 lg:left-6">
              {t("about.sectionApproach")}
            </h2>
            <div className="max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 md:space-y-10">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionProblemSolving")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.approachToProblems")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionMotivation")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.motivation")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionValues")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.coreValues")}
                </p>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:grid lg:grid-cols-[180px_1fr] lg:items-start lg:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6 sm:mb-8 md:mb-10 text-left w-full sm:w-auto lg:sticky lg:top-24 lg:left-6">
              {t("about.sectionLookingAhead")}
            </h2>
            <div className="max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 md:space-y-10">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionAspirations")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-200 text-left">
                  {t("about.aspirations")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionVision")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-200 text-left">
                  {t("about.fiveYearVision")}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionImpact")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-200 text-left">
                  {t("about.impact")}
                </p>
              </div>
            </div>
          </div>

          {/* Outside Work */}
          <div className="mt-12 sm:mt-16 md:mt-20 pb-12 sm:pb-16 md:pb-20 lg:grid lg:grid-cols-[180px_1fr] lg:items-start lg:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6 sm:mb-8 md:mb-10 text-left w-full sm:w-auto lg:sticky lg:top-24 lg:left-6">
              {t("about.sectionOutside")}
            </h2>
            <div className="max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionHobbies")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.hobbies")}
                </p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3 sm:mb-4 text-left">
                  {t("about.sectionInspiration")}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                  {t("about.inspiration")}
                </p>
              </div>
            </div>
          </div>

          {/* Scroll-to-exit UI removed */}
        </div>
      </div>
    </section>
  );
};
