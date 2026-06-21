'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Loader2, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  budgetRanges,
  contactFormSchema,
  projectTypes,
  type ContactFormData,
} from '@/lib/validation';

export default function QuoteSheet() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to send message');

      setSubmitStatus({
        type: 'success',
        message: "Message sent,t I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="font-sans">
          Start a project
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        showCloseButton={false}
        className="w-full gap-0 overflow-y-auto font-sans sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
      >
        <div className="mx-auto w-full max-w-xl px-6">
          <SheetHeader className="px-0 pt-6">
            <div className="flex items-start justify-between gap-4">
              <SheetTitle className="text-2xl">Request a Quote</SheetTitle>
              <SheetClose className="mt-1 shrink-0 cursor-pointer rounded-sm text-subtle opacity-80 transition hover:text-ink hover:opacity-100 focus:outline-none">
                <X className="size-6" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
            <SheetDescription>
              Build a purposeful web presence that grows your business.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" placeholder="Your full name" {...register('name')} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Tell me about your project *</Label>
            <Textarea
              id="message"
              rows={7}
              placeholder="Describe your project goals, requirements, and vision…"
              className="min-h-44"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>How can I help you?</Label>
            <Controller
              control={control}
              name="projectType"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  className="gap-3"
                >
                  {projectTypes.map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={type}
                        id={type}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={type}
                        className="cursor-pointer font-normal"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Your Budget</Label>
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <SheetFooter className="px-0">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                'Send Message'
              )}
            </Button>

            {submitStatus.type && (
              <p
                className={`text-sm ${
                  submitStatus.type === 'success'
                    ? 'text-green-600'
                    : 'text-destructive'
                }`}
              >
                {submitStatus.message}
              </p>
            )}

            <p className="text-xs text-subtle">
              By clicking &quot;Send Message&quot;, you agree to be contacted
              about your inquiry.
            </p>
          </SheetFooter>
        </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
