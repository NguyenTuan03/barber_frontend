import Image from "next/image";
import { Link } from "@/i18n/routing";
type HeroBannerProps = {
  title: string;
  subtitle: string;
  tBanner: (key: string) => string;
}
export default function HeroBanner({ title, subtitle, tBanner }: HeroBannerProps) {
  return (
    <section className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center pt-24 pb-36 px-4 bg-zinc-950 overflow-hidden">
      {/* Background Image using Next.js Image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/hero-bg.png"
          alt="T99 Barber Shop Hero"
          fill
          className="object-cover opacity-45"
          priority
        />
        {/* Gradients to merge image with layout dark theme and make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/60 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 mt-8 md:mt-16">
        {/* Main Headline */}
        <h1 className="text-white font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] uppercase max-w-[20ch] font-sans">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-200 text-sm md:text-base lg:text-lg max-w-[50ch] font-medium leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full sm:w-auto">
          {/* Book Now - Beige Solid Button */}
          <Link
            href="/booking"
            className="w-full sm:w-auto px-8 py-4 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase"
          >
            {tBanner("bookBtn")}
          </Link>

          {/* Services - White Outline Button */}
          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white hover:bg-white/10 active:scale-[0.98] text-white text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase"
          >
            {tBanner("servicesBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}