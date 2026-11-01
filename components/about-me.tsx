
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Linkedin, Twitter } from '@/components/ui/brand-icons';

export default function AboutMeSection() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="gap-12 md:grid md:grid-cols-12 lg:gap-16">

          {/* Profile Image and Quick Stats */}
          <div className="flex flex-col items-center md:col-span-5 lg:col-span-4">
            <div className="border-primary/10 relative mb-8 h-56 w-56 overflow-hidden rounded-full border-4 md:h-64 md:w-64 lg:h-72 lg:w-72">
              <img
                src="/images/person.jpg"
                alt="Mathew A. De Mesa"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-muted/30 w-full max-w-sm space-y-4 rounded-xl border p-6">
              <h3 className="text-lg font-semibold">Quick Facts</h3>

              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Education</p>
                    <p className="font-medium">3rd Year College Student</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">University</p>
                    <p className="font-medium">Pamantasan ng Lungsod ng Laguna</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Contact</p>
                    <a
                      href="mailto:your-email@example.com"
                      className="hover:text-primary font-medium"
                    >
                      Contact Me
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://www.linkedin.com/in/mathew-de-mesa-1393a7292/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/MrNoOne4"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <SiGithub className="h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://www.instagram.com/garouthemonster3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* About Me Content */}
          <div className="mt-12 flex flex-col md:col-span-7 md:mt-0 lg:col-span-8">
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-normal tracking-wide uppercase"
              >
                About Me
              </Badge>
            </div>

            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Hi, I&apos;m <span className="text-primary">Mathew A. De Mesa</span>
              <br />
              Aspiring Full Stack Developer
            </h1>

            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I am a third-year college student at Pamantasan ng Lungsod ng
                Laguna with a passion for web development and technology.
                I enjoy building modern, responsive, and user-friendly
                applications while continuously improving my programming
                and problem-solving skills.
              </p>

              <p>
                My interests include frontend and backend development,
                database management, and creating functional systems
                that solve real-world problems. I have experience working
                with technologies such as React, Next.js, TypeScript,
                JavaScript, Tailwind CSS, Node.js, and MySQL through
                academic and personal projects.
              </p>

              <p>
                I am passionate about learning new technologies, writing
                clean and maintainable code, and exploring creative ways
                to turn ideas into practical applications. My goal is to
                continue growing as a developer, gain valuable experience,
                and build meaningful digital solutions.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button className="gap-2" asChild>
                <a href="#contact">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button variant="outline" className="gap-2" asChild>
                <a href="#projects">
                  View My Work
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
