"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error("Runtime error caught by ErrorBoundary:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70dvh] px-4 py-24 text-center">
      {/* Warning Double-Bezel Indicator */}
      <div className="w-20 h-20 rounded-[2rem] bg-zinc-100/80 dark:bg-zinc-900/80 p-0.5 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner flex items-center justify-center mb-8">
        <div className="w-full h-full rounded-[calc(2rem-0.25rem)] bg-zinc-950 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-red-500 font-mono font-extrabold text-xl">
          ⚠️
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white uppercase font-sans mb-4">
        {t("title")}
      </h1>

      <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-[45ch] mb-10 leading-relaxed">
        {t("description")}
      </p>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Retry Button - Button-in-Button Pattern */}
        <button
          onClick={() => reset()}
          className="flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold tracking-wide shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-all duration-300 hover:scale-[0.98] active:scale-[0.95] group cursor-pointer"
        >
          <span>{t("retry")}</span>
          <span className="w-8 h-8 rounded-full bg-white/10 dark:bg-zinc-950/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-3.5 h-3.5 transition-transform duration-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </span>
        </button>

        {/* Go Home Secondary Button */}
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[0.98] active:scale-[0.95]"
        >
          {t("button")}
        </Link>
      </div>
    </main>
  );
}
