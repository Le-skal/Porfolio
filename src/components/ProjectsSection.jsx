import { ArrowRight, ExternalLink, Github } from "lucide-react";
import JsBackground from "./JsBackground";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities.",
    image: "/projects/project2.png",
    tags: ["TypeScript", "D3.js", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const ProjectsSection = ({ isPopup }) => {
  return (
    <section id="projects" className={isPopup ? "w-full" : "py-24 px-4 relative"}>
      {/* Background grain/shards specific to projects section */}
      <JsBackground />
      <div className={isPopup ? "w-full" : "container mx-auto max-w-5xl"}>
        <h2 className="text-2xl font-bold mb-3 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-gray-100 dark:bg-gray-800 rounded overflow-hidden card-hover"
            >
              <div className="h-24 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-3">
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-xs font-medium border rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-sm font-semibold mb-1"> {project.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a
            className="cosmic-button text-xs py-1 px-3 inline-flex items-center gap-1"
            target="_blank"
            href="https://github.com/machadop1407"
          >
            Check My Github <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};
