"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function HeaderLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("Header");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Ngăn chặn cuộn trang khi menu di động đang mở
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const headerItem = [
        { name: "home" as const, path: "/" },
        { name: "about" as const, path: "/about" },
        { name: "services" as const, path: "/services" },
        { name: "contact" as const, path: "/contact" },
    ];

    type LocaleType = typeof locale;

    const toggleLanguage = () => {
        const nextLocale: LocaleType = locale === "vi" ? "en" : "vi";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled
                ? "px-4 md:px-8 py-3 md:py-4"
                : "px-4 md:px-8 py-5 md:py-6"
                }`}
        >
            {/* Floating Island Navigation Bar */}
            <div
                className={`mx-auto max-w-5xl rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between px-5 md:px-6 py-2.5 md:py-3 ${scrolled
                    ? "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] bg-white/80 dark:bg-zinc-950/80"
                    : "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.02)]"
                    }`}
            >
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    {/* Double-Bezel Logo Icon */}
                    <div className="w-9 h-9 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 p-0.5 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-amber-500">
                            <Image src="/common/logo.png" alt="Logo" width={250} height={250} />
                        </div>
                    </div>
                    <span className="font-extrabold tracking-widest text-base text-zinc-900 dark:text-white uppercase font-sans">
                        T99
                    </span>
                </Link>

                {/* Center Links (Desktop) */}
                <nav className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/40 p-1 rounded-full border border-black/5 dark:border-white/5">
                    {headerItem.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${isActive
                                    ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                                    }`}
                            >
                                {t(item.name)}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions Section (Desktop) */}
                <div className="flex items-center gap-3">
                    {/* Language Switcher */}
                    <button
                        onClick={toggleLanguage}
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-[11px] font-extrabold tracking-wider text-zinc-700 dark:text-zinc-300 transition-all duration-300 cursor-pointer"
                        aria-label="Toggle language"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 opacity-60"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.997 8.997 0 0 1-7.843-4.582M12 21a8.997 8.997 0 0 0 7.843-4.582m-15.686 0A11.953 11.953 0 0 1 12 10.5c2.998 0 5.74-1.1 7.843-2.918m-15.686 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 12.5c2.998 0 5.74-1.1 7.843-2.918" />
                        </svg>
                        <span className="uppercase">{locale}</span>
                    </button>

                    {/* Theme Switcher Button */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 transition-all duration-300 cursor-pointer bg-transparent"
                        aria-label="Toggle theme"
                    >
                        {!mounted ? (
                            <div className="w-4 h-4 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
                        ) : theme === "dark" ? (
                            // Sun icon (Switch to light)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-amber-500"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M4.22 19.78l1.59-1.59m12.38-12.38l1.59-1.59M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
                            </svg>
                        ) : (
                            // Moon icon (Switch to dark)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-zinc-700"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>

                    {/* CTA - Button-in-Button Pattern */}
                    <Link
                        href="/booking"
                        className="hidden md:flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold tracking-wide shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-all duration-300 hover:scale-[0.98] active:scale-[0.95] group"
                    >
                        <span>{t("cta")}</span>
                        <span className="w-7 h-7 rounded-full bg-white/10 dark:bg-zinc-950/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-105">
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

                    {/* Hamburger Menu Trigger (Mobile) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex md:hidden flex-col items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-all duration-300 z-50 cursor-pointer ${
                            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-4 h-3.5 flex flex-col justify-between">
                            <span
                                className="w-4 h-0.5 bg-zinc-950 dark:bg-white rounded-full transition-all duration-300"
                            />
                            <span
                                className="w-4 h-0.5 bg-zinc-950 dark:bg-white rounded-full transition-all duration-300"
                            />
                            <span
                                className="w-4 h-0.5 bg-zinc-950 dark:bg-white rounded-full transition-all duration-300"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Full-Screen Mobile Drawer with Backdrop Glass */}
            <div
                className={`fixed inset-0 z-40 bg-zinc-950/90 dark:bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-between px-6 py-10 pt-24 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-4"
                    }`}
            >
                {/* Close Button inside Drawer */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white active:bg-white/10 hover:bg-white/10 transition-colors z-50 cursor-pointer"
                    aria-label="Close menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Navigation Items */}
                <nav className="flex flex-col gap-6 text-2xl font-bold tracking-tight text-white mt-4">
                    {headerItem.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`transition-all duration-500 py-2 border-b border-white/5 flex items-center justify-between group ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                            style={{
                                transitionDelay: isOpen ? `${index * 75 + 100}ms` : "0ms",
                            }}
                        >
                            <span className="group-hover:text-amber-400 transition-colors">
                                {t(item.name)}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-amber-400"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    ))}
                </nav>

                {/* Footer actions inside Mobile Menu */}
                <div
                    className={`flex flex-col gap-4 transition-all duration-500 delay-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                        }`}
                >
                    {/* Mobile Language Toggler */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center justify-between w-full py-3.5 px-5 rounded-xl border border-white/10 text-white text-xs font-semibold tracking-wider bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
                    >
                        <span className="text-zinc-400">{t("language")}</span>
                        <span className="text-amber-400 flex items-center gap-1.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3.5 h-3.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.997 8.997 0 0 1-7.843-4.582M12 21a8.997 8.997 0 0 0 7.843-4.582m-15.686 0A11.953 11.953 0 0 1 12 10.5c2.998 0 5.74-1.1 7.843-2.918m-15.686 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 12.5c2.998 0 5.74-1.1 7.843-2.918" />
                            </svg>
                            {locale === "vi" ? "Tiếng Việt (VI)" : "English (EN)"}
                        </span>
                    </button>

                    {/* Mobile Theme Switcher */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-between w-full py-3.5 px-5 rounded-xl border border-white/10 text-white text-xs font-semibold tracking-wider bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
                    >
                        <span className="text-zinc-400">{t("theme")}</span>
                        <span className="text-amber-400 flex items-center gap-1.5">
                            {!mounted ? (
                                <div className="w-16 h-4 rounded bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
                            ) : theme === "dark" ? (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M4.22 19.78l1.59-1.59m12.38-12.38l1.59-1.59M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
                                    </svg>
                                    {t("themeDark")}
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                    {t("themeLight")}
                                </>
                            )}
                        </span>
                    </button>

                    {/* Mobile CTA */}
                    <Link
                        href="/booking"
                        className="w-full py-4 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black text-center font-extrabold text-sm tracking-wider shadow-lg shadow-amber-500/10 transition-all duration-300"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </header>
    );
}