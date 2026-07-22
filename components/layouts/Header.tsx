"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeaderLayout() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
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

                    {/* Book Now Button */}
                    <Link
                        href="/booking"
                        className="hidden sm:inline-flex px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-sans font-bold text-xs tracking-wider rounded-full transition-all duration-300 uppercase shadow-2xs"
                    >
                        {t("cta")}
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white"
                        aria-label="Toggle menu"
                    >
                        <span className={`h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`} />
                        <span className={`h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <div
                className={`fixed inset-0 top-[65px] bg-zinc-950/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-between p-8 transition-all duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <nav className="flex flex-col gap-6 font-sans text-xl font-bold tracking-wider text-white uppercase">
                    {headerItem.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="py-2 border-b border-zinc-800 hover:text-amber-400 transition-colors"
                        >
                            {t(item.name)}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="py-3.5 px-5 rounded-2xl border border-white/30 bg-white/5 active:bg-white/10 text-white text-xs font-sans font-bold uppercase tracking-wider flex justify-between items-center transition-colors"
                    >
                        <span className="text-zinc-300">{t("language")}</span>
                        <span className="text-amber-400 font-extrabold">{locale === "vi" ? "Tiếng Việt (VI)" : "English (EN)"}</span>
                    </button>

                    <Link
                        href="/booking"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 rounded-full bg-white text-zinc-950 text-center font-sans font-bold text-sm tracking-wider uppercase"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </header>
    );
}