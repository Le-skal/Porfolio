import { Navbar } from "../components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
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
    // Dispatch close event so the window can play its exit animation.
    // Delay removal from state so the animation has time to finish.
    window.dispatchEvent(new CustomEvent('popupClose', { detail: windowId }));
    setTimeout(() => {
      setOpenWindows((prev) => {
        const updated = { ...prev };
        delete updated[windowId];
        return updated;
      });
    }, 500); // 500ms matches the AboutSection duration
  };

  const windowTitles = {
    about: "About Le Skal",
    projects: "My Projects",
    contact: "Contact",
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <InteractiveBackground />

      {/* Navbar - hide when projects or about is open */}
      {!openWindows.projects && !openWindows.about && <Navbar onOpenWindow={handleOpenWindow} />}
      {/* Main Content */}
      <main>
        {!openWindows.projects && !openWindows.about && <HeroSection onOpenWindow={handleOpenWindow} />}
        {/* Full Page Sections */}
        {openWindows.about && (
          <AboutSection onClose={() => handleCloseWindow("about")} />
        )}
        {/* Popups */}
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
