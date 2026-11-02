import { memo, useEffect, useState } from "react"
import {
  UserRound,
  GraduationCap,
  FolderKanban,
  Mail,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
} from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

import AboutMe from "@/components/about-me"
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
import { getIcon } from "@/lib/icons"
import {
  categories,
  tools,
  certificate,
  projects,
  socials,
  type Category,
  type Project,
} from "@/lib/portfolio-data"
import Marquee from "@/components/shadcn-space/marquee/marquee-04"

const socialLinkClass =
  "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-muted"

const footerSocials = socials.filter((s) => s.inFooter)

const navLinks = [
  { name: "About", href: "#about", icon: UserRound },
  { name: "Skills", href: "#skills", icon: GraduationCap },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Contact", href: "#contact", icon: Mail },
]

const Content = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  const reveal = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const revealTransition = {
    duration: 0.7,
    ease: "easeOut" as const,
  }

  const revealViewport = {
    once: true,
    amount: 0.15,
  }

  return (
    <main className="[&>section]:min-h-screen [&>section]:scroll-mt-28">
      <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          transition={revealTransition}
          className="mx-auto w-full max-w-4xl px-6"
        >
          <AboutMe />
        </motion.div>
      </section>

      <section id="skills">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          transition={revealTransition}
          className="mx-auto w-full max-w-7xl px-6"
        >
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
            {categories.map(({ name, icon }) => {
              const Icon = getIcon(icon)
              return (
                <Button
                  key={name}
                  variant={activeCategory === name ? "default" : "outline"}
                  onClick={() => setActiveCategory(name)}
                  className="rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 active:scale-95"
                >
                  <Icon className="mr-2 size-4" />
                  {name}
                </Button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {tools
                .filter((tool) => tool.role.includes(activeCategory))
                .map(({ name, icon, description }) => {
                  const Icon = getIcon(icon)
                  return (
                    <motion.div
                      key={name}
                      variants={reveal}
                      whileInView="visible"
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
                  )
                })}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section className="py-5 sm:py-7 md:py-11 lg:py-16 xl:py-21">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          transition={revealTransition}
          className="mx-auto w-full px-6"
        >
          <div className="mb-12 text-center">
            <p className="text-sm tracking-[0.25em] text-muted-foreground">
              MY ACHIEVEMENTS
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Certificates & Certifications
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
              A collection of certifications and learning achievements earned
              through platforms like freeCodeCamp and Cisco, reflecting my
              commitment to continuous learning and developing my skills in
              technology.
            </p>
          </div>
          <div>
            <Marquee certificate={certificate} />
          </div>
        </motion.div>
      </section>

      <section id="projects" className="py-17">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          transition={revealTransition}
          className="mx-auto w-full max-w-5xl px-6"
        >
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
            {projects.map((p, index: number) => (
              <motion.div
                key={p.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                transition={{
                  ...revealTransition,
                  delay: (index % 2) * 0.15,
                }}
              >
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
                      <CardTitle className="text-center text-xl">
                        {p.title}
                      </CardTitle>
                      <CardDescription className="mt-2 leading-relaxed">
                        {p.description}
                      </CardDescription>
                    </div>

                    {/* Technologies Used */}
                    <div className="flex flex-wrap gap-2">
                      {p.tools.map(({ title, icon }) => {
                        const Icon = getIcon(icon)
                        return (
                          <Badge
                            key={title}
                            variant="outline"
                            className="flex items-center gap-1.5"
                          >
                            <span className="flex size-3.5 items-center justify-center">
                              <Icon className="size-full" />
                            </span>
                            {title}
                          </Badge>
                        )
                      })}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section
        id="contact"
        className="relative min-h-svh scroll-mt-28 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
      >
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          transition={revealTransition}
          className="mx-auto w-full max-w-6xl px-6"
        >
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
                  {socials.map(({ name, href, icon }) => {
                    const Icon = getIcon(icon)
                    return (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className={socialLinkClass}
                      >
                        <Icon className="size-4" />
                        {name}
                        <ArrowUpRight className="size-3" />
                      </a>
                    )
                  })}
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
        </motion.div>
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
              {navLinks.map(({ name, href, icon: Icon }) => (
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
              {footerSocials.map(({ name, href, icon }) => {
                const Icon = getIcon(icon)
                return (
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
                )
              })}
            </div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {/* Project modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
            onClick={closeCarousel}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="relative max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-x-hidden overflow-y-auto rounded-xl border bg-background p-5 shadow-2xl sm:p-7"
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
                  className="text-center text-xl font-bold tracking-tight"
                >
                  {selectedProject.title}
                </h2>

                <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
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
      </AnimatePresence>
    </main>
  )
}

export default memo(Content)
