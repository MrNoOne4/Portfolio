import { memo, useEffect, useState } from "react"
import type { ReactNode } from "react"
import {
  LayoutGrid,
  Languages,
  Monitor,
  Server,
  Database,
  Code2,
  Wrench,
  LucideIcon,
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
  UserRound,
  GraduationCap,
  FolderKanban,
  Mail,
  ArrowUpRight,
  ArrowUp,
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
} from "react-icons/si"
import { AnimatePresence, motion } from "framer-motion"

import ContactForm from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarouselWithThumbnails } from "@/components/carousel"

type Category =
  "All" | "Languages" | "Frontend" | "Backend" | "Database" | "Tools"

interface ToolProps {
  name: string
  value: string
  icon: LucideIcon
  description: string
  role: Category[]
}

interface ProjectProps {
  thumbnail: string
  title: string
  description: string
  tools: {
    titleTools: string
    icon: ReactNode
  }[]
  linkVercel: string
  linkGithub: string
  images: string[]
}

import AboutMe from "@/components/about-me";


// Static data lives outside the component so it isn't re-created on every render
const categories: ReadonlyArray<{ name: Category; icon: LucideIcon }> = [
  { name: "All", icon: LayoutGrid },
  { name: "Languages", icon: Languages },
  { name: "Frontend", icon: Monitor },
  { name: "Backend", icon: Server },
  { name: "Database", icon: Database },
  { name: "Tools", icon: Wrench },
]

const developmentTools: readonly ToolProps[] = [
  // Languages
  {
    name: "HTML",
    value: "HTML",
    icon: Code,
    description: "Structures web pages with semantic markup.",
    role: ["All", "Frontend"],
  },
  {
    name: "CSS",
    value: "CSS",
    icon: Palette,
    description: "Styles and designs responsive web interfaces.",
    role: ["All", "Frontend"],
  },
  {
    name: "Java",
    value: "Java",
    icon: Code,
    description:
      "A versatile, object-oriented programming language used to build web, mobile, and enterprise applications.",
    role: ["All", "Backend", "Languages"],
  },
  {
    name: "JavaScript",
    value: "JavaScript",
    icon: Braces,
    description: "Adds interactivity and dynamic behavior to websites.",
    role: ["All", "Frontend", "Languages"],
  },
  {
    name: "TypeScript",
    value: "TypeScript",
    icon: FileCode,
    description: "Adds static typing to JavaScript applications.",
    role: ["All", "Frontend", "Languages"],
  },

  // Frontend
  {
    name: "React",
    value: "React",
    icon: Atom,
    description: "Builds interactive user interfaces with reusable components.",
    role: ["All", "Frontend"],
  },
  {
    name: "Auth.js",
    value: "Auth.js",
    icon: ShieldCheck,
    description: "Handles authentication, sessions, and secure user sign-ins.",
    role: ["All", "Backend"],
  },
  {
    name: "Next.js",
    value: "Next.js",
    icon: Layers,
    description: "Develops full-stack React applications and websites.",
    role: ["All", "Frontend"],
  },
  {
    name: "Vite",
    value: "Vite",
    icon: Zap,
    description: "Provides a fast frontend development environment.",
    role: ["All", "Frontend", "Tools"],
  },
  {
    name: "Tailwind CSS",
    value: "Tailwind CSS",
    icon: Wind,
    description: "Creates modern interfaces using utility-first CSS.",
    role: ["All", "Frontend"],
  },
  {
    name: "shadcn/ui",
    value: "shadcn/ui",
    icon: Layers,
    description: "Provides customizable and accessible UI components.",
    role: ["All", "Frontend"],
  },
  {
    name: "Framer Motion",
    value: "Framer Motion",
    icon: Sparkles,
    description: "Creates smooth animations and interactive transitions.",
    role: ["All", "Frontend"],
  },

  // Database
  {
    name: "MySQL",
    value: "MySQL",
    icon: Database,
    description: "Manages relational data using SQL.",
    role: ["All", "Database", "Backend"],
  },
  {
    name: "Aiven",
    value: "Aiven",
    icon: Database,
    description: "Provides managed cloud database infrastructure.",
    role: ["All", "Database", "Backend"],
  },
  {
    name: "OOP",
    value: "OOP",
    icon: Boxes,
    description:
      "Organizes code using objects, classes, and reusable principles.",
    role: ["All", "Languages"],
  },
  {
    name: "Prisma",
    value: "Prisma",
    icon: Database,
    description: "Simplifies database access with a type-safe ORM.",
    role: ["All", "Backend", "Database"],
  },

  // Development Tools
  {
    name: "Git",
    value: "Git",
    icon: GitBranch,
    description: "Tracks changes and manages source code versions.",
    role: ["All", "Tools"],
  },
  {
    name: "GitHub",
    value: "GitHub",
    icon: GitBranch,
    description: "Hosts repositories and supports collaborative development.",
    role: ["All", "Tools"],
  },
  {
    name: "MySQL Workbench",
    value: "MySQL Workbench",
    icon: Database,
    description: "Designs, manages, and visualizes MySQL databases.",
    role: ["All", "Tools", "Database"],
  },
  {
    name: "VS Code",
    value: "VS Code",
    icon: Code2,
    description: "A lightweight editor for writing and managing code.",
    role: ["All", "Tools"],
  },
  {
    name: "Figma",
    value: "Figma",
    icon: Palette,
    description: "Designs user interfaces and interactive prototypes.",
    role: ["All", "Tools"],
  },

  // AI Tools
  {
    name: "Claude AI",
    value: "Claude AI",
    icon: Bot,
    description: "Assists with coding, problem-solving, and development.",
    role: ["All", "Tools"],
  },
  {
    name: "Gemini AI",
    value: "Gemini AI",
    icon: Sparkles,
    description: "Supports research, coding, and creative workflows.",
    role: ["All", "Tools"],
  },

  // Deployment
  {
    name: "Vercel",
    value: "Vercel",
    icon: Triangle,
    description: "Deploys and hosts modern web applications.",
    role: ["All", "Tools"],
  },
  {
    name: "Netlify",
    value: "Netlify",
    icon: Globe,
    description: "Builds, deploys, and hosts web projects.",
    role: ["All", "Tools"],
  },
]

