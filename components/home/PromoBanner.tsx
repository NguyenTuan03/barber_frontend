import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function PromotionBanner({
  title,
  tPromo
}: {
  title: string;
  tPromo(key: string): string;
}) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-zinc-900 dark:bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center text-center border-y border-amber-500/20 transition-colors duration-300">
      {/* Background image & ambient glow */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20">
        <Image
          src="/images/promo-bg.png"
          alt="Barber concierge service background"
          fill
          sizes="100vw"
          className="object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-900/70 to-zinc-950/90" />
      </div>

      {/* Subtle radial highlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-5">
        <div className="flex items-center gap-3 justify-center mb-1">
          <span className="h-px w-6 bg-amber-500/60" />
          <span className="text-xs font-sans font-extrabold tracking-[0.25em] text-amber-400 uppercase">
            T99 BARBER SHOP EXPERIENCE
          </span>
          <span className="h-px w-6 bg-amber-500/60" />
        </div>

        <h2 className="text-white font-serif font-black text-2xl md:text-4xl lg:text-5xl tracking-tight leading-tight uppercase max-w-[24ch]">
          {title}
        </h2>

        <Link
          href="/booking"
          className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-sans font-extrabold tracking-widest rounded-full transition-all duration-300 text-center uppercase shadow-lg shadow-amber-500/20 hover:scale-105 mt-3"
        >
          {tPromo("bookBtn")}
        </Link>
      </div>
    </section>
  );
}