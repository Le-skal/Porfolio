import { X, ExternalLink, Github } from "lucide-react";
import React, { useState, useRef, useCallback } from "react";
import JsBackground from "./JsBackground";
import { CustomCloseButton } from "./CustomCloseButton";

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

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`;

// ProjectDetail component
const ProjectDetail = ({ project, onBack, onClose, scrollToBottom }) => {
  const detailRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showScrollGlow, setShowScrollGlow] = useState(false);
  // Ensure smooth entrance transition on mount
  const [isEntering, setIsEntering] = useState(true);

  React.useEffect(() => {
    // Use rAF to ensure the initial styles apply before transitioning
    const id = requestAnimationFrame(() => setIsEntering(false));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll to bottom on mount if requested
  React.useEffect(() => {
    if (scrollToBottom && contentRef.current) {
      // Scroll to bottom when returning from carousel
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    } else if (contentRef.current && !scrollToBottom) {
      // Scroll to top when opening a project detail normally
      contentRef.current.scrollTop = 0;
    }
  }, [scrollToBottom, contentRef]);

  const handleScroll = () => {
    if (!contentRef.current || !scrollIndicatorRef.current) return;

    const element = contentRef.current;
    const indicator = scrollIndicatorRef.current;

    // Get the position of the scroll indicator relative to the viewport
    const indicatorRect = indicator.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if we're actually scrolled down (not at top)
    const isScrolledDown = element.scrollTop > 50;

    // Show glow effect when indicator is close to triggering
    const distanceFromTop = indicatorRect.top;
    const triggerDistance = viewportHeight * 0.3;
    const glowStart = viewportHeight * 0.5;

    if (isScrolledDown && distanceFromTop < glowStart && distanceFromTop > 0) {
      setShowScrollGlow(true);
    } else {
      setShowScrollGlow(false);
    }

    // If indicator reaches top 30% of viewport AND we've scrolled down, trigger return
    if (isScrolledDown && distanceFromTop < triggerDistance) {
      handleBackClick();
    }
  };

  const handleBackClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onBack();
    }, 300);
  };

  return (
    <div
      ref={detailRef}
      className={`fixed inset-0 bg-black text-white overflow-hidden flex flex-col transition-all duration-300 ${isLeaving ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      style={isLeaving ? { animation: "detail-page-blur-out 0.8s ease-in forwards" } : {}}
    >
      {/* Background grain/shards behind images for dark-mode feel */}
      <JsBackground tint intensity={0.1} />

      {/* Scrollable Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{
          transform: isEntering ? "translateY(100px)" : "translateY(0)",
          opacity: isEntering ? 0 : 1,
          filter: isEntering ? "blur(15px)" : "blur(0)",
          transition:
            "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease-out, filter 0.8s ease-out",
          willChange: "transform, opacity, filter",
        }}
      >
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-12 max-w-6xl mx-auto">
          {/* Title */}
          <h1 className="text-6xl font-light mb-8 tracking-tight">{project.title}</h1>

          {/* Description */}
          <p className="text-2xl font-light leading-relaxed mb-16 text-white/90">
            {project.description}
          </p>

          {/* Project Meta Info */}
          <div className="grid grid-cols-4 gap-8 text-sm mb-16 pb-8 border-b border-white/10">
            <div>
              <h4 className="text-white/50 uppercase tracking-wider text-xs font-medium mb-2">Agency + Client</h4>
              <p className="text-white/80">{project.client}</p>
            </div>
            <div>
              <h4 className="text-white/50 uppercase tracking-wider text-xs font-medium mb-2">Role</h4>
              <p className="text-white/80">{project.tags.join(", ")}</p>
            </div>
            <div>
              <h4 className="text-white/50 uppercase tracking-wider text-xs font-medium mb-2">Date</h4>
              <p className="text-white/80">2024</p>
            </div>
            <div className="flex items-end">
              <a
                href={project.demoUrl}
                className="px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-wider font-medium"
              >
                Launch Site →
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="px-12 max-w-6xl mx-auto py-12">
          <div className="space-y-8">
            {/* Main project image */}
            <div className="rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Project Details */}
            <div className="py-12 space-y-12">
              <div>
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-6">About Project</h3>
                <div className="text-white/70 leading-relaxed space-y-4 text-lg">
                  {loremIpsum.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="py-12 border-t border-white/10">
                <h3 className="text-4xl font-light mb-8">Results</h3>
                <p className="text-xl font-light leading-relaxed text-white/80">
                  ah.
                  Through strategic planning, creative direction, and meticulous execution, we've delivered
                  a solution that not only meets but exceeds expectations, setting new standards in the industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-12 max-w-6xl mx-auto py-16 pb-24 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-xs uppercase tracking-wider text-white/30">Scroll for menu</span>
              <div
                ref={scrollIndicatorRef}
                className="flex-1 h-px bg-white/10 transition-all duration-300"
                style={showScrollGlow ? {
                  animation: "scroll-indicator-glow 1.5s ease-in-out infinite",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 0 20px 8px rgba(255, 255, 255, 0.2)"
                } : {}}
              ></div>
            </div>
            <a
              href={project.githubUrl}
              className="px-8 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-wider font-medium ml-8"
            >
              GitHub →
            </a>
          </div>
        </div>

        {/* Extra blank space at the end */}
        <div className="h-150"></div>
      </div>
    </div>
  );
};

