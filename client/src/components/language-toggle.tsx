import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/i18n";

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <Button
        variant={currentLang === 'en' ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle('en')}
      >
        EN
      </Button>
      <Button
        variant={currentLang === 'es' ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle('es')}
      >
        ES
      </Button>
    </div>
  );
}
