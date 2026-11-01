"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { LoaderIcon } from "lucide-react"
import { cn } from "cn"

const contactSubjects: ReadonlyArray<{
  label: string
  value: string
}> = [
  {
    label: "Website Development",
    value: "website-development",
  },
  {
    label: "Frontend Development",
    value: "frontend-development",
  },
  {
    label: "Full-Stack Development",
    value: "fullstack-development",
  },
  {
    label: "UI/UX Design",
    value: "ui-ux-design",
  },
  {
    label: "Freelance Project",
    value: "freelance-project",
  },
  {
    label: "Job Opportunity",
    value: "job-opportunity",
  },
  {
    label: "Collaboration",
    value: "collaboration",
  },
  {
    label: "Technical Consultation",
    value: "technical-consultation",
  },
  {
    label: "Just Saying Hello",
    value: "general-inquiry",
  },
  {
    label: "Other",
    value: "other",
  },
]
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),

  email: z.email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  subject: z.string().min(1, "Please select a subject."),
})

const subjects = [
  { label: "General Inquiry", value: "general" },
  { label: "Technical Support", value: "support" },
  { label: "Sales", value: "sales" },
  { label: "Feedback", value: "feedback" },
  { label: "Other", value: "other" },
]

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    try {
      const request = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          inquiryType: values.subject,
        }),
      })

      const response = await request.json()

      if (!request.ok || !response.success) {
        toast.error(
          response.message || "Failed to send your message. Please try again.",
          {
            position: "bottom-center",
          }
        )
        return
      }

      toast.success(response.message || "Message sent successfully!", {
        position: "bottom-center",
      })

      form.reset()
    } catch (error) {
      console.error("Contact form error:", error)

      toast.error(
        "Unable to connect to the server. Please check your internet connection and try again.",
        {
          position: "bottom-center",
        }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Get in touch</h2>
          <p className="text-sm text-muted-foreground">
            We&apos;ll get back to you within 24 hours
          </p>
        </div>

        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-form-name">Full Name</FieldLabel>

              <Input
                {...field}
                id="contact-form-name"
                placeholder=""
                type="text"
              />

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <Field invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-form-subject">
                What would you like to discuss?
              </FieldLabel>

              <Select
                items={contactSubjects}
                name={field.name}
                onValueChange={(next) => field.onChange(next ?? "")}
                value={field.value || null}
              >
                <SelectTrigger className="w-full" id="contact-form-subject">
                  <SelectValue placeholder="Select an inquiry type" />
                </SelectTrigger>

                <SelectContent>
                  {contactSubjects.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-form-email">Email</FieldLabel>
              <Input
                {...field}
                id="contact-form-email"
                placeholder="you@example.com"
                type="email"
              />

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        {/* <Controller
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <Field invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-form-subject">Subject</FieldLabel>
              <Select
                items={subjects}
                name={field.name}
                onValueChange={(next) => field.onChange(next ?? "")}
                value={field.value || null}
              >
                <SelectTrigger className="w-full" id="contact-form-subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        /> */}
        <Controller
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <Field invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-form-message">Message</FieldLabel>
              <Textarea
                {...field}
                className="resize-none"
                id="contact-form-message"
                placeholder="How can we help you?"
                rows={5}
                cols={30}
              />
              <FieldDescription>
                Please provide as much detail as possible.
              </FieldDescription>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Field>
          <Button className="w-full" type="submit" disabled={loading}>
            {!loading && <Send />}
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ContactForm