const sharedStack: ProjectProps["tools"] = [
  { titleTools: "Next.js", icon: <SiNextdotjs /> },
  { titleTools: "TypeScript", icon: <SiTypescript /> },
  { titleTools: "JavaScript", icon: <SiJavascript /> },
  { titleTools: "React", icon: <SiReact /> },
  { titleTools: "Tailwind CSS", icon: <SiTailwindcss /> },
  { titleTools: "Node.js", icon: <SiNodedotjs /> },
  { titleTools: "Auth.js", icon: <SiAuth0 /> },
  { titleTools: "MySQL", icon: <SiMysql /> },
  { titleTools: "Vercel", icon: <SiVercel /> },
  { titleTools: "Aiven", icon: <Database /> },
]

const projects: ReadonlyArray<ProjectProps> = [
  {
    thumbnail: "/images/hotelThumbnail.png",
    title: "Hotel reservation and management system",
    description:
      "The Hotel Reservation and Room Management System allows customers to book rooms and process payments while helping hotel staff manage rooms, guests, reservations, check-ins, check-outs, and billing efficiently.",
    tools: sharedStack,
    linkVercel: "https://hotel-reservation-n21f.vercel.app/userPage",
    linkGithub: "https://github.com/MrNoOne4/HotelReservation",
    images: [
      "/images/hotelThumbnail.png",
      "/images/Hotel2.png",
      "/images/Hotel3.png",
      "/images/Hotel4.png",
      "/images/Hotel5.png",
      "/images/Hotel6.png",
      "/images/Hotel7.png",
      "/images/Hotel8.png",
      "/images/Hotel9.png",
      "/images/Hotel10.png",
      "/images/Hotel11.png",
      "/images/Hotel12.png",
      "/images/Hotel13.png",
      "/images/Hotel14.png",
      "/images/Hotel15.png",
    ],
  },
  {
    thumbnail: "/images/brewCoffeeThumbnail.png",
    title: "Coffee & Snacks Ordering and Management Dashboard",
    description:
      "A user-friendly dashboard that helps administrators manage coffee and snack menus, customer orders, products, pricing, and sales efficiently, ensuring smooth daily business operations.",
    tools: sharedStack,
    linkVercel: "https://brewcoffee.vercel.app/",
    linkGithub: "https://github.com/MrNoOne4/brewCoffee",
    images: [
      "/images/Brew1.png",
      "/images/Brew2.png",
      "/images/Brew3.png",
      "/images/Brew4.png",
      "/images/Brew5.png",
      "/images/Brew6.png",
      "/images/Brew7.png",
      "/images/Brew8.png",
      "/images/Brew10.png",
      "/images/Brew11.png",
      "/images/Brew12.png",
      "/images/Brew13.png",
      "/images/Brew14.png",
      "/images/Brew15.png",
      "/images/Brew16.png",
      "/images/Brew17.png",
      "/images/Brew18.png",
      "/images/Brew19.png",
      "/images/Brew20.png",
      "/images/Brew21.png",
    ],
  },
]

