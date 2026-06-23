export interface Project {
  id: string;
  name: string;
  type:
    | "React"
    | "TypeScript"
    | "Tailwind CSS"
    | ".NET"
    | "Full-Stack"
    | "Django";
  description: string;
  role: string;
  timeline: string;
  status: "Completed" | "In Progress" | "Maintained";
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  stats: { label: string; value: string }[];
}

export interface Skill {
  category: string;
  items: {
    name: string;
    proficiency: number; // 0-100 scale
    years: number;
    description?: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "bookmytest",
    name: "bookmytest",
    type: "Full-Stack",
    description:
      "Live client platform for booking and managing test/exam slots. Built end-to-end with a focus on reliable booking flows and a clean admin experience.",
    role: "Frontend Developer",
    timeline: "2025 — Present",
    status: "Maintained",
    tags: ["React", ".NET", "PostgreSQL", "Clean Architecture"],
    liveUrl: "https://bookmytest.com.np",
    stats: [
      { label: "Status", value: "Live Client Project" },
      { label: "Stack", value: "React + .NET" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Role", value: "Frontend" },
    ],
  },
  {
    id: "farmbot-designer",
    name: "farmbot-designer",
    type: "React",
    description:
      "CNC Farmbot Designer tool built during internship at ING Skill Academy (SMaRC division). Showcased live at the Futurama exhibition, Islington College.",
    role: "Frontend Developer Intern",
    timeline: "Jun — Aug 2025",
    status: "Completed",
    tags: ["React", "CNC", "Design Tooling"],
    stats: [
      { label: "Company", value: "ING Skill Academy" },
      { label: "Exhibited", value: "Futurama, Islington" },
      { label: "Internship", value: "CDL Frontend" },
    ],
  },
  {
    id: "gadisewa",
    name: "gadisewa",
    type: ".NET",
    description:
      "Team project handling vehicle service workflows. Led backend architecture across the full lifecycle — Clean Architecture, JWT auth fixes, ERDs, and a 27-case testing suite.",
    role: "Backend Architecture Lead",
    timeline: "2025",
    status: "Completed",
    tags: [".NET", "PostgreSQL", "Clean Architecture", "JWT", "EF Core"],
    repoUrl: "https://github.com/KaranBastola84",
    stats: [
      { label: "Test Cases", value: "27" },
      { label: "Architecture", value: "Clean Architecture" },
      { label: "Diagrams", value: "ERD + UML" },
      { label: "Role", value: "Backend Lead" },
    ],
  },
  {
    id: "coffee-school-crm",
    name: "coffee-school-crm",
    type: "Full-Stack",
    description:
      "Final Year Project — a CRM built for a real client with live deployment in progress. Covers customer management, scheduling, and reporting workflows.",
    role: "Full-Stack Developer",
    timeline: "2025 — 2026",
    status: "In Progress",
    tags: ["React", ".NET", "PostgreSQL", "FYP"],
    repoUrl:"https://github.com/KaranBastola84/cms-frontend",
    stats: [
      { label: "Type", value: "FYP / Client Project" },
      { label: "Deployment", value: "Planned" },
      { label: "Stack", value: "Full-Stack" },
      { label: "Status", value: "In Progress" },
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: [
      {
        name: "TypeScript",
        proficiency: 50,
        years: 1,
        description:
          "Actively deepening as part of structured frontend roadmap alongside React.",
      },
      {
        name: "JavaScript",
        proficiency: 80,
        years: 3,
        description:
          "Core language for frontend builds and React component logic.",
      },
      {
        name: "C#",
        proficiency: 75,
        years: 2,
        description:
          "OOP pillars, LINQ, delegates, exception handling, EF Core.",
      },
      {
        name: "SQL",
        proficiency: 80,
        years: 2,
        description:
          "PostgreSQL and Oracle SQL — normalization, joins, window functions.",
      },
      {
        name: "CSS",
        proficiency: 85,
        years: 3,
        description:
          "Responsive layouts and modern styling for production UIs.",
      },
    ],
  },
  {
    category: "Frameworks",
    items: [
      {
        name: "React",
        proficiency: 90,
        years: 2,
        description:
          "Primary frontend specialization — hooks, component architecture, state management.",
      },
      {
        name: ".NET",
        proficiency: 85,
        years: 2,
        description:
          "Full-stack experience with Clean Architecture and Web API design.",
      },
      {
        name: "Entity Framework Core",
        proficiency: 80,
        years: 2,
        description:
          "Data access layer for .NET projects, migrations, and query optimization.",
      },
    ],
  },
  {
    category: "Tools & Practices",
    items: [
      {
        name: "Clean Architecture",
        proficiency: 85,
        years: 2,
        description:
          "Applied across GadiSewa and BookMyTest — layered separation, dependency rules.",
      },
      {
        name: "PostgreSQL",
        proficiency: 82,
        years: 2,
        description:
          "Schema design, normalization, and concurrency control concepts.",
      },
      {
        name: "Git",
        proficiency: 88,
        years: 3,
        description:
          "Team workflows, branching strategy, and collaborative version control.",
      },
      {
        name: "JWT Auth",
        proficiency: 80,
        years: 1,
        description:
          "Implemented and debugged claim-based authentication in production-style apps.",
      },
    ],
  },
];

export const TERMINAL_LOGS = [
  {
    level: "info",
    message: "System initialization started...",
    timestamp: "09:00:00.001",
  },
  {
    level: "info",
    message: "Loading developer profile: Karan Bastola",
    timestamp: "09:00:00.042",
  },
  {
    level: "success",
    message: "Profile loaded successfully",
    timestamp: "09:00:00.087",
  },
  {
    level: "info",
    message: "Resolving dependencies...",
    timestamp: "09:00:00.103",
  },
  {
    level: "success",
    message: "Dependencies resolved: react, dotnet, postgresql, typescript",
    timestamp: "09:00:00.156",
  },
  {
    level: "info",
    message: "Compiling portfolio assets...",
    timestamp: "09:00:00.201",
  },
  {
    level: "success",
    message: "Build completed in 0.45s",
    timestamp: "09:00:00.456",
  },
  {
    level: "info",
    message: "Starting development server...",
    timestamp: "09:00:00.501",
  },
  {
    level: "success",
    message: "Server ready at https://karanbastola.com.np",
    timestamp: "09:00:00.678",
  },
  {
    level: "info",
    message: "Watching for changes...",
    timestamp: "09:00:00.701",
  },
  {
    level: "success",
    message: "Initialization successful. Welcome to the dev environment.",
    timestamp: "09:00:00.789",
  },
];
