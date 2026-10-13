import { ArrowUpRight, Code2, Cloud, GitBranch, Moon, Sun, Target } from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function About({ isDarkMode, onThemeToggle }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading" className="portfolio-section px-4 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="portfolio-eyebrow">01 / The introduction</p>
            <h2 id="about-heading" className="portfolio-heading">A little about me.</h2>
          </div>
          <button type="button" onClick={onThemeToggle} aria-label="Dark theme for the rest of the portfolio" aria-pressed={isDarkMode}
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
            {isDarkMode ? <Moon aria-hidden="true" size={20} /> : <Sun aria-hidden="true" size={20} />}
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="portfolio-glass relative overflow-hidden p-6 sm:p-8 md:col-span-2 md:row-span-2">
            <span aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200"><Code2 size={14} aria-hidden="true" /> Engineer · Builder · Collaborator</span>
              <h3 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">Hello, I’m Karthik.<br /><span className="text-cyan-200">I turn ideas into impact.</span></h3>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">I'm a passionate IT professional with a foundation in Computer Engineering. My journey in technology has equipped me with expertise in full-stack development, cloud infrastructure, and modern DevOps practices.</p>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">I thrive in collaborative environments where I can apply my technical skills to solve real-world problems — from scalable web applications to CI/CD pipelines and system performance.</p>
              <a href="#contact" className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-cyan-200 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Let’s connect <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </article>
          <article className="portfolio-glass p-6 sm:p-8">
            <Target className="text-cyan-200" size={24} aria-hidden="true" />
            <p className="mt-5 text-5xl font-semibold tracking-tight text-white">2+ <span className="text-base font-normal text-slate-300">years</span></p>
            <h3 className="mt-2 text-lg font-semibold text-white">Building with purpose</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">Hands-on experience building scalable applications, automating delivery, and solving practical engineering challenges.</p>
          </article>
          <article className="portfolio-glass p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">Where I focus</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              {[{ icon: Code2, label: 'Thoughtful web experiences' }, { icon: Cloud, label: 'Scalable cloud infrastructure' }, { icon: GitBranch, label: 'Reliable, automated delivery' }].map(({ icon: Icon, label }) => <li key={label} className="flex items-center gap-3"><Icon size={18} className="shrink-0 text-cyan-200" aria-hidden="true" />{label}</li>)}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
