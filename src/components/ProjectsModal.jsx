import { X, ExternalLink, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
    client: "SaaS Startup",
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
    client: "Tech Company",
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
    client: "Retail Brand",
  },
];

export const ProjectsModal = ({ onClose }) => {
  // Infinite carousel will render multiple copies and keep the "activeIndex" in the
  // middle copy. We calculate transforms in pixels (not percentages) to avoid
  // mismatches between gap/width and percent math.
  const copies = 3; // how many times projects are duplicated
  const middleCopy = Math.floor(copies / 2);

  const [currentIndex, setCurrentIndex] = useState(0); // logical index for display (0..projects.length-1)
  const [activeIndex, setActiveIndex] = useState(projects.length * middleCopy); // index inside duplicated list
  const currentProject = projects[currentIndex];
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0); // in px while dragging
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [suppressTransition, setSuppressTransition] = useState(false);
  const [itemSpace, setItemSpace] = useState(0); // item width + gap in px

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Helper to compute current logical project from activeIndex
  useEffect(() => {
    setCurrentIndex(((activeIndex % projects.length) + projects.length) % projects.length);
  }, [activeIndex]);

  // Measure item width + gap after mount
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstItem = track.querySelector('[data-carousel-item]');
      if (!firstItem) return;
      const gapPx = 384; // matches the inline gap used in style
      const itemRect = firstItem.getBoundingClientRect();
      setItemSpace(Math.round(itemRect.width + gapPx));
      // initialize activeIndex to middle copy + currentIndex
      setActiveIndex(projects.length * middleCopy + currentIndex);
    };

    // measure on next frame to ensure DOM layout ready
    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute base translate (so that the active item is centered)
  const computeBaseTranslate = (idx) => {
    if (!containerRef.current || itemSpace === 0) return 0;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const itemHalf = itemSpace / 2;
    // position of item idx (0-based from left) -> x = idx * itemSpace + itemHalf
    const itemCenter = idx * itemSpace + itemHalf;
    // translate so that itemCenter ends up at centerX: translateX = centerX - itemCenter
    return Math.round(centerX - itemCenter);
  };

  // Move to next/prev by changing activeIndex; transitions handled via CSS transform
  const goTo = (newActiveIndex, withTransition = true) => {
    if (isTransitioning && withTransition) return;
    if (withTransition) setIsTransitioning(true);
    setActiveIndex(newActiveIndex);
  };

  const handleNext = () => {
    goTo(activeIndex + 1, true);
  };

  const handlePrev = () => {
    goTo(activeIndex - 1, true);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragStart === null) return;
    const diff = e.clientX - dragStart;
    // gentle multiplier to reduce sensitivity
    setDragOffset(diff * 0.6);
  };

  const finishSnap = (shouldGoNext) => {
    if (shouldGoNext) handleNext();
    else handlePrev();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // if we don't know itemSpace yet, just snap back
    if (itemSpace === 0) {
      setDragOffset(0);
      return;
    }
    const threshold = Math.max(40, itemSpace * 0.25); // require a decent drag to change

    // Determine how many item steps the user dragged (signed).
    // Positive dragOffset => user moved pointer right => we should move activeIndex left.
    let steps = 0;
    if (itemSpace > 0) {
      // Use rounding so larger drags move multiple items
      steps = Math.round(dragOffset / itemSpace);
    }

    // If user dragged past threshold but rounding gave 0 (e.g. small fraction of item width),
    // ensure at least one-step movement in the correct direction.
    if (steps === 0 && Math.abs(dragOffset) > threshold) {
      steps = dragOffset > 0 ? 1 : -1;
    }

    if (steps !== 0) {
      const target = activeIndex - steps; // subtract because positive steps mean move left
      goTo(target, true);
    } else {
      // not enough drag to change index: snap back to centered
      setIsTransitioning(true);
      // short timeout to allow CSS transition; onTransitionEnd will clear dragOffset
      setTimeout(() => {
        setIsTransitioning(false);
        setDragOffset(0);
      }, 260);
    }
    setDragStart(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, dragOffset]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-8 right-8 text-white/60 hover:text-white transition-colors z-50 p-2"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left navigation arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute left-8 top-1/2 -translate-y-1/2 group opacity-40 hover:opacity-100 transition-opacity z-40 p-3"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="1" strokeLinecap="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carousel content */}
        <div className="relative w-full h-full flex items-center justify-center px-24">
          {/* Images container - all three projects visible */}
          <div className="relative w-full h-3/4 max-w-6xl flex items-center justify-center overflow-hidden">
            {/* Container that slides all projects together - infinite loop (pixel math) */}
            <div
              ref={trackRef}
              className="flex items-center justify-center absolute"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTransitionEnd={() => {
                // After CSS transition finishes, we may need to normalize activeIndex
                setIsTransitioning(false);

                // normalize to middle copy if we drifted to edges
                if (activeIndex < projects.length) {
                  // moved too far left - jump forward by one block (without transition)
                  const corrected = activeIndex + projects.length;
                  setSuppressTransition(true);
                  setActiveIndex(corrected);
                  // next frame re-enable transitions
                  requestAnimationFrame(() => setSuppressTransition(false));
                } else if (activeIndex >= projects.length * (copies - 1)) {
                  // moved too far right - jump backward by one block
                  const corrected = activeIndex - projects.length;
                  setSuppressTransition(true);
                  setActiveIndex(corrected);
                  requestAnimationFrame(() => setSuppressTransition(false));
                }

                // ensure dragOffset is cleared after movement so the next drag starts fresh
                setDragOffset(0);
              }}
              style={{
                gap: '384px', // keep the same gap used for measurement
                transition: suppressTransition ? 'none' : (
                  isTransitioning
                    ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : isDragging
                      ? 'none'
                      : 'transform 0.28s ease-out'
                ),
                transform: (() => {
                  const base = computeBaseTranslate(activeIndex);
                  return `translateX(${base + dragOffset}px)`;
                })(),
                willChange: 'transform',
              }}
            >
              {/* Infinite carousel - render copies times */}
              {Array.from({ length: copies }).flatMap((_, cIndex) =>
                projects.map((project, pIndex) => {
                  const idx = cIndex * projects.length + pIndex;
                  const isActive = idx === activeIndex;
                  return (
                    <div key={`carousel-${idx}`} className="flex-shrink-0" data-carousel-item>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`object-cover rounded-sm shadow-2xl ${
                          isActive ? 'w-96 h-96 opacity-100' : 'w-80 h-96 opacity-40'
                        }`}
                        draggable={false}
                        style={{
                          transform: isActive && isDragging ? 'scale(0.98)' : 'scale(1)',
                          transition: 'transform 0.18s ease-out',
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Text overlay on image - centered bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-center z-20 pointer-events-none">
            <div
              style={{
                transition: isTransitioning 
                  ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
                  : 'opacity 0.2s ease-out',
                opacity: isDragging ? 0.5 : isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
              }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-2 select-none">
                {currentProject.title}
              </h2>
              <p className="text-xs text-white/60 uppercase tracking-widest select-none">
                {currentProject.client}
              </p>
            </div>
          </div>
        </div>

        {/* Right navigation arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity z-40 p-3"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="1" strokeLinecap="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom info bar */}
        <div 
          className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/50 backdrop-blur-sm z-30"
          style={{
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
          }}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            {/* Left - Project info */}
            <div className="flex-1">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Featured Project</p>
              <p className="text-sm text-white/80">{currentProject.description}</p>
            </div>

            {/* Center - Tags */}
            <div className="flex-1 px-8 flex flex-wrap gap-2 justify-center">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/60 border border-white/20 px-2 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Right - Links */}
            <div className="flex-1 flex justify-end gap-4">
              <a
                href={currentProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
                View
              </a>
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Github size={14} />
                Code
              </a>
            </div>

            {/* Counter */}
            <div className="text-xs text-white/40 ml-8 whitespace-nowrap">
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Drag hint - bottom center */}
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Drag or click arrows</div>
          <div className="flex justify-center gap-3 text-white/20">
            <span>←</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
