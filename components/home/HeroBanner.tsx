import Image from "next/image";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/common/ScrollReveal";

type HeroBannerProps = {
  title: string;
  subtitle: string;
  tBanner: (key: string) => string;
}

export default function HeroBanner({ title, subtitle, tBanner }: HeroBannerProps) {
  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[85vh] flex flex-col items-center justify-center pt-16 md:pt-24 pb-24 md:pb-32 px-6 bg-zinc-950 text-white overflow-hidden">
      
      {/* Background Image Full Size Tràn Lề */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/hero-bg.png"
          alt="T99 Barber Shop Heritage Space"
          fill
          priority
          className="object-cover opacity-45 filter brightness-90"
        />
        {/* Dark Vignette Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950/95 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
        
        {/* Main Headline (Editorial Serif Uppercase) */}
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-white font-serif font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.12] uppercase max-w-[20ch]">
            {title}
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-zinc-200 text-sm md:text-base lg:text-lg max-w-[55ch] font-sans font-normal leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        {/* Action Buttons Row (Pill Shaped Buttons) */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full sm:w-auto">
            {/* Book Now - Solid Gold/Amber Pill Button */}
            <Link
              href="/booking"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#d4c3a3] via-amber-500 to-[#c5a059] hover:opacity-95 text-zinc-950 font-sans font-bold text-xs tracking-wider rounded-full transition-all duration-300 text-center uppercase shadow-lg shadow-amber-500/20"
            >
              {tBanner("bookBtn")}
            </Link>

            {/* Services - Outline White Pill Button */}
            <Link
              href="/services"
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-sans font-bold text-xs tracking-wider rounded-full transition-all duration-300 text-center uppercase"
            >
              {tBanner("servicesBtn")}
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}