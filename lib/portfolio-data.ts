import raw from "@/data/data.json"

// Requires "resolveJsonModule": true in tsconfig.json

export type Category =
  | "All"
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools"

export interface CategoryItem {
  name: Category
  icon: string
}

export interface Tool {
  name: string
  icon: string
  description: string
  role: Category[]
}

export interface ProjectTool {
  title: string
  icon: string
}

export interface Project {
  thumbnail: string
  title: string
  description: string
  tools: ProjectTool[]
  linkVercel: string
  linkGithub: string
  images: string[]
}

export interface Social {
  name: string
  href: string
  icon: string
  inFooter: boolean
}

export interface Certificate {
  name: string
  image: string
}

export const certificate = raw.Certificate as Certificate[]

export const categories = raw.categories as CategoryItem[]
export const tools = raw.tools as Tool[]
export const socials = raw.socials as Social[]

// Projects list tech by title; resolve each title to its icon once here
const iconByTitle = new Map(raw.techStack.map((t) => [t.title, t.icon]))

export const projects: Project[] = raw.projects.map((p) => ({
  ...p,
  tools: p.tools.map((title) => ({
    title,
    icon: iconByTitle.get(title) ?? "Code",
  })),
}))