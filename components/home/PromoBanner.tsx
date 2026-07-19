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
    <section className="relative w-full py-24 md:py-36 px-4 bg-zinc-950 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/promo-bg.png"
          alt="Barber concierge service background"
          fill
          className="object-cover opacity-35"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-white font-extrabold text-2xl md:text-4xl tracking-tight leading-tight uppercase font-sans max-w-[20ch]">
          {title}
        </h2>

        <Link
          href="/booking"
          className="px-8 py-4 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase shadow-lg shadow-zinc-950/40 mt-4"
        >
          {tPromo("bookBtn")}
        </Link>
      </div>
    </section>
  );
}