"use client";

import {
  ComponentType,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import {
  Activity,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  BrainCircuit,
  ChartNoAxesCombined,
  Code2,
  Cpu,
  Database,
  Download,
  Eye,
  GitBranch,
  LineChart,
  Mail,
  MessageSquareQuote,
  Network,
  Send,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "AI-Based Sign Language Translator",
    subtitle: "Accessibility AI Platform",
    href: "https://github.com/bhargav2601-art/Ai-based-Sign-Language-Translator.git",
    visual: "vision",
    status: "Inference Active",
    cta: "Explore System",
    stack: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
    points: [
      "Real-time gesture intelligence system for accessibility-focused communication.",
      "Human-centered interface translating sign language into natural spoken output.",
      "Production-ready visual inference tuned for low-latency interaction.",
    ],
    metrics: [
      "Real-time gesture inference",
      "Low-latency CV pipeline",
      "Accessibility-focused architecture",
    ],
  },
  {
    title: "AI Workflow Automation Systems",
    subtitle: "Autonomous Ops Engine",
    href: "https://github.com/bhargav2601-art/n8n-works.git",
    visual: "workflow",
    status: "Automation Running",
    cta: "View Architecture",
    stack: ["n8n", "OpenAI", "Telegram", "WhatsApp"],
    points: [
      "Intelligent automation agent integrating conversational AI workflows.",
      "Cross-channel orchestration layer for Telegram, WhatsApp, and voice pipelines.",
      "Operational system reducing repetitive manual tasks with adaptive AI agents.",
    ],
    metrics: [
      "Multi-platform orchestration",
      "AI-powered routing system",
      "Conversational workflow intelligence",
    ],
  },
  {
    title: "Loan Approval Prediction System",
    subtitle: "Finance Intelligence Model",
    href: "https://github.com/bhargav2601-art/-Loan-Approval-System-.git",
    visual: "finance",
    status: "Model Online",
    cta: "See Case Study",
    stack: ["Python", "SQL", "Machine Learning", "Pandas"],
    points: [
      "Decision intelligence engine for risk-aware lending workflows.",
      "Robust ML pipeline combining preprocessing, modeling, and confidence scoring.",
      "Interpretability-first architecture for transparent financial recommendations.",
    ],
    metrics: [
      "Explainable AI scoring",
      "Risk-aware classification",
      "Financial analytics engine",
    ],
  },
];

type CapabilityItem = {
  title: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
};

type SkillCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
};

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const capabilities: CapabilityItem[] = [
  {
    title: "Machine Learning Systems",
    description:
      "Designing and deploying intelligent ML models for prediction, classification, and real-world decision-making systems.",
    tech: ["Python", "Scikit-learn", "TensorFlow", "Pandas"],
    icon: BrainCircuit,
  },
  {
    title: "Computer Vision",
    description:
      "Building real-time visual intelligence systems using gesture recognition, object detection, and AI-powered image analysis.",
    tech: ["OpenCV", "MediaPipe", "Deep Learning"],
    icon: Eye,
  },
  {
    title: "AI Automation Workflows",
    description:
      "Creating intelligent automation systems integrating LLMs, APIs, messaging platforms, and business workflows.",
    tech: ["n8n", "OpenAI API", "Telegram Bots", "Twilio"],
    icon: Workflow,
  },
  {
    title: "AI Agents & Chat Systems",
    description:
      "Developing conversational AI assistants and intelligent multi-step automation agents.",
    tech: ["OpenAI", "AI Agents", "Workflow Logic"],
    icon: Bot,
  },
  {
    title: "Data Science & Analytics",
    description:
      "Transforming raw data into actionable insights through analytics, preprocessing, visualization, and predictive systems.",
    tech: ["SQL", "Excel", "Pandas", "Data Analysis"],
    icon: Database,
  },
  {
    title: "Full AI Product Development",
    description:
      "Building complete AI-powered applications from backend intelligence to modern frontend user experiences.",
    tech: ["React", "Next.js", "APIs", "AI Integration"],
    icon: Network,
  },
];

const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    description:
      "Modeling, perception, and intelligent decision systems for production AI applications.",
    icon: BrainCircuit,
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "YOLOv8",
      "Machine Learning",
      "Computer Vision",
    ],
  },
  {
    title: "AI Automation & APIs",
    description:
      "LLM-powered workflows, connected APIs, agents, and automated business processes.",
    icon: Workflow,
    skills: ["n8n", "OpenAI API", "AI Agents", "Workflow Automation"],
  },
  {
    title: "Frontend & Development",
    description:
      "Modern interfaces and web foundations for complete AI-powered product experiences.",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "Database & Tools",
    description:
      "Data persistence, version control, and engineering tooling for reliable development.",
    icon: GitBranch,
    skills: ["SQL", "Databases", "Git", "GitHub"],
  },
  {
    title: "Soft Skills",
    description:
      "Collaboration, fast learning, creative execution, and research-minded problem solving.",
    icon: Sparkles,
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Creative Thinking",
      "Fast Learning Ability",
      "Communication Skills",
      "Project Management",
      "Innovation & Research Mindset",
    ],
  },
];

