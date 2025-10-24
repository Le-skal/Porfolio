import { Briefcase, Code, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutSection = ({ isPopup }) => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className={isPopup ? "w-full" : "py-24 px-4 relative"}>
      <div className={isPopup ? "w-full" : "container mx-auto max-w-5xl"}>
        <div className={isPopup ? "space-y-4" : "space-y-8"}>
          {/* Header */}
          {!isPopup && (
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
                {t("about.title")}
              </h2>
              <p className="text-sm text-foreground/60 uppercase tracking-widest">
                {t("about.subtitle")}
              </p>
            </div>
          )}

          {/* Main content */}
          <div className={isPopup ? "space-y-3" : "space-y-6"}>
            <div className={isPopup ? "space-y-2" : "space-y-4 border-l-2 border-primary/50 pl-6"}>
              {!isPopup && (
                <h3 className="text-lg font-semibold uppercase tracking-wide">
                  {t("about.heading")}
                </h3>
              )}

              <p className={isPopup ? "text-xs text-gray-700 leading-relaxed" : "text-sm text-foreground/70 leading-relaxed"}>
                {t("about.description1")}
              </p>

              <p className={isPopup ? "text-xs text-gray-700 leading-relaxed" : "text-sm text-foreground/70 leading-relaxed"}>
                {t("about.description2")}
              </p>

              {!isPopup && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a href="#contact" className="cosmic-button text-xs">
                    {t("about.getInTouch")}
                  </a>

                  <a
                    href=""
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-transparent border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
                  >
                    {t("about.downloadCV")}
                  </a>
                </div>
              )}
            </div>

            {/* Skills cards */}
            <div className={isPopup ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 md:grid-cols-3 gap-4 pt-6"}>
              <div className={isPopup ? "p-2 bg-gray-200/50 border border-gray-400" : "p-4 border border-foreground/10 hover:border-primary/50 transition-all duration-300 bg-card/50 hover:bg-card/80"}>
                <div className="flex items-start gap-2 mb-2">
                  <div className={isPopup ? "p-1 bg-gray-300 rounded-sm" : "p-2 bg-primary/10 rounded-sm"}>
                    <Code className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                  </div>
                  <div>
                    <h4 className={isPopup ? "font-semibold text-xs text-gray-800" : "font-semibold text-sm uppercase tracking-wide text-foreground"}>{t("about.webDevelopment")}</h4>
                  </div>
                </div>
                <p className={isPopup ? "text-xs text-gray-700 leading-relaxed" : "text-xs text-foreground/60 leading-relaxed"}>
                  {t("about.webDevelopmentDesc")}
                </p>
              </div>

              <div className={isPopup ? "p-2 bg-gray-200/50 border border-gray-400" : "p-4 border border-foreground/10 hover:border-primary/50 transition-all duration-300 bg-card/50 hover:bg-card/80"}>
                <div className="flex items-start gap-2 mb-2">
                  <div className={isPopup ? "p-1 bg-gray-300 rounded-sm" : "p-2 bg-primary/10 rounded-sm"}>
                    <User className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                  </div>
                  <div>
                    <h4 className={isPopup ? "font-semibold text-xs text-gray-800" : "font-semibold text-sm uppercase tracking-wide text-foreground"}>{t("about.uiuxDesign")}</h4>
                  </div>
                </div>
                <p className={isPopup ? "text-xs text-gray-700 leading-relaxed" : "text-xs text-foreground/60 leading-relaxed"}>
                  {t("about.uiuxDesignDesc")}
                </p>
              </div>

              <div className={isPopup ? "p-2 bg-gray-200/50 border border-gray-400" : "p-4 border border-foreground/10 hover:border-primary/50 transition-all duration-300 bg-card/50 hover:bg-card/80"}>
                <div className="flex items-start gap-2 mb-2">
                  <div className={isPopup ? "p-1 bg-gray-300 rounded-sm" : "p-2 bg-primary/10 rounded-sm"}>
                    <Briefcase className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                  </div>
                  <div>
                    <h4 className={isPopup ? "font-semibold text-xs text-gray-800" : "font-semibold text-sm uppercase tracking-wide text-foreground"}>{t("about.projectManagement")}</h4>
                  </div>
                </div>
                <p className={isPopup ? "text-xs text-gray-700 leading-relaxed" : "text-xs text-foreground/60 leading-relaxed"}>
                  {t("about.projectManagementDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
