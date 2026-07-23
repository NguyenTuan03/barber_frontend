"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "@wrksz/themes/client";

const emptySubscribe = () => () => {};

export default function HeaderLayout() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();

    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const headerItem = [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
        { name: "services", path: "/services" },
        { name: "contact", path: "/contact" },
    ];

    type LocaleType = typeof locale;

    const toggleLanguage = () => {
        const nextLocale: LocaleType = locale === "vi" ? "en" : "vi";
        router.replace(pathname, { locale: nextLocale });
    };

    const toggleTheme = () => {
        const isDark = resolvedTheme === "dark" || theme === "dark";
        setTheme(isDark ? "light" : "dark");
    };

    const isDarkMode = isMounted && (resolvedTheme === "dark" || theme === "dark");

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs py-3"
                    : "bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/50 dark:border-zinc-900 py-4"
            } backdrop-blur-md`}
        >
            <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between">
                
                {/* Logo Section - Logo Mặc Định */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 relative flex-shrink-0">
                        <Image
                            src="/common/logo.png"
                            alt="T99 Barber Shop Logo"
                            width={36}
                            height={36}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="font-extrabold tracking-widest text-base text-zinc-900 dark:text-white uppercase font-sans">
                        T99
                    </span>
                </Link>

                {/* Center Navigation Links - Clear Sans-Serif Font */}
                <nav className="hidden md:flex items-center gap-8">
                    {headerItem.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-xs font-sans font-extrabold tracking-wider uppercase transition-colors relative py-1 ${
                                    isActive
                                        ? "text-zinc-950 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-500"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                                }`}
                            >
                                {t(item.name)}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Section */}
                <div className="flex items-center gap-3">
                    {/* Theme Switcher Desktop */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white text-zinc-800 dark:text-zinc-200 transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center"
                        aria-label="Toggle theme"
                        title={isDarkMode ? t("themeLight") : t("themeDark")}
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-amber-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m15.364-6.364l-1.591 1.591M6.343 17.657l-1.591 1.591m12.728 0l-1.591-1.591M6.343 6.343L4.752 4.752M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-zinc-700 dark:text-zinc-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>

                    {/* Language Switcher Desktop */}
                    <button
                        onClick={toggleLanguage}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white text-[11px] font-sans font-bold tracking-wider text-zinc-800 dark:text-zinc-200 transition-all duration-200 cursor-pointer uppercase shadow-2xs"
                        aria-label="Toggle language"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 text-zinc-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.997 8.997 0 0 1-7.843-4.582M12 21a8.997 8.997 0 0 0 7.843-4.582m-15.686 0A11.953 11.953 0 0 1 12 10.5c2.998 0 5.74-1.1 7.843-2.918m-15.686 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 12.5c2.998 0 5.74-1.1 7.843-2.918" />
                        </svg>
                        <span>{locale}</span>
                    </button>

                    {/* Book Now Button Desktop */}
                    <Link
                        href="/booking"
                        className="hidden sm:inline-flex px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-sans font-bold text-xs tracking-wider rounded-full transition-all duration-300 uppercase shadow-2xs"
                    >
                        {t("cta")}
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                            <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                            <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                            <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <div
                className={`absolute top-full left-0 right-0 w-full h-[calc(100dvh-100%)] min-h-[calc(100dvh-100%)] bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl border-t border-zinc-200/50 dark:border-zinc-800/50 z-40 md:hidden flex flex-col justify-between p-8 overflow-y-auto transition-all duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                }`}
            >
                <nav className="flex flex-col gap-6 font-sans text-xl font-bold tracking-wider text-zinc-900 dark:text-white uppercase">
                    {headerItem.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="py-2 border-b border-zinc-200 dark:border-zinc-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                        >
                            {t(item.name)}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-col gap-3 mt-8">
                    {/* Theme Switcher Mobile */}
                    <button
                        onClick={toggleTheme}
                        className="py-3.5 px-5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100/80 dark:bg-white/5 active:bg-zinc-200 dark:active:bg-white/10 text-zinc-900 dark:text-white text-xs font-sans font-bold uppercase tracking-wider flex justify-between items-center transition-colors"
                    >
                        <span className="text-zinc-600 dark:text-zinc-300">{t("theme")}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-2">
                            {isDarkMode ? (
                                <>
                                    <span>{t("themeDark")}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-amber-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m15.364-6.364l-1.591 1.591M6.343 17.657l-1.591 1.591m12.728 0l-1.591-1.591M6.343 6.343L4.752 4.752M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <span>{t("themeLight")}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-zinc-700 dark:text-zinc-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                </>
                            )}
                        </span>
                    </button>

                    {/* Language Switcher Mobile */}
                    <button
                        onClick={toggleLanguage}
                        className="py-3.5 px-5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100/80 dark:bg-white/5 active:bg-zinc-200 dark:active:bg-white/10 text-zinc-900 dark:text-white text-xs font-sans font-bold uppercase tracking-wider flex justify-between items-center transition-colors"
                    >
                        <span className="text-zinc-600 dark:text-zinc-300">{t("language")}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold">{locale === "vi" ? "Tiếng Việt (VI)" : "English (EN)"}</span>
                    </button>

                    <Link
                        href="/booking"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-center font-sans font-bold text-sm tracking-wider uppercase transition-colors"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </header>
    );
}