export const ProjectsModal = ({ onClose }) => {
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [isCarouselEntering, setIsCarouselEntering] = useState(true);
  const [carouselItems, setCarouselItems] = useState(() => {
    // Create carousel with 5 copies of the projects for infinite scrolling
    // With 3 projects, this creates 15 items total
    const items = [];
    for (let i = 0; i < 5; i++) {
      projects.forEach((project) => {
        items.push({ ...project, carouselId: `${project.id}-${i}` });
      });
    }
    // Don't rotate - keep original order so items are on both sides
    return items;
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [isHoveringArrows, setIsHoveringArrows] = useState(null); // 'left', 'right', or null
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [imageRotation, setImageRotation] = useState({ x: 0, y: 0 });
  const [isMinimizingCarousel, setIsMinimizingCarousel] = useState(false);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [baseOffset, setBaseOffset] = useState(0);

  const centerIndex = Math.floor(carouselItems.length / 2);
  const [virtualCenter, setVirtualCenter] = useState(() => Math.floor(carouselItems.length / 2));
  const [animStage, setAnimStage] = useState("idle"); // 'idle' | 'scaleDown' | 'scaleUp' | 'translating'

  const currentProject = carouselItems[virtualCenter];
  const projectIndex = projects.findIndex((p) => p.id === currentProject.id);

  // Separate state for close button to prevent re-renders affecting it
  const handleCloseClick = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 800); // Wait for cross and button fade + carousel animation
  };

  // Helper to calculate the distance between two adjacent items (step)
  const getStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    const a = track.children[0].getBoundingClientRect();
    const b = track.children[1].getBoundingClientRect();
    return b.left - a.left;
  };

  // Center the middle item on mount and on resize
  React.useEffect(() => {
    const recalc = () => {
      const track = trackRef.current;
      if (!track) return;
      const centerItem = track.children[centerIndex];
      if (!centerItem) return;
      const rect = centerItem.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const delta = window.innerWidth / 2 - centerX;
      setBaseOffset(delta);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [centerIndex, carouselItems]);

  // keep virtualCenter synced when carouselItems length/structure changes
  React.useEffect(() => {
    setVirtualCenter(Math.floor(carouselItems.length / 2));
  }, [carouselItems.length]);


  const handleNext = useCallback(() => {
    if (isTransitioning || animStage !== "idle") return;
    setIsTransitioning(true);
    const step = getStep();
    const center = virtualCenter;

    // 1) scale current down
    setAnimStage("scaleDown");

    setTimeout(() => {
      // 2) make next item visually big
      setVirtualCenter(center + 1);
      setAnimStage("scaleUp");

      setTimeout(() => {
        // 3) translate so the big item moves into center
        setAnimStage("translating");
        // clear any lingering dragOffset so transform animates from the current dragged position
        setDragOffset(0);
        setTranslateX((prev) => prev - step);

        setTimeout(() => {
          // rotate items after animation
          setCarouselItems((prev) => {
            const newItems = [...prev];
            const firstItem = newItems.shift();
            newItems.push(firstItem);
            return newItems;
          });
          setTranslateX(0);
          // reset virtual center back to middle index
          setVirtualCenter(Math.floor(carouselItems.length / 2));
          setAnimStage("idle");
          setIsTransitioning(false);
        }, 800);
      }, 150);
    }, 150);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || animStage !== "idle") return;
    setIsTransitioning(true);
    const step = getStep();
    const center = virtualCenter;

    // 1) scale current down
    setAnimStage("scaleDown");

    setTimeout(() => {
      // 2) make previous item visually big
      setVirtualCenter(center - 1);
      setAnimStage("scaleUp");

      setTimeout(() => {
        // 3) translate so the big item moves into center
        setAnimStage("translating");
        // clear any lingering dragOffset so transform animates from the current dragged position
        setDragOffset(0);
        setTranslateX((prev) => prev + step);

        setTimeout(() => {
          // rotate items after animation
          setCarouselItems((prev) => {
            const newItems = [...prev];
            const lastItem = newItems.pop();
            newItems.unshift(lastItem);
            return newItems;
          });
          setTranslateX(0);
          // reset virtual center back to middle index
          setVirtualCenter(Math.floor(carouselItems.length / 2));
          setAnimStage("idle");
          setIsTransitioning(false);
        }, 800);
      }, 150);
    }, 150);
  }, [isTransitioning]);

  // Click-to-jump: move the carousel by n items (positive => to the right/next, negative => to the left/prev)
  const handleMoveBy = useCallback((n) => {
    if (!n) return;
    if (isTransitioning || animStage !== "idle") return;

    const step = getStep();
    const itemsToMove = Math.abs(n);
    if (!step || itemsToMove === 0) return;

    setIsTransitioning(true);
    const center = virtualCenter;
    const movingPrev = n < 0;
    const totalStep = step * itemsToMove;

    // 1) scale current down
    setAnimStage("scaleDown");

    setTimeout(() => {
      // 2) promote target visually
      setVirtualCenter(movingPrev ? center - itemsToMove : center + itemsToMove);
      setAnimStage("scaleUp");

      setTimeout(() => {
        // 3) translate track so the promoted item slides to center
        setAnimStage("translating");
        setDragOffset(0);
        setTranslateX((prev) => prev + (movingPrev ? totalStep : -totalStep));

        setTimeout(() => {
          // 4) rotate array by itemsToMove in the right direction
          setCarouselItems((prev) => {
            const newItems = [...prev];
            if (movingPrev) {
              for (let i = 0; i < itemsToMove; i++) {
                const last = newItems.pop();
                newItems.unshift(last);
              }
            } else {
              for (let i = 0; i < itemsToMove; i++) {
                const first = newItems.shift();
                newItems.push(first);
              }
            }
            return newItems;
          });

          // reset transforms and states
          setTranslateX(0);
          setVirtualCenter(Math.floor(carouselItems.length / 2));
          setAnimStage("idle");
          setIsTransitioning(false);
        }, 800);
      }, 150);
    }, 150);
  }, [isTransitioning, animStage, virtualCenter, carouselItems.length]);

  const handleMouseDown = (e) => {
    if (isTransitioning || animStage !== "idle") return;
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
    // immediately scale the current item down for drag feedback
    setAnimStage("scaleDown");
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || dragStart === null) return;
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const step = getStep() || 1; // pixels between adjacent items
    const dragThreshold = 50;

    const dragDistance = Math.abs(dragOffset);
    let itemsToMove = Math.floor(dragDistance / step);
    if (dragDistance > dragThreshold && itemsToMove === 0) itemsToMove = 1;

    // if not enough drag, just reset scale
    if (dragDistance <= dragThreshold) {
      setAnimStage("idle");
      setDragStart(null);
      setDragOffset(0);
      return;
    }

    if (isTransitioning || animStage !== "scaleDown") {
      // already animating or not in correct stage
      setDragStart(null);
      setDragOffset(0);
      return;
    }

    setIsTransitioning(true);
    const center = virtualCenter;
    const totalStep = step * Math.max(1, itemsToMove);

    // direction: dragOffset > 0 => dragged right => move prev; else move next
    const movingPrev = dragOffset > 0;

    // continue the same 3-stage sequence used for arrows
    setTimeout(() => {
      // promote the target item visually
      setVirtualCenter(movingPrev ? center - itemsToMove : center + itemsToMove);
      setAnimStage("scaleUp");

      setTimeout(() => {
        // translate by totalStep
        setAnimStage("translating");
        // clear any lingering dragOffset so transform animates from the current dragged position
        const currentDrag = dragOffset;
        setDragOffset(0);
        // When clearing dragOffset, we still want to move by totalStep from the current visual position.
        // Setting translateX by desiredMove will animate from (prev + currentDrag) to (prev + desiredMove).
        setTranslateX((prev) => prev + (movingPrev ? totalStep : -totalStep));

        setTimeout(() => {
          // rotate array by itemsToMove in the correct direction
          setCarouselItems((prev) => {
            const newItems = [...prev];
            if (movingPrev) {
              for (let i = 0; i < Math.max(1, itemsToMove); i++) {
                const last = newItems.pop();
                newItems.unshift(last);
              }
            } else {
              for (let i = 0; i < Math.max(1, itemsToMove); i++) {
                const first = newItems.shift();
                newItems.push(first);
              }
            }
            return newItems;
          });

          setTranslateX(0);
          setVirtualCenter(Math.floor(carouselItems.length / 2));
          setAnimStage("idle");
          setIsTransitioning(false);
          setDragStart(null);
          setDragOffset(0);
        }, 800);
      }, 150);
    }, 150);
  }, [isDragging, dragOffset, animStage, isTransitioning, virtualCenter, carouselItems.length]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // Add mouse move and up listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleOpenProjectDetail = (project) => {
    setSelectedProject(project);
    setIsMinimizingCarousel(true);
  };

  const handleBackToCarousel = () => {
    setShowProjectDetail(false);
    setScrollToBottom(false);
    setIsCarouselEntering(true);
    setIsMinimizingCarousel(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 600);
  };

  // Reset entrance animation after it completes
  React.useEffect(() => {
    if (isCarouselEntering) {
      const timer = setTimeout(() => {
        setIsCarouselEntering(false);
      }, 2000); // Match animation duration + stagger
      return () => clearTimeout(timer);
    }
  }, [isCarouselEntering]);

  // Handle carousel minimization and project detail reveal
  React.useEffect(() => {
    if (isMinimizingCarousel) {
      const timer = setTimeout(() => {
        setShowProjectDetail(true);
        setIsMinimizingCarousel(false);
      }, 650); // Wait for carousel minimization animation to complete
      return () => clearTimeout(timer);
    }
  }, [isMinimizingCarousel]);

  const containerRefForScroll = useRef(null);

  // Show project detail page if selected
  if (showProjectDetail && selectedProject) {
    return (
      <>
        {/* Close button overlay - always visible, independent layer */}
        <CustomCloseButton onClick={handleCloseClick} isClosing={isClosing} />

        {/* Project detail page */}
        <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-800 ${isClosing ? "opacity-0" : "opacity-100"}`}>
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToCarousel}
            onClose={handleCloseClick}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Close button overlay - always visible, independent layer */}
      <CustomCloseButton onClick={handleCloseClick} isClosing={isClosing} />

      {/* Carousel container */}
      <div
        ref={containerRefForScroll}
        className={`fixed inset-0 z-40 bg-black flex flex-col overflow-hidden transition-all duration-600 ${isMinimizingCarousel || isClosing ? "opacity-0" : showProjectDetail ? "opacity-0" : "opacity-100"
          }`}
        style={
          !showProjectDetail && selectedProject && !isMinimizingCarousel
            ? { animation: "carousel-reveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }
            : isCarouselEntering
              ? { animation: "carousel-bg-fade 0.8s ease-out forwards" }
              : {}
        }
        onClick={handleCloseClick}
      >
        {/* Background grain/shards behind images for dark-mode feel */}
        <JsBackground tint intensity={0.1} />

        {/* Main carousel container */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing select-none relative w-full"
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Carousel track */}
          <div
            ref={trackRef}
            className="flex items-center gap-4"
            style={{
              transition: isTransitioning ? "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
              transform: `translateX(${baseOffset + translateX + dragOffset}px)`,
            }}
          >
            {carouselItems.map((item, idx) => {
              // Calculate stagger delay based on distance from center
              const distanceFromCenter = Math.abs(idx - virtualCenter);
              const staggerDelay = distanceFromCenter * 0.1; // 100ms per item

              // Different animation for center vs side items to match final scales
              const animationStyle = isCarouselEntering
                ? idx === virtualCenter
                  ? `imageGrowInCenter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}s both`
                  : `imageGrowInSide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}s both`
                : "none";

              return (
                <div
                  key={item.carouselId}
                  className={`flex-shrink-0 relative rounded-lg transition-all duration-600 ${
                    // clickable center image (open detail) OR side images (jump)
                    (idx === virtualCenter && animStage !== "scaleDown" && !isDragging && !isTransitioning) ||
                      (idx !== virtualCenter && animStage === "idle" && !isDragging && !isTransitioning)
                      ? "cursor-pointer hover:brightness-150"
                      : ""
                    }`}
                  onClick={() => {
                    // Center image: open project detail
                    if (
                      idx === virtualCenter &&
                      animStage !== "scaleDown" &&
                      !isDragging &&
                      !isTransitioning
                    ) {
                      const originalProject = projects.find((p) => p.id === item.id);
                      handleOpenProjectDetail(originalProject);
                      return;
                    }

                    // Side images: jump to that item by sliding n steps
                    if (!isDragging && !isTransitioning && animStage === "idle") {
                      const diff = idx - virtualCenter; // positive => move next, negative => move prev
                      if (diff !== 0) handleMoveBy(diff);
                    }
                  }}
                  style={{
                    width: "45vw",
                    height: "50vh",
                    // Only apply transform if NOT animating on entrance, to avoid conflicts with animation
                    transform: isCarouselEntering
                      ? "none"
                      : animStage === "scaleDown"
                        ? idx === virtualCenter
                          ? "scale(0.9)"
                          : "scale(0.9)"
                        : idx === virtualCenter
                          ? "scale(1.25)"
                          : "scale(0.9)",
                    opacity: isCarouselEntering ? undefined : idx === virtualCenter && animStage !== "scaleDown" ? 1 : 0.3,
                    zIndex: idx === virtualCenter && animStage !== "scaleDown" ? 20 : 10,
                    filter: isCarouselEntering ? "brightness(1)" : idx === virtualCenter && animStage !== "scaleDown" ? "brightness(1.2)" : "brightness(0.8)",
                    boxSizing: "border-box",
                    overflow: "visible",
                    perspective: "1000px",
                    animation: animationStyle,
                    transition: isCarouselEntering ? "none" : "all 0.6s ease-out",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain block"
                    draggable={false}
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => {
                      setIsHoveringImage(false);
                      setImageRotation({ x: 0, y: 0 });
                    }}
                    onMouseMove={(e) => {
                      if (idx === virtualCenter && isHoveringImage) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = (centerY - y) / 35;
                        const rotateY = (x - centerX) / 35;
                        setImageRotation({ x: rotateX, y: rotateY });
                      }
                    }}
                    style={{
                      transform:
                        isMinimizingCarousel && idx === virtualCenter
                          ? "scale(0.3)"
                          : idx === virtualCenter && isDragging
                            ? "scale(0.98)"
                            : idx === virtualCenter && isHoveringImage
                              ? `scale(1.05) rotateX(${imageRotation.x}deg) rotateY(${imageRotation.y}deg)`
                              : "scale(1)",
                      transition: isDragging ? "none" : isMinimizingCarousel ? "transform 0.6s ease-out" : isHoveringImage ? "transform 0.05s ease-out" : "transform 0.3s ease-out",
                      paddingLeft: "2vw",
                      paddingRight: "2vw",
                      paddingTop: "2vh",
                      paddingBottom: "2vh",
                      height: "100%",
                      transformStyle: "preserve-3d",
                    }}
                  />
                </div>
              );
            })}
          </div>


        </div>

        {/* Footer removed per user request - keeps modal cleaner */}

        {/* Bottom navigation with connected arrows */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent"
          style={{ height: "15%" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Single arrow element <---> that responds to clicks on arrow tips */}
          <button
            className="relative flex items-center justify-center cursor-pointer transition-all"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              width: "fit-content",
              height: "fit-content",
            }}
            onMouseEnter={() => setIsHoveringArrows('both')}
            onMouseLeave={() => setIsHoveringArrows(null)}
          >
            {/* Centered double-sided arrow */}
            <img
              src="https://static.thenounproject.com/png/785425-200.png"
              alt="navigation arrows"
              className="cursor-pointer"
              style={{
                width: "10vw",
                height: "5vw",
                filter: isHoveringArrows ? 'invert(1) brightness(1.2)' : 'invert(1) brightness(0.8)',
                transform: isHoveringArrows ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s ease-out, clip-path 0.2s ease-out',
                zIndex: 60,
                clipPath: isHoveringArrows === 'right' ? 'inset(0 0 0 50%)' : isHoveringArrows === 'left' ? 'inset(0 50% 0 0)' : 'inset(0)',
              }}
            />

            {/* Hidden clickable areas for left and right navigation */}
            <div
              className="absolute cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlePrev();
              }}
              onMouseEnter={() => setIsHoveringArrows('left')}
              onMouseLeave={() => setIsHoveringArrows('both')}
              style={{
                left: 0,
                top: 0,
                bottom: 0,
                width: "50%",
                zIndex: 70,
                background: "transparent",
              }}
            />
            <div
              className="absolute cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleNext();
              }}
              onMouseEnter={() => setIsHoveringArrows('right')}
              onMouseLeave={() => setIsHoveringArrows('both')}
              style={{
                right: 0,
                top: 0,
                bottom: 0,
                width: "50%",
                zIndex: 70,
                background: "transparent",
              }}
            />
          </button>

          {/* Instructions hint */}
          <div className="text-center pointer-events-none" style={{ marginTop: "2vh" }}>
            <p className="uppercase tracking-widest" style={{ fontSize: "1vw", color: "rgba(255, 255, 255, 0.2)" }}>
              Drag • Click Arrows
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
