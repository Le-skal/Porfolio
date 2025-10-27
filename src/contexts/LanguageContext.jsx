import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    navbar: {
      title: "Raphael Martin",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Raphael",
      lastname: "Martin",
      description:
        "I create stellar web experiences with modern technologies. Specializing in front-end development, I build interfaces that are both beautiful and functional.",
      cta: "View My Work",
    },
    about: {
      title: "About",
      subtitle: "Me",
      heading: "Passionate Web Developer & Tech Creator",
      description1:
        "With over 5 years of experience in web development, I specialize in creating responsive, accessible, and performant web applications using modern technologies.",
      description2:
        "I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning new technologies and techniques to stay at the forefront of the ever-evolving web landscape.",
      getInTouch: "Get In Touch",
      downloadCV: "Download CV",
      webDevelopment: "Web Development",
      webDevelopmentDesc:
        "Creating responsive websites and web applications with modern frameworks.",
      uiuxDesign: "UI/UX Design",
      uiuxDesignDesc:
        "Designing intuitive user interfaces and seamless user experiences.",
      projectManagement: "Project Management",
      projectManagementDesc:
        "Leading projects from conception to completion with agile methodologies.",
    },
    contact: {
      title: "Get In",
      subtitle: "Touch",
      description:
        "Have a project in mind or want to collaborate? Feel free to reach out.",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      location: "Location",
      connectWithMe: "Connect With Me",
      sendAMessage: "Send a Message",
      yourName: "Your Name",
      namePlaceholder: "Raphael Martin...",
      yourEmail: "Your Email",
      emailPlaceholder: "john@gmail.com",
      yourMessage: "Your Message",
      messagePlaceholder: "Hello, I'd like to talk about...",
      sendMessage: "Send Message",
      sending: "Sending...",
      messageSent: "Message sent!",
      messageSentDesc: "Thank you for your message. I'll get back to you soon.",
    },
    closeAllProjects: "Close All Projects",
  },
  fr: {
    navbar: {
      title: "Raphael Martin",
      about: "À Propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Raphael",
      lastname: "Martin",
      description:
        "Je crée des expériences web exceptionnelles avec les technologies modernes. Spécialisé en développement front-end, je construis des interfaces à la fois belles et fonctionnelles.",
      cta: "Voir Mon Travail",
    },
    about: {
      title: "À",
      subtitle: "Propos",
      heading: "Développeur Web Passionné & Créateur Tech",
      description1:
        "Avec plus de 5 ans d'expérience en développement web, je me spécialise dans la création d'applications web réactives, accessibles et performantes en utilisant les technologies modernes.",
      description2:
        "Je suis passionné par la création de solutions élégantes aux problèmes complexes, et j'apprends constamment de nouvelles technologies et techniques pour rester à la pointe du paysage web en constante évolution.",
      getInTouch: "Me Contacter",
      downloadCV: "Télécharger CV",
      webDevelopment: "Développement Web",
      webDevelopmentDesc:
        "Création de sites web et d'applications web réactifs avec les frameworks modernes.",
      uiuxDesign: "Design UI/UX",
      uiuxDesignDesc:
        "Conception d'interfaces utilisateur intuitives et d'expériences utilisateur transparentes.",
      projectManagement: "Gestion de Projet",
      projectManagementDesc:
        "Conduire les projets de la conception à l'achèvement avec des méthodologies agiles.",
    },
    contact: {
      title: "Mettons-nous en",
      subtitle: "Contact",
      description:
        "Vous avez un projet en tête ou voulez collaborer? N'hésitez pas à nous contacter.",
      contactInfo: "Informations de Contact",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      connectWithMe: "Me Connecter",
      sendAMessage: "Envoyer un Message",
      yourName: "Votre Nom",
      namePlaceholder: "Raphael Martin...",
      yourEmail: "Votre Email",
      emailPlaceholder: "jean@gmail.com",
      yourMessage: "Votre Message",
      messagePlaceholder: "Bonjour, j'aimerais parler de...",
      sendMessage: "Envoyer le Message",
      sending: "Envoi...",
      messageSent: "Message envoyé!",
      messageSentDesc:
        "Merci pour votre message. Je vous répondrai bientôt.",
    },
    closeAllProjects: "Fermer Tous les Projets",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
