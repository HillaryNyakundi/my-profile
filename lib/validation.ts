// lib/validation.ts
import { z } from 'zod';

export const projectTypes = [
  'Business Website',
  'Personal Portfolio',
  'Business Mobile Development',
  'Web App Development',
] as const;

export const budgetRanges = [
  '$500 - $1000',
  '$1000 - $1500',
  '$1500 - $2500',
  '$2500 - $5000',
  'Not sure yet',
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Tell me a bit more about your project'),
  projectType: z.string().optional(),
  budget: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