const suggestedPrompts = [
  "Explain your AI workflow systems",
  "Tell me about your ML projects",
  "What technologies do you specialize in?",
  "Describe your computer vision work",
  "Explain your automation architecture",
];

const blogPosts = [
  {
    title: "Building Production AI Agents",
    excerpt:
      "How agentic workflows combine prompts, tools, memory, validation, and automation logic for real AI products.",
    author: "Bhargav K · AI Engineer",
    category: "AI Agents",
    date: "May 24, 2026",
    readTime: "7 min read",
    thumbnail: "/blog/ai-agents.svg",
    thumbnailAlt: "AI agent orchestration interface with glowing connected nodes",
    featured: true,
  },
  {
    title: "Designing AI Workflow Systems",
    excerpt:
      "A practical look at n8n, APIs, routing layers, and LLM orchestration for business automation.",
    author: "Bhargav K · AI Engineer",
    category: "Automation",
    date: "May 18, 2026",
    readTime: "6 min read",
    thumbnail: "/blog/workflow-systems.svg",
    thumbnailAlt: "AI workflow automation canvas with routed model and channel nodes",
  },
  {
    title: "Real-Time Gesture Recognition",
    excerpt:
      "Building low-latency computer vision systems with OpenCV, MediaPipe, and accessible UX patterns.",
    author: "Bhargav K · AI Engineer",
    category: "Computer Vision",
    date: "May 11, 2026",
    readTime: "5 min read",
    thumbnail: "/blog/gesture-recognition.svg",
    thumbnailAlt: "Computer vision hand landmark detection interface",
  },
  {
    title: "AI Automation with n8n",
    excerpt:
      "Connecting OpenAI, messaging platforms, and workflow nodes into reliable automation pipelines.",
    author: "Bhargav K · AI Engineer",
    category: "AI Automation",
    date: "May 3, 2026",
    readTime: "5 min read",
    thumbnail: "/blog/n8n-automation.svg",
    thumbnailAlt: "Connected AI automation workflow cards and routing paths",
  },
  {
    title: "Computer Vision for Accessibility",
    excerpt:
      "Designing visual intelligence systems that translate interaction into practical assistive experiences.",
    author: "Bhargav K · AI Engineer",
    category: "ML Systems",
    date: "Apr 27, 2026",
    readTime: "6 min read",
    thumbnail: "/blog/cv-accessibility.svg",
    thumbnailAlt: "Accessible computer vision system translating hand movement",
  },
];

const sectionClass = "mx-auto w-full max-w-6xl px-6 py-20 md:px-10";

type SocialLinkItem = {
  label: string;
  href: string;
  icon: IconType;
};

type DockItem = {
  target: string;
  label: string;
  icon: LucideIcon;
};

