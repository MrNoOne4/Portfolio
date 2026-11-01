import type { ComponentType } from "react"
import {
  LayoutGrid,
  Languages,
  Monitor,
  Server,
  Database,
  Code2,
  Wrench,
  Code,
  Palette,
  Braces,
  FileCode,
  Wind,
  Layers,
  Atom,
  Zap,
  GitBranch,
  Bot,
  Sparkles,
  Triangle,
  Boxes,
  Globe,
  ShieldCheck,
} from "lucide-react"
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiAuth0,
  SiMysql,
  SiVercel,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPrisma,
  SiShadcnui,
  SiFramer,
  SiVite,
  SiFigma,
  SiNetlify,
  SiClaude,
  SiCss,
} from "react-icons/si"
import { SiHtml5 } from "@icons-pack/react-simple-icons"

export type IconComponent = ComponentType<{ className?: string }>

// Every icon referenced by name in data.json must be registered here.
export const iconMap = {
  SiCss,
  SiClaude,
  SiNetlify,
  SiFigma,
  SiFramer,
  SiVite,
  SiReact,
  SiShadcnui,
  // lucide-react
  LayoutGrid,
  Languages,
  Monitor,
  Server,
  Database,
  Code2,
  Wrench,
  Code,
  Palette,
  Braces,
  FileCode,
  Wind,
  Layers,
  Atom,
  Zap,
  GitBranch,
  Bot,
  Sparkles,
  Triangle,
  Boxes,
  Globe,
  ShieldCheck,
  // react-icons/fa
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  // react-icons/si
  SiNextdotjs,
  SiPrisma,
  SiTailwindcss,
  SiAuth0,
  SiMysql,
  SiVercel,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  
  SiNodedotjs,
} satisfies Record<string, IconComponent>

export type IconName = keyof typeof iconMap

/** Looks up an icon by name; falls back to <Code /> so a typo in data.json never crashes the page. */
export function getIcon(name: string): IconComponent {
  return iconMap[name as IconName] ?? Code
}