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
import { Send } from "lucide-react";

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
  email: z.email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  subject: z.string().min(1, "Please select a subject."),
})

const subjects = [
  { label: "General Inquiry", value: "general" },
  { label: "Technical Support", value: "support" },
  { label: "Sales", value: "sales" },
  { label: "Feedback", value: "feedback" },
  { label: "Other", value: "other" },
]

const ContactForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: "",
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
              />
              <FieldDescription>
                Please provide as much detail as possible.
              </FieldDescription>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Field>
          <Button className="w-full" type="submit">
            <Send/>Send Message
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ContactForm
