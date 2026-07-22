"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function FooterLayout() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  const quickLinks = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "services", path: "/services" },
    { name: "contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://tiktok.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
          <polygon points="10 15 15 12 10 9" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#141312] text-zinc-100 border-t border-amber-500/20 mt-auto">
      {/* Top Gold Hairline Accent */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Main Gold-Accent Footer Content */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* Column 1: Brand & Message */}
        <div className="md:col-span-4 flex flex-col items-start gap-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-500/30 p-0.5 flex items-center justify-center bg-amber-500/10">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                <Image
                  src="/common/logo.png"
                  alt="T99 Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-black tracking-widest text-xl text-white uppercase leading-none">
                T99
              </span>
              <span className="text-[9px] font-extrabold tracking-[0.25em] text-amber-400 uppercase mt-0.5">
                BARBER SHOP
              </span>
            </div>
          </Link>
          
          <p className="text-xs md:text-sm text-zinc-300 max-w-[36ch] leading-relaxed font-normal">
            {t("aboutDesc")}
          </p>
        </div>

        {/* Column 2: Working Hours */}
        <div className="md:col-span-4 flex flex-col items-start gap-3">
          <h2 className="font-serif font-black text-lg uppercase tracking-widest text-amber-400">
            {t("hoursTitle")}
          </h2>
          <div className="flex flex-col gap-2 text-xs md:text-sm text-zinc-300 font-normal">
            <p>{t("hoursMon")}</p>
            <p>{t("hoursTueSun")}</p>
            <p className="mt-2 text-xs text-amber-400/90 font-mono">t99barbershopvn@gmail.com</p>
          </div>
        </div>

        {/* Column 3: Follow Us */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <h2 className="font-serif font-black text-lg uppercase tracking-widest text-amber-400">
            {t("followUsTitle")}
          </h2>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-amber-500/20 bg-amber-500/10 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Quick Nav Links */}
          <nav className="flex items-center gap-4 text-xs font-serif font-bold tracking-wider uppercase mt-4 text-zinc-300">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="hover:text-amber-400 transition-colors"
              >
                {tHeader(link.name)}
              </Link>
            ))}
          </nav>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-zinc-800/80 bg-[#0C0C0B] px-6 py-5 text-center text-xs text-zinc-400 font-sans">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-serif font-bold uppercase tracking-widest text-amber-400">
            T99 BARBER SHOP - FROM HEART TO HAIR!
          </p>
          <p className="text-[11px] text-zinc-500">{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}