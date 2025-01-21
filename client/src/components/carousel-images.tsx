import type { FC } from "react";

const cityImage = {
  url: "https://images.unsplash.com/photo-1598227891897-23cc8627dd44?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3",
  alt: "Aerial view of Medellín with mountains and urban landscape",
};

interface CarouselImagesProps {
  className?: string;
}

export function CarouselImages({ className = "" }: CarouselImagesProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      <img
        src={cityImage.url}
        alt={cityImage.alt}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
}