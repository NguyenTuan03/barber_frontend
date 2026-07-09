import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70dvh] px-4 py-24 text-center">
      {/* 404 Double-Bezel Indicator */}
      <div className="w-20 h-20 rounded-[2rem] bg-zinc-100/80 dark:bg-zinc-900/80 p-0.5 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner flex items-center justify-center mb-8">
        <div className="w-full h-full rounded-[calc(2rem-0.25rem)] bg-zinc-950 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-amber-500 font-mono font-extrabold text-xl">
          404
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase font-sans mb-4">
        {t("title")}
      </h1>

      <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-[45ch] mb-10 leading-relaxed">
        {t("description")}
      </p>

      {/* Primary CTA - Button-in-Button Pattern */}
      <Link
        href="/"
        className="flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold tracking-wide shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-all duration-300 hover:scale-[0.98] active:scale-[0.95] group"
      >
        <span>{t("button")}</span>
        <span className="w-8 h-8 rounded-full bg-white/10 dark:bg-zinc-950/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </Link>
    </main>
  );
}
