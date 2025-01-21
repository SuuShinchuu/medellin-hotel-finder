import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import type { Language } from "@/lib/i18n";

interface NewsletterFormProps {
  lang: Language;
  translations: {
    emailPlaceholder: string;
    subscribe: string;
    success: string;
    error: string;
    invalidEmail: string;
  };
}

interface FormData {
  email: string;
}

export function NewsletterForm({ lang, translations }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Subscription error:', error);
        throw new Error('Subscription failed');
      }

      return response.json();
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(data.email);
      toast({
        title: translations.success,
        duration: 3000,
      });
      reset();
    } catch (error) {
      toast({
        title: translations.error,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="flex-1">
        <Input
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          placeholder={translations.emailPlaceholder}
          className="w-full"
          aria-label="Email"
        />
        {errors.email && (
          <span className="text-sm text-red-500 mt-1">
            {translations.invalidEmail}
          </span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {translations.subscribe}
      </Button>
    </form>
  );
}