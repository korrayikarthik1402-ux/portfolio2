import { type MouseEvent, useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

const sectionIds = ['about', 'skills', 'experience', 'projects', 'education', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('about');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 20 });
  const mainRef = useRef<HTMLElement | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('theme'); } catch { /* System theme works without storage. */ }
      const dark = saved === 'dark' || (saved !== 'light' && media.matches);
      setIsDarkMode(dark);
      document.documentElement.classList.toggle('dark', dark);
    };
    syncTheme();
    media.addEventListener('change', syncTheme);
    window.addEventListener('storage', syncTheme);
    return () => { media.removeEventListener('change', syncTheme); window.removeEventListener('storage', syncTheme); };
  }, []);

  useEffect(() => {
    const mainElement = mainRef.current;

    if (!mainElement) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id as SectionId);
        }
      },
      {
        root: mainElement,
        threshold: [0.15, 0.35, 0.5, 0.75],
        rootMargin: '-15% 0px -55% 0px',
      },
    );

    const handleScrollSync = () => {
      const maxScroll = Math.max(mainElement.scrollHeight - mainElement.clientHeight, 1);
      const nextProgress = Math.min(mainElement.scrollTop / maxScroll, 1);
      setScrollProgress(nextProgress);

      const focusPoint = mainElement.scrollTop + mainElement.clientHeight * 0.35;
      let currentSection = sections[0]?.id as SectionId;

      for (const section of sections) {
        if (focusPoint >= section.offsetTop) {
          currentSection = section.id as SectionId;
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    sections.forEach((section) => observer.observe(section));
    mainElement.addEventListener('scroll', handleScrollSync, { passive: true });
    handleScrollSync();

    return () => {
      observer.disconnect();
      mainElement.removeEventListener('scroll', handleScrollSync);
    };
  }, []);

  const handleSectionChange = (section: string) => {
    const target = document.getElementById(section);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setActiveSection(section as SectionId);
  };

  const handleThemeToggle = () => {
    const nextThemeIsDark = !isDarkMode;

    setIsDarkMode(nextThemeIsDark);
    document.documentElement.classList.toggle('dark', nextThemeIsDark);
    try { localStorage.setItem('theme', nextThemeIsDark ? 'dark' : 'light'); } catch { /* Keep the current session theme. */ }
  };

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
  };

  return (
    <div
      onMouseMove={handlePointerMove}
      className="relative flex h-[100dvh] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 transition-colors duration-500 dark:from-slate-950 dark:to-slate-900"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 dark:opacity-40"
        style={{
          background: `radial-gradient(420px circle at ${pointer.x}% ${pointer.y}%, rgba(14,165,233,0.18), transparent 65%)`,
        }}
      />
      <div className="pointer-events-none absolute bottom-0 right-4 top-24 z-40 hidden w-1 overflow-hidden rounded-full bg-slate-300/35 md:block dark:bg-slate-700/50">
        <div
          className="w-full rounded-full bg-gradient-to-b from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-150"
          style={{ height: `${Math.max(scrollProgress * 100, 8)}%` }}
        />
      </div>
      
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded((prev) => !prev)}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />

      <main
        ref={mainRef}
        className={`relative z-10 min-w-0 flex-1 overflow-y-auto overscroll-contain pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-0 md:pb-0 ${
          isSidebarExpanded ? 'md:ml-80' : 'md:ml-24'
        }`}
      >
        <div className="min-h-screen">
          <About isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;