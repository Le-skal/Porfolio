import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

const navItems = [
  { name: "about", id: "about" },
  { name: "projects", id: "projects" },
  { name: "contact", id: "contact" },
];

export const Navbar = ({ onOpenWindow }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 border-b",
        isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md border-gray-800"
          : "py-6 bg-transparent border-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-6 md:px-8">
        <LanguageToggle />

        {/* desktop nav */}
        <div className="hidden md:flex gap-8 lg:gap-12">
          {navItems.map((item, key) => (
            <button
              key={key}
              onClick={() => onOpenWindow(item.id)}
              className="text-xs font-semibold text-foreground/80 hover:text-primary
                       transition-colors duration-300 uppercase tracking-[0.15em]
                       hover:tracking-[0.2em] relative pb-0.5
                       before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px]
                       before:bg-transparent before:transition-none
                       after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]
                       after:bg-primary after:transition-all after:duration-300
                       hover:after:w-full"
            >
              {t(`navbar.${item.name}`)}
            </button>
          ))}
        </div>

        {/* mobile nav */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/98 z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-lg">
            {navItems.map((item, key) => (
              <button
                key={key}
                onClick={() => {
                  onOpenWindow(item.id);
                  setIsMenuOpen(false);
                }}
                className="text-sm font-semibold text-foreground hover:text-primary
                         transition-colors duration-300 uppercase tracking-[0.15em]"
              >
                {t(`navbar.${item.name}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
