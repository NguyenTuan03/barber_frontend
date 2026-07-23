"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "@wrksz/themes/client";

const emptySubscribe = () => () => { };

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
        { name: "products", path: "/products" },
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
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b ${
                isOpen
                    ? "bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800/80 py-4 md:py-3.5 shadow-md"
                    : scrolled
                    ? "bg-white/90 dark:bg-zinc-950/90 border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl py-3.5 md:py-2.5 shadow-sm"
                    : "bg-white/80 dark:bg-zinc-950/80 border-zinc-200/40 dark:border-zinc-800/40 backdrop-blur-lg py-4.5 md:py-3.5"
            }`}
        >
            <div className="mx-auto max-w-7xl px-5 md:px-10 flex items-center justify-between">

                {/* Brand Logo & Slim Heritage Title */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 md:w-8 md:h-8 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/common/logo.png"
                            alt="T99 Barber Shop Logo"
                            width={36}
                            height={36}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-black tracking-widest text-base md:text-lg text-zinc-950 dark:text-white uppercase leading-none">
                            T99 <span className="text-amber-500 font-sans font-bold text-xs">BARBER</span>
                        </span>
                        <span className="text-[9px] font-sans font-medium tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase leading-none mt-1 hidden sm:block">
                            LUXURY HAIR SALON
                        </span>
                    </div>
                </Link>

                {/* Center Navigation Links - Slim Understated Style (Tim Barber Shop Inspired) */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                    {headerItem.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-[11px] font-sans font-extrabold tracking-[0.18em] uppercase transition-all duration-300 relative py-1.5 ${
                                    isActive
                                        ? "text-amber-600 dark:text-amber-400 font-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-500 after:rounded-full"
                                        : "text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400"
                                }`}
                            >
                                {t(item.name)}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Section */}
                <div className="flex items-center gap-3">
                    {/* Theme Switcher Button */}
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 md:w-8 md:h-8 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 text-zinc-800 dark:text-zinc-200 transition-all duration-300 cursor-pointer flex items-center justify-center bg-zinc-100/40 dark:bg-zinc-900/40 active:scale-95"
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

                    {/* Language Switcher Button */}
                    <button
                        onClick={toggleLanguage}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 text-[11px] font-sans font-extrabold tracking-wider text-zinc-800 dark:text-zinc-200 transition-all duration-300 cursor-pointer uppercase bg-zinc-100/40 dark:bg-zinc-900/40"
                        aria-label="Toggle language"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 text-zinc-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.997 8.997 0 0 1-7.843-4.582M12 21a8.997 8.997 0 0 0 7.843-4.582m-15.686 0A11.953 11.953 0 0 1 12 10.5c2.998 0 5.74-1.1 7.843-2.918m-15.686 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 12.5c2.998 0 5.74-1.1 7.843-2.918" />
                        </svg>
                        <span>{locale}</span>
                    </button>

                    {/* Book Now Button Desktop (Slim Elegant Amber Pill Button) */}
                    <Link
                        href="/booking"
                        className="hidden sm:inline-flex px-6 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-extrabold text-[11px] tracking-widest rounded-full transition-all duration-300 uppercase shadow-md shadow-amber-500/10 active:scale-95"
                    >
                        {t("cta")}
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white bg-zinc-100/60 dark:bg-zinc-900/60 transition-colors active:scale-95"
                        aria-label="Toggle menu"
                    >
                        <div className="w-4.5 h-4 relative flex flex-col justify-between items-center">
                            <span className={`w-4.5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                            <span className={`w-4.5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                            <span className={`w-4.5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Glass Drawer Menu Seamlessly Attached to Header */}
            <div
                className={`absolute top-full left-0 right-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 z-40 md:hidden flex flex-col justify-between p-5 sm:p-6 shadow-2xl transition-all duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                }`}
                style={{ maxHeight: "calc(100dvh - 70px)" }}
            >
                <nav className="flex flex-col gap-1 font-sans text-sm font-extrabold tracking-wider text-zinc-900 dark:text-white uppercase">
                    {headerItem.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="py-3 px-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900/80 hover:text-amber-600 dark:hover:text-amber-400 transition-all flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900/60"
                        >
                            <span>{t(item.name)}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
                    {/* Theme Switcher Mobile */}
                    <button
                        onClick={toggleTheme}
                        className="py-3 px-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-white text-xs font-sans font-bold uppercase tracking-wider flex justify-between items-center transition-colors"
                    >
                        <span className="text-zinc-600 dark:text-zinc-400">{t("theme")}</span>
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
                        className="py-3 px-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-white text-xs font-sans font-bold uppercase tracking-wider flex justify-between items-center transition-colors"
                    >
                        <span className="text-zinc-600 dark:text-zinc-400">{t("language")}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold">{locale === "vi" ? "Tiếng Việt (VI)" : "English (EN)"}</span>
                    </button>

                    <Link
                        href="/booking"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-center font-sans font-extrabold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-amber-500/20 mt-1"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </header>
    );
}