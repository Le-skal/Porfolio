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
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Use localhost for local dev, relative path for Vercel
    const apiUrl = import.meta.env.DEV
      ? 'http://localhost:3001/api/send-email'
      : '/api/send-email';

    try {
      // Build localized confirmation subject and HTML using translations
      const subjectTemplate = t('contact.confirmationSubject') || 'Thank you for contacting me, {name}!';
      const greeting = (t('contact.confirmationGreeting') || `Hi ${name},`).replace('{name}', name);
      const receivedLine = t('contact.confirmationReceivedLine') || 'Your message has been received';
      const bodyLine = t('contact.confirmationBody') || "Thank you for reaching out! I've received your message and will get back to you as soon as possible.";
      const signatureRaw = t('contact.confirmationSignature') || 'Best regards,\nRaphaël Martin';
      const signature = signatureRaw.replace(/\n/g, '<br>');

      const subject = subjectTemplate.replace('{name}', name);

      // Build rich HTML similar to owner's template but using localized strings
      const locale = (language || 'en').slice(0, 2).toLowerCase() === 'fr' ? 'fr-FR' : 'en-US';
      const date = new Date().toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const siteTitle = t('contact.title') || 'Portfolio Contact';
      const siteSubtitle = t('contact.subtitle') || '';

      const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif">
        <table role="presentation" width="700" cellpadding="0" cellspacing="0" style="width:700px;max-width:700px;background:#ffffff;margin:0 auto">
          <tbody>
            <!-- Header -->
            <tr>
              <td style="padding:24px 30px 20px 30px;background:#ffffff;border-bottom:4px double #2d6a4f">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="padding-bottom:12px;border-bottom:1px solid #2d6a4f">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td style="padding-bottom:8px;font-family:Georgia,'Times New Roman',serif;font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:1px;color:#666;text-align:center">
                                ${date}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:700;letter-spacing:-0.5px;line-height:1.1;color:#2d6a4f;text-align:center">
                                ${siteTitle}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#666;letter-spacing:0.3px;text-align:center">
                                ${siteSubtitle}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:12px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#666;text-align:center">
                        <span style="font-weight:600;color:#2d6a4f">${t('contact.contactInfo') || 'NEW INQUIRY'}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Message Body -->
            <tr>
              <td style="padding:30px;background:#fafaf8">
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0 0 16px 0">${greeting}</p>
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0 0 16px 0">${bodyLine}</p>
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0">${signature}</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 30px;background:#fafaf8;border-top:3px double #2d6a4f;text-align:center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="padding-bottom:8px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#333">
                        ${t('contact.messageSentDesc') || ''}
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#999;line-height:1.6">
                        © ${new Date().getFullYear()} Portfolio · All rights reserved
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
      `;

      const payload = { name, email, message, language, subject, html: emailHtml };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: t("contact.messageSent"),
          description: t("contact.messageSentDesc"),
        });
        e.target.reset(); // Clear form
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex items-start gap-2">
                <div className={isPopup ? "p-1 bg-gray-300 rounded-sm flex-shrink-0" : "p-2 bg-primary/10 rounded-sm flex-shrink-0"}>
                  <Mail className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                </div>
                <div className="text-left">
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

              <div className="flex items-start gap-2">
                <div className={isPopup ? "p-1 bg-gray-300 rounded-sm flex-shrink-0" : "p-2 bg-primary/10 rounded-sm flex-shrink-0"}>
                  <Phone className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                </div>
                <div className="text-left">
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

              <div className="flex items-start gap-2">
                <div className={isPopup ? "p-1 bg-gray-300 rounded-sm flex-shrink-0" : "p-2 bg-primary/10 rounded-sm flex-shrink-0"}>
                  <MapPin className={isPopup ? "h-4 w-4 text-gray-700" : "h-5 w-5 text-primary"} />
                </div>
                <div className="text-left">
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
              <div className="text-left">
                <label
                  htmlFor="name"
                  className={isPopup ? "block text-xs font-semibold text-gray-800 mb-1 text-left" : "block text-xs font-semibold uppercase tracking-wider mb-2"}
                >
                  {t("contact.yourName")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-100 border border-gray-400 focus:border-gray-500 focus:outline-none text-left" : "w-full px-3 py-2 text-sm bg-background border border-foreground/10 focus:border-primary focus:outline-none transition-colors"}
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="email"
                  className={isPopup ? "block text-xs font-semibold text-gray-800 mb-1 text-left" : "block text-xs font-semibold uppercase tracking-wider mb-2"}
                >
                  {t("contact.yourEmail")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-100 border border-gray-400 focus:border-gray-500 focus:outline-none text-left" : "w-full px-3 py-2 text-sm bg-background border border-foreground/10 focus:border-primary focus:outline-none transition-colors"}
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="message"
                  className={isPopup ? "block text-xs font-semibold text-gray-800 mb-1 text-left" : "block text-xs font-semibold uppercase tracking-wider mb-2"}
                >
                  {t("contact.yourMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className={isPopup ? "w-full px-2 py-1 text-xs bg-gray-100 border border-gray-400 focus:border-gray-500 focus:outline-none resize-none h-16 text-left" : "w-full px-3 py-2 text-sm bg-background border border-foreground/10 focus:border-primary focus:outline-none transition-colors resize-none h-24"}
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
