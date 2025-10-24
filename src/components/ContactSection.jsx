import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = ({ isPopup }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: t("contact.messageSent"),
        description: t("contact.messageSentDesc"),
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact" className={isPopup ? "w-full" : "py-24 px-4 relative"}>
      <div className={isPopup ? "w-full" : "container mx-auto max-w-5xl"}>
        {/* Header */}
        {!isPopup && (
          <div className="space-y-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
              {t("contact.title")}
            </h2>
            <p className="text-sm text-foreground/60 uppercase tracking-widest">
              {t("contact.subtitle")}
            </p>
          </div>
        )}

        {!isPopup && (
          <p className="text-sm text-foreground/70 mb-8 max-w-2xl leading-relaxed">
            {t("contact.description")}
          </p>
        )}

        <div className={isPopup ? "space-y-3" : "grid grid-cols-1 lg:grid-cols-2 gap-8"}>
          {/* Contact Info */}
          <div className={isPopup ? "space-y-2" : "space-y-6"}>
            {!isPopup && (
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">
                {t("contact.contactInfo")}
              </h3>
            )}

            <div className={isPopup ? "space-y-2" : "space-y-4"}>
              <div className={isPopup ? "flex items-center gap-2" : "flex items-start space-x-4"}>
                <div className={isPopup ? "p-1 bg-gray-300 rounded-sm flex-shrink-0" : "p-2 bg-primary/10 rounded-sm flex-shrink-0"}>
                  <Mail className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                </div>
                <div>
                  <h4 className={isPopup ? "font-semibold text-xs text-gray-800" : "font-semibold text-xs uppercase tracking-wide mb-1"}>
                    {t("contact.email")}
                  </h4>
                  <a
                    href="mailto:raphael.martin.2004@gmail.com"
                    className={isPopup ? "text-xs text-gray-700 hover:text-blue-600 transition-colors" : "text-sm text-foreground/70 hover:text-primary transition-colors"}
                  >
                    raphael.martin.2004@gmail.com
                  </a>
                </div>
              </div>

              <div className={isPopup ? "flex items-center gap-2" : "flex items-start space-x-4"}>
                <div className={isPopup ? "p-1 bg-gray-300 rounded-sm flex-shrink-0" : "p-2 bg-primary/10 rounded-sm flex-shrink-0"}>
                  <Phone className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                </div>
                <div>
                  <h4 className={isPopup ? "font-semibold text-xs text-gray-800" : "font-semibold text-xs uppercase tracking-wide mb-1"}>
                    {t("contact.phone")}
                  </h4>
                  <a
                    href="tel:+33677151276"
                    className={isPopup ? "text-xs text-gray-700 hover:text-blue-600 transition-colors" : "text-sm text-foreground/70 hover:text-primary transition-colors"}
                  >
                    +33 (0)6 77 15 12 76
                  </a>
                </div>
              </div>

              <div className={isPopup ? "flex items-center gap-2" : "flex items-start space-x-4"}>
                <div className={isPopup ? "p-1 bg-gray-300 rounded-sm flex-shrink-0" : "p-2 bg-primary/10 rounded-sm flex-shrink-0"}>
                  <MapPin className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                </div>
                <div>
                  <h4 className={isPopup ? "font-semibold text-xs text-gray-800" : "font-semibold text-xs uppercase tracking-wide mb-1"}>
                    {t("contact.location")}
                  </h4>
                  <p className={isPopup ? "text-xs text-gray-700" : "text-sm text-foreground/70"}>
                    Paris, 75015, France
                  </p>
                </div>
              </div>
            </div>

            {!isPopup && (
              <div className="pt-4 border-t border-foreground/10">
                <h4 className="font-semibold text-xs uppercase tracking-widest mb-4">
                  {t("contact.connectWithMe")}
                </h4>
                <a
                  href="https://www.linkedin.com/in/raphael-martin-10a17128a/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  <Linkedin size={18} />
                  <span className="uppercase tracking-wide">LinkedIn</span>
                </a>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className={isPopup ? "border-t border-gray-400 pt-2" : "border border-foreground/10 p-6 bg-card/50"}>
            <h3 className={isPopup ? "text-xs font-semibold uppercase tracking-widest mb-3 text-gray-800" : "text-sm font-semibold uppercase tracking-widest mb-6"}>
              {t("contact.sendAMessage")}
            </h3>

            <form className={isPopup ? "space-y-2" : "space-y-4"} onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className={isPopup ? "block text-xs font-semibold text-gray-800 mb-1" : "block text-xs font-semibold uppercase tracking-wider mb-2"}
                >
                  {t("contact.yourName")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-100 border border-gray-400 focus:border-gray-500 focus:outline-none" : "w-full px-3 py-2 text-sm bg-background border border-foreground/10 focus:border-primary focus:outline-none transition-colors"}
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={isPopup ? "block text-xs font-semibold text-gray-800 mb-1" : "block text-xs font-semibold uppercase tracking-wider mb-2"}
                >
                  {t("contact.yourEmail")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-100 border border-gray-400 focus:border-gray-500 focus:outline-none" : "w-full px-3 py-2 text-sm bg-background border border-foreground/10 focus:border-primary focus:outline-none transition-colors"}
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={isPopup ? "block text-xs font-semibold text-gray-800 mb-1" : "block text-xs font-semibold uppercase tracking-wider mb-2"}
                >
                  {t("contact.yourMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-100 border border-gray-400 focus:border-gray-500 focus:outline-none resize-none h-16" : "w-full px-3 py-2 text-sm bg-background border border-foreground/10 focus:border-primary focus:outline-none transition-colors resize-none h-24"}
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-400 hover:bg-gray-500 text-gray-900 font-semibold border border-gray-500 transition-colors flex items-center justify-center gap-1" : "cosmic-button w-full flex items-center justify-center gap-2 text-xs"}
              >
                {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                <Send size={isPopup ? 12 : 14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
