type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    title: "Discover Medellín's Finest Hotels",
    subtitle: "Your perfect stay in the city of eternal spring is coming soon",
    description: "Be the first to know when we launch. Get exclusive early access and special offers for the best hotels in Medellín.",
    emailPlaceholder: "Enter your email",
    subscribe: "Get Early Access",
    success: "Thank you for subscribing!",
    error: "An error occurred. Please try again.",
    invalidEmail: "Please enter a valid email"
  },
  es: {
    title: "Descubre los Mejores Hoteles de Medellín",
    subtitle: "Tu estadía perfecta en la ciudad de la eterna primavera está por llegar",
    description: "Sé el primero en saber cuando lancemos. Obtén acceso anticipado exclusivo y ofertas especiales para los mejores hoteles en Medellín.",
    emailPlaceholder: "Ingresa tu correo",
    subscribe: "Obtener Acceso Anticipado",
    success: "¡Gracias por suscribirte!",
    error: "Ocurrió un error. Por favor intenta de nuevo.",
    invalidEmail: "Por favor ingresa un correo válido"
  }
};

export type Language = 'en' | 'es';

export function getText(key: string, lang: Language): string {
  return translations[lang][key] || translations['en'][key];
}
