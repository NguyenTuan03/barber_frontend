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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://tiktok.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
          <polygon points="10 15 15 12 10 9" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-900 mt-auto">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Left Column: Brand & Socials */}
        <div className="md:col-span-5 flex flex-col items-start gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Double-Bezel Logo */}
            <div className="w-9 h-9 rounded-xl bg-zinc-900 p-0.5 border border-zinc-800 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
                <Image
                  src="/common/logo.png"
                  alt="T99 Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <span className="font-extrabold tracking-widest text-base text-white uppercase font-sans">
              T99
            </span>
          </Link>
          
          <p className="text-sm text-zinc-400 max-w-[36ch] leading-relaxed">
            {t("aboutDesc")}
          </p>

          {/* Social Icons - Double Bezel Pattern */}
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 p-0.5 border border-zinc-800/80 flex items-center justify-center hover:border-amber-500/50 hover:scale-105 transition-all duration-300 group/icon"
                aria-label={social.name}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-zinc-400 group-hover/icon:text-amber-500 transition-colors duration-300">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="md:col-span-3 flex flex-col items-start gap-4">
          <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-white">
            {t("linksTitle")}
          </h2>
          <nav className="flex flex-col gap-3 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {tHeader(link.name)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Column: Contact & Hours */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-white">
            {t("contactTitle")}
          </h2>
          
          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <p className="leading-relaxed">
              <span className="block font-semibold text-white mb-0.5">{t("addressLabel")}</span>
              {t("addressVal")}
            </p>
            
            <p>
              <span className="font-semibold text-white mr-1.5">{t("phoneLabel")}</span>
              <a href="tel:0901234567" className="hover:text-amber-500 transition-colors">
                090 123 4567
              </a>
            </p>

            <p>
              <span className="font-semibold text-white mr-1.5">{t("hoursLabel")}</span>
              {t("hoursVal")}
            </p>
          </div>
        </div>

      </div>

      {/* Lower Footer section */}
      <div className="w-full border-t border-zinc-900/60 bg-zinc-950/80 px-6 py-6 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t("rights")}</p>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <span>Premium Grooming</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <span>Established 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}