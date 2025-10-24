import { Navbar } from "../components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ProjectsModal } from "../components/ProjectsModal";
import { ContactSection } from "../components/ContactSection";
import { WindowsXPPopup } from "../components/WindowsXPPopup";
import { useState } from "react";

export const Home = () => {
  const [openWindows, setOpenWindows] = useState({});

  const handleOpenWindow = (windowId) => {
    window.dispatchEvent(new CustomEvent('popupOpen', { detail: windowId }));
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: true,
    }));
  };

  const handleCloseWindow = (windowId) => {
    window.dispatchEvent(new CustomEvent('popupClose', { detail: windowId }));
    setOpenWindows((prev) => {
      const updated = { ...prev };
      delete updated[windowId];
      return updated;
    });
  };

  const windowTitles = {
    about: "About Me",
    skills: "My Skills",
    projects: "My Projects",
    contact: "Contact Me",
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <InteractiveBackground />

      {/* Navbar */}
      <Navbar onOpenWindow={handleOpenWindow} />
      {/* Main Content */}
      <main>
        <HeroSection onOpenWindow={handleOpenWindow} />
        {/* Popups */}
        {openWindows.about && (
          <WindowsXPPopup
            title={windowTitles.about}
            windowId="About Me"
            onClose={() => handleCloseWindow("about")}
          >
            <AboutSection isPopup />
          </WindowsXPPopup>
        )}
        {openWindows.skills && (
          <WindowsXPPopup
            title={windowTitles.skills}
            windowId="My Skills"
            onClose={() => handleCloseWindow("skills")}
          >
            <SkillsSection isPopup />
          </WindowsXPPopup>
        )}
        {openWindows.projects && (
          <ProjectsModal
            onClose={() => handleCloseWindow("projects")}
          />
        )}
        {openWindows.contact && (
          <WindowsXPPopup
            title={windowTitles.contact}
            windowId="Contact Me"
            onClose={() => handleCloseWindow("contact")}
          >
            <ContactSection isPopup />
          </WindowsXPPopup>
        )}
      </main>
    </div>
  );
};
