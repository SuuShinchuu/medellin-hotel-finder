import { useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { NewsletterForm } from "@/components/newsletter-form";
import { CarouselImages } from "@/components/carousel-images";
import { getText, type Language } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Language>('es');

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageToggle currentLang={lang} onToggle={setLang} />
      </div>

      {/* Full-screen background carousel */}
      <div className="absolute inset-0 -z-10">
        <CarouselImages className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen w-full">
        <div className="max-w-md w-full mx-auto text-center px-6 py-12 backdrop-blur-sm bg-black/30 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            {getText('title', lang)}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-medium mb-8">
            {getText('subtitle', lang)}
          </p>

          <NewsletterForm
            lang={lang}
            translations={{
              emailPlaceholder: getText('emailPlaceholder', lang),
              subscribe: getText('subscribe', lang),
              success: getText('success', lang),
              error: getText('error', lang),
              invalidEmail: getText('invalidEmail', lang),
            }}
          />
        </div>
      </div>
    </div>
  );
}