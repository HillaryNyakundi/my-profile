// lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(150),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(150),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000),
  // Honeypot: real users never see or fill this. Bots do.
  company: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