const socialLinkClass =
  "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-muted"

const Content = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  )

  const closeCarousel = () => setSelectedProject(null)

  // Close the modal with Escape and lock page scroll while it's open
  useEffect(() => {
    if (!selectedProject) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCarousel()
    }
    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProject])

  return (
    <main className="[&>section]:min-h-screen [&>section]:scroll-mt-28">
      <section id="about" className="py-24">
        <div className="mx-auto w-full max-w-4xl px-6">
            <AboutMe/>
        </div>
      </section>

      <section id="skills" >
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm tracking-[0.25em] text-muted-foreground">
              MY TECH STACK
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Tools & Technologies
            </h2>
            <p className="mt-3 text-muted-foreground">
              Technologies I use to build modern applications.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant={activeCategory === name ? "default" : "outline"}
                onClick={() => setActiveCategory(name)}
                className="rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 active:scale-95"
              >
                <Icon className="mr-2 size-4" />
                {name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {developmentTools
                .filter((tool) => tool.role.includes(activeCategory))
                .map(({ name, value, icon: Icon, description }) => (
                  <motion.div
                    key={value}
                    layout
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                      layout: { type: "spring", stiffness: 350, damping: 30 },
                    }}
                    className="group rounded-xl border bg-card p-4 transition-colors duration-300 hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-muted text-center transition-all duration-300 group-hover:bg-primary/10">
                      <Icon className="size-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
                    </div>

                    <h3 className="text-sm font-semibold tracking-tight">
                      {name}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm tracking-[0.25em] text-muted-foreground">
              MY WORK
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
              A collection of projects I&apos;ve built to explore ideas, sharpen
              my skills, and turn concepts into functional applications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((p) => (
              <Card
                key={p.title}
                className="group overflow-hidden border-border bg-card pt-0 transition-all duration-300 hover:-translate-y-2 hover:border-foreground/30 hover:shadow-xl"
              >
                {/* Project Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />

                  <Badge
                    variant="secondary"
                    className="absolute top-4 left-4 backdrop-blur-md"
                  >
                    Web Development
                  </Badge>
                </div>

                {/* Project Information */}
                <CardHeader className="gap-3">
                  <div>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      {p.description}
                    </CardDescription>
                  </div>

                  {/* Technologies Used */}
                  <div className="flex flex-wrap gap-2">
                    {p.tools.map(({ titleTools, icon }) => (
                      <Badge
                        key={titleTools}
                        variant="outline"
                        className="flex items-center gap-1.5"
                      >
                        <span className="flex size-3.5 items-center justify-center">
                          {icon}
                        </span>
                        {titleTools}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                {/* Project Links */}
                <CardFooter className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => setSelectedProject(p)}
                  >
                    Live Demo
                    <ArrowUpRight className="ml-2 size-4" />
                  </Button>

                  <Button variant="outline" className="flex-1" asChild>
                    <a
                      href={p.linkGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="mr-2 size-4" />
                      Source Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative min-h-svh scroll-mt-28 py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <p className="text-sm tracking-[0.25em] text-muted-foreground">
              GET IN TOUCH
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s Connect<span className="text-primary">.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Have a project in mind or just want to say hello? I&apos;m always
              open to new opportunities and meaningful collaborations.
            </p>
          </motion.div>

          {/* Contact Content */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center gap-8"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" />
                </div>

                <h3 className="text-2xl font-semibold">
                  Let&apos;s build something great together.
                </h3>

                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Whether it&apos;s a website, a creative idea, or a potential
                  collaboration, I&apos;d be happy to hear from you. Let&apos;s
                  turn your ideas into reality.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium">Connect with me</p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/MrNoOne4"
                    target="_blank"
                    rel="noreferrer"
                    className={socialLinkClass}
                  >
                    <FaGithub className="size-4" />
                    GitHub
                    <ArrowUpRight className="size-3" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/mathew-de-mesa-1393a7292/"
                    target="_blank"
                    rel="noreferrer"
                    className={socialLinkClass}
                  >
                    <FaLinkedin className="size-4" />
                    LinkedIn
                    <ArrowUpRight className="size-3" />
                  </a>

                  <a
                    href="https://www.facebook.com/markmatt.demesa"
                    target="_blank"
                    rel="noreferrer"
                    className={socialLinkClass}
                  >
                    <FaFacebook className="size-4" />
                    Facebook
                    <ArrowUpRight className="size-3" />
                  </a>

                  <a
                    href="https://www.instagram.com/garouthemonster3/"
                    target="_blank"
                    rel="noreferrer"
                    className={socialLinkClass}
                  >
                    <FaInstagram className="size-4" />
                    Instagram
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Send me a message</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form below and I&apos;ll get back to you.
                </p>
              </div>

              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Top Section */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <a href="#about" className="text-xl font-bold tracking-tight">
                Mathew Demesa
                <span className="text-primary">.</span>
              </a>

              <p className="max-w-sm text-sm text-muted-foreground">
                Building modern, responsive, and meaningful digital experiences
                through code and creativity.
              </p>
            </div>

            <a
              href="#about"
              className="group flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-muted"
            >
              Back to top
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Navigation */}
          <div className="my-8 flex flex-col items-center gap-4 border-y py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Explore
            </p>

            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { name: "About", href: "#about", icon: UserRound },
                { name: "Skills", href: "#skills", icon: GraduationCap },
                { name: "Projects", href: "#projects", icon: FolderKanban },
                { name: "Contact", href: "#contact", icon: Mail },
              ].map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="size-4" />
                  <span className="ml-2">{name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col-reverse gap-5 text-center sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mathew Demesa. All rights reserved.
            </p>

            <div className="flex items-center justify-center gap-3 sm:justify-start">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/MrNoOne4",
                  icon: FaGithub,
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/mathew-de-mesa-1393a7292/",
                  icon: FaLinkedin,
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/garouthemonster3/",
                  icon: FaInstagram,
                },
              ].map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-muted hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Project modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeCarousel}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border bg-background p-5 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCarousel}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive hover:text-white"
            >
              ✕
            </button>

            <div className="mb-5 pr-8">
              <h2
                id="project-dialog-title"
                className="text-xl font-bold tracking-tight"
              >
                {selectedProject.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selectedProject.description}
              </p>
            </div>

            <CarouselWithThumbnails
              images={selectedProject.images}
              title={selectedProject.title}
            />

            <div className="mt-6 flex justify-end">
              <Button asChild>
                <a
                  href={selectedProject.linkVercel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Live Website
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default memo(Content)
