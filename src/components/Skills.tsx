import {
  Braces,
  Cloud,
  Code,
  Database,
  GitBranch,
  Globe,
  Layers,
  LucideIcon,
  Server,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react';

type SkillCategory = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: 'blue' | 'cyan' | 'emerald' | 'teal' | 'sky';
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming/Scripting Languages',
    subtitle: 'Core language stack for product development',
    icon: Terminal,
    skills: [ 'HTML/CSS/JS', 'Java', 'C++' , 'Python', 'Bash', 'PowerShell', 'YAML'],
    color: 'blue',
  },
  {
    title: 'Frameworks & Libraries',
    subtitle: 'Modern UI and backend frameworks',
    icon: Layers,
    skills: ['Spring Boot','React.js', 'Node.js', 'Angular', 'Express.js', 'Next.js'],
    color: 'cyan',
  },
  {
    title: 'Cloud & DevOps',
    subtitle: 'Deployment, automation, and delivery tooling',
    icon: Cloud,
    skills: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Jenkins', 'Terraform'],
    color: 'emerald',
  },
  {
    title: 'Databases & Tools',
    subtitle: 'Data layer and backend integration tools',
    icon: Database,
    skills: ['MongoDB', 'MySQL', 'Supabase', 'Firebase', 'REST APIs'],
    color: 'teal',
  },
  {
    title: 'Methodologies',
    subtitle: 'Engineering practices and team collaboration',
    icon: ShieldCheck,
    skills: ['Agile/Scrum', 'Microservices', 'Code Review'],
    color: 'sky',
  },
];

const skillIconMap: Record<string, LucideIcon> = {
  JavaScript: Code,
  TypeScript: Braces,
  Java: Code,
  'C++': Terminal,
  SQL: Database,
  'HTML/CSS': Globe,
  React: Code,
  'Node.js': Server,
  Express: GitBranch,
  Django: ShieldCheck,
  'Spring Boot': Layers,
  'Tailwind CSS': Braces,
  'Next.js': Globe,
  AWS: Cloud,
  Azure: Cloud,
  Docker: Server,
  Kubernetes: Layers,
  'CI/CD': GitBranch,
  Git: GitBranch,
  Jenkins: Wrench,
  Terraform: Cloud,
  MongoDB: Database,
  MySQL: Database,
  Supabase: Database,
  Firebase: Database,
  'REST APIs': Globe,
  'Agile/Scrum': ShieldCheck,
  Microservices: Layers,
  'Code Review': Braces,
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="portfolio-section px-4 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="portfolio-eyebrow">02 / The toolkit</p>
          <h2 id="skills-heading" className="portfolio-heading">Built on a versatile stack.</h2>
          <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-300">The languages, platforms, and practices I bring to each stage of a project.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <article key={category.title} className={`portfolio-glass p-6 sm:p-7 ${index < 2 ? 'xl:col-span-3' : 'xl:col-span-2'} ${index === 4 ? 'md:col-span-2' : ''}`}>
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-700/20 dark:border-cyan-200/20 bg-cyan-600/10 dark:bg-cyan-200/10 text-cyan-800 dark:text-cyan-200"><Icon size={22} aria-hidden="true" /></span>
                  <span aria-hidden="true" className="font-mono text-xs text-slate-500 dark:text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{category.subtitle}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = skillIconMap[skill] ?? Code;
                    return <li key={skill} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"><SkillIcon size={14} className="shrink-0 text-cyan-800 dark:text-cyan-200" aria-hidden="true" />{skill}</li>;
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