function LazyInView({
  children,
  fallback,
  className,
  rootMargin = "560px 0px",
}: {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

function ProjectPreviewSkeleton() {
  return (
    <div className="project-preview project-preview-skeleton" aria-hidden="true">
      <div className="skeleton-line skeleton-line-short" />
      <div className="skeleton-block" />
      <div className="skeleton-row">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

const socialLinks: SocialLinkItem[] = [
  {
    label: "Gmail",
    href: "mailto:kbhargav924@gmail.com",
    icon: FiMail,
  },
  {
    label: "GitHub",
    href: "https://github.com/bhargav2601-art",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhargav-k-bab841296",
    icon: FiLinkedin,
  },
];

function ProjectPreview({ visual }: { visual: (typeof projects)[number]["visual"] }) {
  if (visual === "vision") {
    return (
      <div className="project-preview project-preview-vision">
        <div className="preview-toolbar">
          <span className="preview-dot bg-red-300" />
          <span className="preview-dot bg-orange-300" />
          <span className="preview-dot bg-cyan-300" />
          <span className="ml-auto text-[10px] tracking-[0.18em] text-cyan-100">
            CV STREAM
          </span>
        </div>
        <div className="vision-frame">
          <div className="vision-bounds" />
          <div className="hand-landmarks">
            {[0, 1, 2, 3, 4, 5, 6].map((node) => (
              <span key={node} className={`hand-node hand-node-${node}`} />
            ))}
            <span className="hand-line hand-line-a" />
            <span className="hand-line hand-line-b" />
            <span className="hand-line hand-line-c" />
          </div>
          <div className="inference-pill">Gesture: Hello</div>
          <div className="subtitle-panel">Translating sign to speech...</div>
          <div className="audio-wave">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
              <span key={bar} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (visual === "workflow") {
    return (
      <div className="project-preview project-preview-workflow">
        <div className="workflow-canvas">
          {["Trigger", "OpenAI", "Router", "Telegram", "WhatsApp"].map(
            (node, index) => (
              <div key={node} className={`workflow-node workflow-node-${index}`}>
                <span className="workflow-node-dot" />
                {node}
              </div>
            ),
          )}
          <span className="workflow-line workflow-line-a" />
          <span className="workflow-line workflow-line-b" />
          <span className="workflow-line workflow-line-c" />
          <span className="workflow-line workflow-line-d" />
          <div className="chat-overlay">
            <span>AI Agent</span>
            <p>Routing lead to automation flow</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-preview project-preview-finance">
      <div className="finance-header">
        <span>Approval Probability</span>
        <strong>87%</strong>
      </div>
      <div className="confidence-meter">
        <span />
      </div>
      <div className="finance-grid">
        <div className="score-orb">
          <span>AI</span>
          <strong>742</strong>
        </div>
        <div className="finance-bars">
          {[72, 52, 88, 64].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
      <div className="risk-strip">
        <span>Risk: Low</span>
        <span>Explainability: Active</span>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
  compact = false,
}: SocialLinkItem & { compact?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`social-link group ${compact ? "h-10 w-10" : "h-11 w-11"}`}
      aria-label={label}
    >
      <Icon className="size-4.5 text-slate-100" />
      <span className="tooltip-label">{label}</span>
    </a>
  );
}

export function PortfolioClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState("");
  const [activeDockTarget, setActiveDockTarget] = useState("about");
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);
  const [shouldRenderAmbientEffects, setShouldRenderAmbientEffects] = useState(false);
  const [NeuralCanvasComponent, setNeuralCanvasComponent] =
    useState<ComponentType | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Bhargav's portfolio AI assistant. Ask me about his AI projects, automation systems, skills, experience, or technical architecture.",
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const scheduleIdle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (callback: IdleRequestCallback) => window.setTimeout(callback, 900);
    const cancelIdle =
      "cancelIdleCallback" in window
        ? window.cancelIdleCallback
        : (id: number) => window.clearTimeout(id);

    const idleId = scheduleIdle(async () => {
      const neuralCanvasModule = await import("@/components/portfolio/NeuralCanvas");
      if (cancelled) return;
      setNeuralCanvasComponent(() => neuralCanvasModule.NeuralCanvas);
      setShouldRenderAmbientEffects(true);
    }, {
      timeout: 1600,
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId);
    };
  }, []);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const scheduleIdle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (callback: IdleRequestCallback) => window.setTimeout(callback, 700);
    const cancelIdle =
      "cancelIdleCallback" in window
        ? window.cancelIdleCallback
        : (id: number) => window.clearTimeout(id);

    const idleId = scheduleIdle(async () => {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const lenis = prefersReducedMotion
        ? null
        : new Lenis({ smoothWheel: true, duration: 0.9, lerp: 0.09 });

      let rafId = 0;
      if (lenis) {
        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }

      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
          gsap.fromTo(
            section,
            { y: 24 },
            {
              y: 0,
              ease: "power3.out",
              duration: 0.8,
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
          gsap.to(layer, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              scrub: 0.35,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.fromTo(
            group.children,
            { y: 16 },
            {
              y: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 88%",
              },
            },
          );
        });
      }

      const cleanupMagnetic: Array<() => void> = [];
      if (hasFinePointer) {
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((button) => {
          let moveFrame = 0;
          const onMove = (event: MouseEvent) => {
            if (moveFrame) return;
            moveFrame = requestAnimationFrame(() => {
              moveFrame = 0;
              const rect = button.getBoundingClientRect();
              const x = event.clientX - rect.left - rect.width / 2;
              const y = event.clientY - rect.top - rect.height / 2;
              gsap.to(button, { x: x * 0.12, y: y * 0.12, duration: 0.2 });
            });
          };
          const reset = () => gsap.to(button, { x: 0, y: 0, duration: 0.25 });
          button.addEventListener("mousemove", onMove, { passive: true });
          button.addEventListener("mouseleave", reset);
          cleanupMagnetic.push(() => {
            cancelAnimationFrame(moveFrame);
            button.removeEventListener("mousemove", onMove);
            button.removeEventListener("mouseleave", reset);
          });
        });
      }

      const cleanupTilt: Array<() => void> = [];
      if (hasFinePointer) {
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
          let tiltFrame = 0;
          const move = (event: MouseEvent) => {
            if (tiltFrame) return;
            tiltFrame = requestAnimationFrame(() => {
              tiltFrame = 0;
              const rect = card.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
              const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
              card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
              card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
              gsap.to(card, {
                rotateY: x * 3.5,
                rotateX: y * -3.5,
                transformPerspective: 1000,
                duration: 0.2,
                ease: "power2.out",
              });
            });
          };
          const leave = () =>
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.25, ease: "power2.out" });
          card.addEventListener("mousemove", move, { passive: true });
          card.addEventListener("mouseleave", leave);
          cleanupTilt.push(() => {
            cancelAnimationFrame(tiltFrame);
            card.removeEventListener("mousemove", move);
            card.removeEventListener("mouseleave", leave);
          });
        });
      }

      let glowFrame = 0;
      const onPointerMove = (event: MouseEvent) => {
        if (!glowRef.current || glowFrame || !hasFinePointer) return;
        glowFrame = requestAnimationFrame(() => {
          glowFrame = 0;
          glowRef.current?.style.setProperty("--mx", `${event.clientX}px`);
          glowRef.current?.style.setProperty("--my", `${event.clientY}px`);
        });
      };
      window.addEventListener("mousemove", onPointerMove, { passive: true });

      cleanup = () => {
        lenis?.destroy();
        cancelAnimationFrame(rafId);
        cancelAnimationFrame(glowFrame);
        cleanupMagnetic.forEach((clean) => clean());
        cleanupTilt.forEach((clean) => clean());
        window.removeEventListener("mousemove", onPointerMove);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId);
      cleanup();
    };
  }, []);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages, isChatLoading]);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection || shouldLoadHeroVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadHeroVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [shouldLoadHeroVideo]);

  useEffect(() => {
    if (!shouldLoadHeroVideo) return;

    const video = heroVideoRef.current;
    video?.load();
    void video?.play().catch(() => undefined);
  }, [shouldLoadHeroVideo]);

  const sendChatMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || isChatLoading) return;

    setChatInput("");
    setIsChatLoading(true);
    setChatMessages((current) => [
      ...current,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setChatMessages((current) => {
          const next = [...current];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });
      }
    } catch {
      setChatMessages((current) => {
        const next = [...current];
        next[next.length - 1] = {
          role: "assistant",
          content:
            "I could not reach the AI service right now. Bhargav specializes in ML, computer vision, OpenAI-powered automation, n8n workflows, and production-minded AI applications.",
        };
        return next;
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendChatMessage(chatInput);
  };

  const navItems = useMemo(
    () => [
      ["about", "About"],
      ["capabilities", "Capabilities"],
      ["skills", "Skills"],
      ["projects", "Projects"],
      ["experience", "Experience"],
      ["contact", "Contact"],
    ],
    [],
  );

  const dockItems = useMemo<DockItem[]>(
    () => [
      { target: "about", label: "About", icon: BrainCircuit },
      { target: "experience", label: "Experience", icon: BriefcaseBusiness },
      { target: "github-stats", label: "GitHub Stats", icon: ChartNoAxesCombined },
      { target: "projects", label: "Projects", icon: LineChart },
      { target: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
      { target: "blog", label: "Blog", icon: Code2 },
      { target: "assistant", label: "AI Assistant", icon: Bot },
      { target: "contact", label: "Contact", icon: Mail },
    ],
    [],
  );

  useEffect(() => {
    const sections = dockItems
      .map((item) => document.getElementById(item.target))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection?.target.id) {
          setActiveDockTarget(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-38% 0px -50% 0px",
        threshold: [0.08, 0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [dockItems]);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-[#050816] text-[#F5F7FA] selection:bg-cyan-400/20"
    >
      {shouldRenderAmbientEffects && NeuralCanvasComponent ? (
        <NeuralCanvasComponent />
      ) : null}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-0 cursor-glow"
      />
      <div
        data-parallax
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,107,0,0.2),transparent_42%),radial-gradient(circle_at_80%_28%,rgba(0,209,255,0.24),transparent_45%),linear-gradient(#050816,#050816)]"
      />
      <div className="noise-layer pointer-events-none fixed inset-0 z-0 opacity-20" />
      <div className="grid-layer pointer-events-none fixed inset-0 z-0 opacity-20" />

      <header className="fixed top-5 left-1/2 z-40 w-[92%] max-w-5xl -translate-x-1/2">
        <nav className="floating-nav flex items-center justify-between rounded-full border border-white/15 bg-[#0b1020]/70 px-5 py-3 backdrop-blur-2xl">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BrainCircuit className="size-4 text-cyan-300" />
            <span>AI Engineer</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map(([target, label]) => (
              <a
                key={target}
                href={`#${target}`}
                className="nav-link rounded-full px-4 py-2 text-xs tracking-[0.12em] text-slate-300"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              {socialLinks.map((item) => (
                <SocialLink key={item.label} {...item} compact />
              ))}
            </div>
            <Button size="default" variant="ghost" data-magnetic>
              Let&apos;s Build
            </Button>
          </div>
        </nav>
      </header>

      <section
        ref={heroSectionRef}
        className={`${sectionClass} hero-section relative isolate z-10 min-h-screen pt-32`}
      >
        <div className="hero-video-stage" aria-hidden="true">
          <Image
            src="/profile-pic.png"
            alt=""
            fill
            sizes="100vw"
            className={`hero-video-poster ${isHeroVideoReady ? "is-dimmed" : ""}`}
          />
          <video
            ref={heroVideoRef}
            className={`hero-intro-video ${isHeroVideoReady ? "is-ready" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onCanPlayThrough={() => setIsHeroVideoReady(true)}
            onLoadedData={() => setIsHeroVideoReady(true)}
          >
            {shouldLoadHeroVideo && (
              <source src="/hero-ai-engineer-intro.mp4" type="video/mp4" />
            )}
          </video>
          <div className="hero-video-gradient" />
          <div className="hero-video-scan" />
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hero-copy" data-stagger>
            <p className="mb-6 inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-500/10 px-4 py-2 text-xs tracking-[0.22em] text-cyan-200">
              AI ENGINEER • MACHINE LEARNING • AUTOMATION
            </p>
            <h1 className="hero-title max-w-3xl text-5xl font-semibold leading-[1.02] md:text-7xl xl:text-8xl">
              Building Intelligent AI Systems For Real-World Impact
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-300 md:text-lg">
              AI Engineer specializing in Machine Learning, Computer Vision, AI
              Automation, and intelligent workflow systems.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                data-magnetic
                className={buttonVariants({
                  size: "lg",
                  className: "hero-cta",
                })}
              >
                <Sparkles className="size-4" />
                Explore Projects
                <ArrowRight className="size-4" />
              </a>
              <a
                href="/bhargav-k-resume.pdf"
                download
                data-magnetic
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className: "hero-cta",
                })}
              >
                <Download className="size-4" />
                Download Resume
              </a>
            </div>
            <div className="social-dock mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0B1020]/65 px-4 py-3 backdrop-blur-xl">
              {socialLinks.map((item) => (
                <SocialLink key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-md lg:ml-auto"
            style={{ perspective: "1200px" }}
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#FF6B00]/30 via-transparent to-[#00D1FF]/30 blur-2xl" />
            <div className="hero-avatar-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1020]/90 p-3 shadow-[0_0_90px_rgba(0,0,0,0.72)]">
              <Image
                src="/profile-pic.png"
                alt="AI Engineer founder portrait"
                width={1023}
                height={1537}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 90vw, 520px"
                className="h-auto w-full rounded-[1.5rem] object-cover saturate-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_10%_40%,rgba(255,107,0,0.20),transparent_45%),radial-gradient(circle_at_88%_30%,rgba(0,209,255,0.28),transparent_46%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-cyan-300/30" />
              <div className="pointer-events-none absolute inset-y-4 -left-1 w-1 rounded-full bg-[#FF6B00]/70 blur-[2px]" />
              <div className="pointer-events-none absolute inset-y-10 -right-1 w-1 rounded-full bg-[#00D1FF]/70 blur-[2px]" />
              <div className="data-stream pointer-events-none absolute inset-x-5 top-6 h-[1px]" />
              <div className="data-stream delay pointer-events-none absolute inset-x-10 bottom-12 h-[1px]" />
            </div>

            <Card className="floating absolute -left-10 top-14 hidden w-52 md:block">
              <CardContent className="space-y-2 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                  LLM Architecture
                </p>
                <p className="text-sm text-slate-200">
                  Multi-agent orchestration and retrieval systems powering
                  actionable intelligence.
                </p>
              </CardContent>
            </Card>

            <Card className="floating absolute -right-10 bottom-16 hidden w-52 md:block">
              <CardContent className="space-y-2 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-orange-200/80">
                  Model Pipeline
                </p>
                <p className="text-sm text-slate-200">
                  Vision + NLP + automation pipeline in production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" data-reveal className={`${sectionClass} relative z-10`}>
        <h2 className="section-title">About</h2>
        <div className="section-copy space-y-5">
          <p>
            Hi, I&apos;m Bhargav K, an AI and Machine Learning enthusiast and
            engineering student at GMIT Davanagere with a strong passion for
            building real-world intelligent systems. I specialize in AI
            automation, workflow engineering, computer vision, and Generative AI
            applications.
          </p>
          <p>
            I enjoy transforming ideas into impactful solutions using
            technologies like Python, OpenAI APIs, n8n, Machine Learning, Deep
            Learning, and modern web technologies. I have worked on real-time
            projects including AI-powered automation systems, recommendation
            systems, sign language translators, voice assistants, and
            intelligent monitoring applications.
          </p>
          <p>
            My goal is to become a skilled AI Engineer who builds scalable and
            innovative AI products that solve real-world problems. I am
            continuously learning, experimenting, and improving my skills
            through projects, internships, hackathons, and hands-on development.
          </p>
        </div>
      </section>

      <section
        id="capabilities"
        data-reveal
        className={`${sectionClass} relative z-10 scroll-mt-28 overflow-hidden`}
      >
        <div className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-6 top-36 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

        <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/80">
          What I Build
        </p>
        <h2 className="section-title max-w-4xl">
          Engineering Intelligent Systems
          <span className="block">That Solve Real-World Problems</span>
        </h2>
        <p className="section-copy">
          I specialize in building AI-powered systems that combine machine
          learning, automation, computer vision, and scalable workflows to
          create impactful real-world solutions.
        </p>

        <div
          data-stagger
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <Card
                key={capability.title}
                data-tilt
                className="capability-card group relative min-h-[360px] overflow-hidden border-white/10 bg-[#0B1020]/70"
              >
                <div className="capability-holo pointer-events-none absolute inset-0" />
                <div className="capability-scan pointer-events-none absolute inset-x-0 top-0 h-20" />
                <div className="capability-particles pointer-events-none absolute inset-0" />
                <CardContent className="relative flex h-full flex-col p-6">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="capability-icon grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/8">
                      <Icon className="size-7 text-cyan-100" />
                    </div>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-cyan-100">
                      SYS 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold leading-tight text-white">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {capability.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/50 to-transparent" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Tech Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {capability.tech.map((tech) => (
                        <span
                          key={tech}
                          className="tech-indicator rounded-full border border-white/15 bg-white/6 px-3 py-1 text-[11px] text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        id="skills"
        data-reveal
        className={`${sectionClass} relative z-10 scroll-mt-28 overflow-hidden`}
      >
        <div className="skill-matrix-bg pointer-events-none absolute inset-0" />
        <div className="skill-network pointer-events-none absolute inset-x-6 top-36 h-[520px] opacity-70" />
        <div className="pointer-events-none absolute left-8 top-32 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-24 right-8 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/80">
              <Cpu className="size-4" />
              AI Capability Matrix
            </p>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-copy">
              Technologies, frameworks, and engineering capabilities used to
              build intelligent AI-powered systems and futuristic automation
              solutions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0B1020]/70 px-5 py-4 text-sm text-slate-300 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2 text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,209,255,0.9)]" />
              System Modules Online
            </div>
            <p>{skillCategories.length} categories / 27 technologies mapped</p>
          </div>
        </div>

        <div
          data-stagger
          className="relative mt-10 grid gap-5 lg:grid-cols-6"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.title}
                data-tilt
                className={`skill-category-card group relative overflow-hidden border-white/10 bg-[#0B1020]/72 ${
                  index < 2 ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <div className="skill-card-grid pointer-events-none absolute inset-0" />
                <div className="skill-card-scan pointer-events-none absolute inset-x-0 top-0 h-24" />
                <div className="skill-orbit pointer-events-none absolute right-6 top-6 size-24 rounded-full" />
                <CardContent className="relative p-6">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="skill-icon-shell grid size-13 place-items-center rounded-2xl border border-white/15 bg-white/8">
                        <Icon className="size-6 text-cyan-100" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-orange-200/75">
                          Module 0{index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] tracking-[0.18em] text-cyan-100">
                      ACTIVE
                    </span>
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-slate-300">
                    {category.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-capsule group/skill relative rounded-full border border-white/15 bg-white/6 px-4 py-2 text-sm text-slate-100"
                      >
                        <span className="skill-capsule-light" />
                        <span className="relative z-10">{skill}</span>
                        <span className="skill-tooltip pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-56 -translate-x-1/2 rounded-xl border border-cyan-300/20 bg-[#08101f]/95 px-3 py-2 text-xs leading-5 text-slate-200 opacity-0 shadow-[0_0_24px_rgba(0,209,255,0.18)] backdrop-blur-xl transition-all duration-200 group-hover/skill:-translate-y-1 group-hover/skill:opacity-100">
                          {category.description}
                        </span>
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        id="projects"
        data-reveal
        className={`${sectionClass} relative z-10 scroll-mt-28`}
      >
        <h2 className="section-title">Featured Projects</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              data-tilt
              className="project-card group relative overflow-hidden border-white/20 bg-[#0B1020]/78 transition-all duration-300 hover:border-cyan-300/35"
            >
              <div className="project-holo pointer-events-none absolute inset-0" />
              <div className="project-orbit pointer-events-none absolute -top-10 right-2 h-32 w-32 rounded-full bg-cyan-400/15 blur-2xl" />
              <div className="project-orbit delay pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-orange-400/15 blur-2xl" />
              <CardContent className="relative flex h-full flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {project.subtitle}
                    </p>
                    <h3 className="text-lg font-semibold leading-tight text-white">
                      {project.title}
                    </h3>
                  </div>
                  <span className="project-status">
                    <span />
                    {project.status}
                  </span>
                </div>

                <LazyInView fallback={<ProjectPreviewSkeleton />}>
                  <ProjectPreview visual={project.visual} />
                </LazyInView>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="project-tech-icon rounded-full border border-white/15 bg-white/6 px-3 py-1 text-[11px] tracking-wide text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {project.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-2">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="project-metric">
                      <Activity className="size-3.5 text-cyan-200" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="project-cta mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-cyan-100"
                >
                  {project.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="experience" data-reveal className={`${sectionClass} relative z-10`}>
        <h2 className="section-title">Experience</h2>
        <Card className="mt-8 border-white/15 bg-[#0B1020]/75">
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200/80">
                2026
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Data Science Intern
              </h3>
              <p className="mt-2 text-slate-300">
                ECHO Brains Technologies Pvt Ltd | Bangalore, India
              </p>
            </div>

            <ul className="grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-2">
              {[
                "Worked on real-world Data Science and AI-based applications during the internship program.",
                "Performed data preprocessing, cleaning, and visualization using Python libraries.",
                "Assisted in Machine Learning model development, testing, and performance evaluation.",
                "Collaborated with development and AI teams on analytics and automation-related tasks.",
                "Gained hands-on experience with AI workflows, software development practices, and industry-level project execution.",
                "Learned practical implementation of Data Analytics, Machine Learning, and Automation concepts.",
                "Participated in problem-solving, debugging, and project discussions within agile development environments.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "Machine Learning",
                "Data Analysis",
                "Data Visualization",
                "Artificial Intelligence",
                "Automation Workflows",
                "Problem Solving",
                "Team Collaboration",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section data-reveal className={`${sectionClass} relative z-10`}>
        <h2 className="section-title">Certifications / Achievements</h2>
        <Card className="mt-8 border-white/15 bg-[#0B1020]/75">
          <CardContent>
            <ul className="grid gap-4 text-sm leading-6 text-slate-300 md:grid-cols-2">
              {[
                "Machine Learning Internship Certificate — CodeAlpha (2025)",
                "Tableau for Beginners — Udemy / Coursera (2024)",
                "Python for Data Science & Machine Learning Bootcamp — Udemy",
                "Participated in Emerge, an inter-college hackathon.",
                "Participated in Ignitron, a 48-hour hackathon.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-orange-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section id="github-stats" data-reveal className={`${sectionClass} relative z-10 scroll-mt-28`}>
        <h2 className="section-title">GitHub Stats</h2>
        <Card>
          <CardContent className="grid gap-4 text-sm md:grid-cols-3">
            <p>1200+ commits in AI/ML repositories</p>
            <p>40+ automation scripts shipped</p>
            <p>Open-source contributions to CV tooling</p>
          </CardContent>
        </Card>
      </section>

      <section id="testimonials" data-reveal className={`${sectionClass} relative z-10 scroll-mt-28`}>
        <h2 className="section-title">Testimonials</h2>
        <div data-stagger className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            "Bhargav demonstrates strong problem-solving skills and consistently shows enthusiasm for learning emerging AI technologies.",
            "An innovative developer with hands-on experience in AI, automation, and real-world project building.",
            "Quick learner with the ability to transform ideas into practical and impactful solutions.",
            "Passionate about Artificial Intelligence and capable of building modern AI-powered applications with creativity and dedication.",
            "Shows excellent adaptability, teamwork, and commitment while working on technical projects and automation workflows.",
          ].map((quote, index) => (
            <Card
              key={quote}
              className={`border-white/15 bg-[#0B1020]/75 ${
                index === 4 ? "md:col-span-2" : ""
              }`}
            >
              <CardContent className="flex gap-4 text-slate-200">
                <div className="grid size-10 flex-none place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
                  <MessageSquareQuote className="size-4 text-cyan-100" />
                </div>
                <p className="text-sm leading-6 md:text-base">&ldquo;{quote}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="assistant" data-reveal className={`${sectionClass} relative z-10 scroll-mt-28`}>
        <h2 className="section-title">AI Chatbot Assistant</h2>
        <LazyInView fallback={<div className="section-skeleton mt-8 h-[32rem]" />}>
          <Card className="chatbot-panel relative mt-8 overflow-hidden border-white/15 bg-[#0B1020]/75">
          <div className="chatbot-particles pointer-events-none absolute inset-0" />
          <CardContent className="relative grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-100">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,209,255,0.9)]" />
                AI Online
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Ask about projects, AI architectures, automation systems,
                technologies, experience, and recruiter-facing details.
              </p>
              <div className="chatbot-core rounded-2xl border border-white/10 bg-white/5 p-5">
                <Bot className="mb-4 size-8 text-cyan-100" />
                <p className="text-sm font-medium text-white">
                  Portfolio-trained assistant
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Grounded on Bhargav&apos;s AI projects, skills, internship,
                  automation work, and computer vision systems.
                </p>
                <div className="chat-wave mt-5">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                    <span key={bar} />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050816]/55 p-4 backdrop-blur-xl">
              <div
                ref={chatScrollRef}
                className="chat-scroll flex max-h-[26rem] flex-col gap-3 overflow-y-auto pr-1"
              >
                {chatMessages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`chat-bubble ${
                      message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                    }`}
                  >
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-cyan-100/75">
                      {message.role === "user" ? "You" : "Assistant"}
                    </span>
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.content || "Thinking through the system..."}
                    </p>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendChatMessage(prompt)}
                    className="chat-prompt-chip"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleChatSubmit} className="mt-4 flex gap-3">
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Ask about Bhargav's AI systems..."
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/45 focus:bg-white/8"
                />
                <button
                  type="submit"
                  disabled={isChatLoading}
                  className="chat-send-button grid size-11 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </CardContent>
          </Card>
        </LazyInView>
      </section>

      <section id="blog" data-reveal className={`${sectionClass} relative z-10 scroll-mt-28`}>
        <h2 className="section-title">Blog</h2>
        <LazyInView fallback={<div className="section-skeleton mt-8 h-[42rem]" />}>
          <div data-stagger className="mt-8 grid gap-5">
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <Card
                key={post.title}
                data-tilt
                className="blog-card featured-blog-card group relative overflow-hidden border-white/15 bg-[#0B1020]/75"
              >
                <div className="blog-thumb blog-thumb-featured" />
                <div className="blog-neural-bg" />
                <CardContent className="relative grid gap-6 md:grid-cols-[0.95fr_1.3fr]">
                  <div className="blog-visual h-52 rounded-2xl">
                    <Image
                      src={post.thumbnail}
                      alt={post.thumbnailAlt}
                      fill
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="blog-image"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="blog-featured-badge">Featured Article</span>
                      <span className="blog-tag">{post.category}</span>
                      <span className="blog-date">{post.date}</span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      {post.author}
                    </p>
                    <h3 className="blog-title text-2xl font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                      {post.excerpt}
                    </p>
                    <span className="blog-link mt-6 w-fit text-sm font-medium text-cyan-100">
                      Read Article →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card
                  key={post.title}
                  data-tilt
                  className="blog-card group relative overflow-hidden border-white/15 bg-[#0B1020]/75"
                >
                  <div className="blog-thumb" />
                  <CardContent className="relative">
                    <div className="blog-visual mb-5 h-28 rounded-xl">
                      <Image
                        src={post.thumbnail}
                        alt={post.thumbnailAlt}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 260px"
                        className="blog-image"
                        unoptimized
                      />
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="blog-tag">{post.category}</span>
                      <span className="blog-date">{post.date}</span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </div>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      {post.author}
                    </p>
                    <h3 className="blog-title text-base font-semibold leading-snug text-white">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {post.excerpt}
                    </p>
                    <span className="blog-link mt-5 inline-block text-sm font-medium text-cyan-100">
                      Read Article →
                    </span>
                  </CardContent>
                </Card>
              ))}
          </div>
          </div>
        </LazyInView>
      </section>

      <section data-reveal className={`${sectionClass} relative z-10`}>
        <Card className="border-orange-300/30">
          <CardContent className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Resume Download</h2>
              <p className="mt-2 text-sm text-slate-300">
                Download a full technical profile and project impact summary.
              </p>
            </div>
            <a
              href="/bhargav-k-resume.pdf"
              download
              data-magnetic
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </CardContent>
        </Card>
      </section>

      <section id="contact" data-reveal className={`${sectionClass} relative z-10 pb-24`}>
        <h2 className="section-title">Contact</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-300">Email</p>
              <a
                href="mailto:kbhargav924@gmail.com"
                className="text-base hover:text-cyan-200"
              >
                kbhargav924@gmail.com
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-300">GitHub</p>
              <a
                href="https://github.com/bhargav2601-art"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:text-cyan-200"
              >
                github.com/bhargav2601-art
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-300">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/bhargav-k-bab841296"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:text-cyan-200"
              >
                linkedin.com/in/bhargav-k-bab841296
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <nav
        aria-label="Portfolio quick sections"
        className="section-dock fixed right-6 bottom-6 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0B1020]/78 px-3 py-2 text-xs text-slate-300 backdrop-blur md:flex"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeDockTarget === item.target;

          return (
            <a
              key={item.target}
              href={`#${item.target}`}
              aria-label={`Jump to ${item.label}`}
              aria-current={isActive ? "location" : undefined}
              className={`dock-link group ${isActive ? "dock-link-active" : ""}`}
            >
              <Icon className="size-4" />
              <span className="tooltip-label">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-10">
          <Link href="#" className="hover:text-cyan-200">
            Crafted for intelligent systems leadership.
          </Link>
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <SocialLink key={`footer-${item.label}`} {...item} compact />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
