import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { apiFetch } from "@/utils/api-client";

interface APIServiceItem {
  id: number | string;
  name: string;
  description?: string;
  price: string;
  image_url?: string;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tBanner = await getTranslations("Banner");
  const tAbout = await getTranslations("About");
  const tServices = await getTranslations("Services");
  const tPromo = await getTranslations("Promo");
  const tWhyChoose = await getTranslations("WhyChoose");
  const tContact = await getTranslations("Contact");

  const defaultServicesList = [
    {
      id: "adultHaircut",
      price: "$39 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          {/* Intersecting Scissors and Comb */}
          <circle cx="6" cy="16" r="2.5" />
          <circle cx="14" cy="16" r="2.5" />
          <path d="M8 14.5L16.5 6M12 14.5L7.5 6" />
          <path d="M19 4v10M16 4v3M13 4v3M10 4v3M7 4v3" />
        </svg>
      ),
    },
    {
      id: "kidsHaircut",
      price: "$19 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          {/* Barber Comb */}
          <path d="M4 6h16v4H4z" />
          <path d="M6 10v4M9 10v4M12 10v4M15 10v4M18 10v4" />
        </svg>
      ),
    },
    {
      id: "beardTrim",
      price: "$29 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          {/* Hair Clipper */}
          <path d="M9 4h6l-1 4H10zM10 8v10a2 2 0 002 2h0a2 2 0 002-2V8" />
          <path d="M9.5 4v-2M11 4v-2M12.5 4v-2M14 4v-2" />
        </svg>
      ),
    },
    {
      id: "neckShave",
      price: "$39 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          {/* Straight Razor */}
          <path d="M6 18c0-3.3 2.7-6 6-6h8" />
          <path d="M12 12L7 4h10l3 8" />
        </svg>
      ),
    },
    {
      id: "scalpMoisturizing",
      price: "$10 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          {/* Lotion Bottle */}
          <path d="M8 8h8v11a2 2 0 01-2 2H10a2 2 0 01-2-2V8zM10 8V5a1 1 0 011-1h2a1 1 0 011 1v3" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      ),
    },
    {
      id: "beardGrooming",
      price: "$49 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          {/* Mustache and Beard outline */}
          <path d="M5 8c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2-1-4-3-4-2 0-3 2-5 2s-3-2-5-2c-2 0-3 2-3 4z" />
          <path d="M8 9c2-1 3 1 4 1s2-2 4-1c0 0-1 2-2 2s-2-2-4-1z" />
        </svg>
      ),
    },
  ];

  const whyChooseFeats = [
    {
      id: "feat1",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-7 h-7 text-zinc-950 dark:text-amber-500"
        >
          {/* Document / License Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
          <circle cx="16.5" cy="18.5" r="1" />
        </svg>
      ),
    },
    {
      id: "feat2",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-7 h-7 text-zinc-950 dark:text-amber-500"
        >
          {/* Master Barber Head Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
          <path d="M10.5 13.5c1 .5 2 .5 3 0" />
        </svg>
      ),
    },
    {
      id: "feat3",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-7 h-7 text-zinc-950 dark:text-amber-500"
        >
          {/* Trust Shield Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
    },
  ];

  // Fetch services data dynamically from Backend or fallback to static data
  let servicesList: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    icon: React.ReactNode;
  }> = [];

  try {
    const data = await apiFetch<APIServiceItem[]>("/api/v1/services", {
      locale,
      next: { revalidate: 60 },
    });

    servicesList = data.map((item: APIServiceItem, index: number) => {
      const defaultService = defaultServicesList[index % defaultServicesList.length];
      return {
        id: item.id.toString(),
        name: item.name || "",
        description: item.description || "",
        price: item.price || defaultService.price,
        icon: defaultService.icon,
      };
    });
  } catch {
    servicesList = defaultServicesList.map((service) => ({
      id: service.id,
      name: tServices(`${service.id}Title`),
      description: tServices(`${service.id}Desc`),
      price: service.price,
      icon: service.icon,
    }));
  }

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center pt-24 pb-36 px-4 bg-zinc-950 overflow-hidden">
        {/* Background Image using Next.js Image with overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/hero-bg.png"
            alt="T99 Barber Shop Hero"
            fill
            className="object-cover opacity-45"
            priority
          />
          {/* Gradients to merge image with layout dark theme and make text pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/60 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 mt-8 md:mt-16">
          {/* Main Headline */}
          <h1 className="text-white font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] uppercase max-w-[20ch] font-sans">
            {tBanner("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-200 text-sm md:text-base lg:text-lg max-w-[50ch] font-medium leading-relaxed">
            {tBanner("subtitle")}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full sm:w-auto">
            {/* Book Now - Beige Solid Button */}
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase"
            >
              {tBanner("bookBtn")}
            </Link>

            {/* Services - White Outline Button */}
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white hover:bg-white/10 active:scale-[0.98] text-white text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase"
            >
              {tBanner("servicesBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Shop Info Block */}
      <section className="relative z-20 w-full max-w-5xl mx-auto -mt-16 md:-mt-20 px-4 mb-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl shadow-[0_24px_50px_rgba(0,0,0,0.06)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-800 p-6 md:p-8">
          
          {/* Col 1: Address */}
          <div className="flex flex-col items-center text-center p-4 md:p-6 gap-3">
            {/* Minimal SVG Pin Icon */}
            <div className="text-amber-500 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
              {tBanner("addressTitle")}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold max-w-[28ch] leading-relaxed uppercase">
              {tBanner("addressVal")}
            </p>
          </div>

          {/* Col 2: Phone */}
          <div className="flex flex-col items-center text-center p-4 md:p-6 gap-3">
            {/* Minimal SVG Phone Icon */}
            <div className="text-amber-500 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.622c0-1.272.78-2.319 1.938-2.67 1.15-.35 2.4-.1 3.248.672l1.637 1.513c.636.587.828 1.503.483 2.274l-.79 1.777c-.33.742-.15 1.62.454 2.186l3.41 3.142a2.182 2.182 0 0 0 2.122.421l1.792-.706c.76-.3 1.666-.085 2.22.524l1.652 1.815c.677.744.75 1.84.174 2.58a12.35 12.35 0 0 1-5.467 4.093c-1.127.394-2.365.19-3.21-.607l-9.03-8.312A9.09 9.09 0 0 1 2.25 6.622Z"
                />
              </svg>
            </div>
            <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
              {tBanner("phoneTitle")}
            </h3>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold flex flex-col gap-1">
              <a href={`tel:${tBanner("phoneVal1")}`} className="hover:text-amber-500 transition-colors">
                {tBanner("phoneVal1")}
              </a>
            </div>
          </div>

          {/* Col 3: Hours */}
          <div className="flex flex-col items-center text-center p-4 md:p-6 gap-3">
            {/* Minimal SVG Clock Icon */}
            <div className="text-amber-500 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
              {tBanner("hoursTitle")}
            </h3>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold flex flex-col gap-0.5 uppercase">
              <span>{tBanner("hoursVal1")}</span>
              <span>{tBanner("hoursVal2")}</span>
            </div>
          </div>

        </div>
      </section>

      {/* About Service Section (Asymmetric Editorial Split layout) */}
      <section className="w-full bg-[#FDFBF7] dark:bg-zinc-950/40 py-20 md:py-28 px-6 md:px-8 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Text & Stats */}
          <div className="md:col-span-7 flex flex-col items-start gap-5">
            <h2 className="text-zinc-950 dark:text-white font-extrabold text-3xl md:text-4xl tracking-tight leading-tight uppercase font-sans max-w-[16ch]">
              {tAbout("title")}
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[50ch] mb-4">
              {tAbout("description")}
            </p>

            {/* Statistics Row */}
            <div className="w-full grid grid-cols-2 gap-8 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-8 mt-2">
              {/* Stat 1 */}
              <div className="flex flex-col items-start">
                <div className="text-zinc-950 dark:text-white text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                  <span>{tAbout("stat1Num")}</span>
                  <span className="text-amber-500 font-extrabold text-2xl md:text-3xl ml-0.5">
                    {tAbout("stat1Suffix")}
                  </span>
                </div>
                <div className="text-[10px] md:text-xs font-extrabold tracking-[0.18em] text-zinc-400 dark:text-zinc-500 mt-2 leading-snug max-w-[15ch] uppercase">
                  {tAbout("stat1Label")}
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-start">
                <div className="text-zinc-950 dark:text-white text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                  <span>{tAbout("stat2Num")}</span>
                  <span className="text-amber-500 font-extrabold text-2xl md:text-3xl ml-0.5">
                    {tAbout("stat2Suffix")}
                  </span>
                </div>
                <div className="text-[10px] md:text-xs font-extrabold tracking-[0.18em] text-zinc-400 dark:text-zinc-500 mt-2 leading-snug max-w-[15ch] uppercase">
                  {tAbout("stat2Label")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Double-Bezel Image Shell */}
          <div className="md:col-span-5 w-full flex justify-center">
            {/* Outer Bezel Enclosure */}
            <div className="w-full aspect-square max-w-[380px] rounded-[2.25rem] bg-zinc-200/50 dark:bg-zinc-900/50 p-1.5 border border-zinc-300/40 dark:border-zinc-800/40 shadow-sm overflow-hidden">
              {/* Inner Core Container */}
              <div className="relative w-full h-full rounded-[calc(2.25rem-0.375rem)] bg-zinc-950 overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                <Image
                  src="/images/about-img.png"
                  alt="Professional barber styling hair"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Browse Services Section (Editorial Grid inside white card) */}
      <section className="w-full bg-[#FDFBF7] dark:bg-zinc-950/40 py-20 md:py-28 px-6 md:px-8 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Centered Heading */}
          <h2 className="text-zinc-950 dark:text-white font-extrabold text-3xl md:text-4xl tracking-tight leading-tight uppercase font-sans mb-4 text-center">
            {tServices("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[60ch] text-center mb-16">
            {tServices("subtitle")}
          </p>

          {/* Large Floating Services Card */}
          <div className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.04)] p-8 md:p-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12">
              {servicesList.map((service) => (
                <div key={service.id} className="flex items-start gap-5 group">
                  {/* Left Side: Icon Container */}
                  <div className="w-12 h-12 flex items-center justify-center text-zinc-950 dark:text-amber-500 flex-shrink-0 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/30 dark:border-zinc-800/30 p-2 transition-transform duration-300 group-hover:scale-105">
                    {service.icon}
                  </div>

                  {/* Right Side: Service Info */}
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-sm font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase">
                      {service.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed max-w-[36ch]">
                      {service.description}
                    </p>
                    <span className="text-xs font-black text-zinc-900 dark:text-amber-500 mt-1">
                      {service.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking CTA Button below Card */}
          <Link
            href="/booking"
            className="px-10 py-4 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase shadow-md shadow-zinc-950/5"
          >
            {tServices("bookBtn")}
          </Link>

        </div>
      </section>

      {/* Promo/CTA Banner Section */}
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
            {tPromo("title")}
          </h2>

          <Link
            href="/booking"
            className="px-8 py-4 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 text-center uppercase shadow-lg shadow-zinc-950/40 mt-4"
          >
            {tPromo("bookBtn")}
          </Link>
        </div>
      </section>

      {/* Why Choose Us & Reviews Section */}
      <section className="w-full bg-[#FDFBF7] dark:bg-zinc-950/40 py-20 md:py-28 px-6 md:px-8 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Title */}
          <h2 className="text-zinc-950 dark:text-white font-extrabold text-3xl md:text-4xl tracking-tight leading-tight uppercase font-sans mb-4 text-center">
            {tWhyChoose("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[60ch] text-center mb-16">
            {tWhyChoose("subtitle")}
          </p>

          {/* 3-Column Features Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-20 md:mb-28">
            {whyChooseFeats.map((feat) => (
              <div key={feat.id} className="flex flex-col items-center text-center gap-4 group">
                {/* Double-Bezel Bezel Icon Enclosure */}
                <div className="w-14 h-14 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-950 dark:text-amber-500 shadow-sm border border-zinc-200/50 dark:border-zinc-800/80 p-3 transition-transform duration-300 group-hover:scale-105">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase mt-2">
                  {tWhyChoose(`${feat.id}Title`)}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed max-w-[28ch]">
                  {tWhyChoose(`${feat.id}Desc`)}
                </p>
              </div>
            ))}
          </div>

          {/* Reviews Row (Google, Central Testimonial Card, TripAdvisor) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left: Google Rating */}
            <div className="md:col-span-3 flex flex-col items-center text-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <h4 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white mt-1">
                {tWhyChoose("googleTitle")}
              </h4>
              <span className="text-5xl font-black tracking-tight text-zinc-950 dark:text-white mt-2">
                4.9
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">
                {tWhyChoose("googleCount")}
              </span>
            </div>

            {/* Center: Main Testimonial Card */}
            <div className="md:col-span-6 relative pt-8 px-2">
              {/* Floating Avatar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full p-0.5 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/40 dark:border-zinc-700/40 shadow-sm overflow-hidden z-20">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/review-avatar.png"
                    alt="Sam Houston client review"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* White Card Enclosure */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.03)] p-8 pt-12 flex flex-col items-center text-center gap-4">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
                  {tWhyChoose("quoteTitle")}
                </h4>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-semibold leading-relaxed max-w-[42ch] italic">
                  &quot;{tWhyChoose("quoteContent")}&quot;
                </p>
                <span className="text-[10px] font-extrabold tracking-[0.18em] text-zinc-950 dark:text-white uppercase mt-2">
                  {tWhyChoose("quoteAuthor")}
                </span>
              </div>
            </div>

            {/* Right: TripAdvisor Rating */}
            <div className="md:col-span-3 flex flex-col items-center text-center gap-2">
              <svg className="w-8 h-8 text-[#00AF87]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-9.5c.83 0 1.5-.67 1.5-1.5S9.83 5.5 9 5.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm6 0c.83 0 1.5-.67 1.5-1.5S15.83 5.5 15 5.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-3 5c2.33 0 4.31-1.47 5.09-3.5H6.91c.78 2.03 2.76 3.5 5.09 3.5z" />
              </svg>
              <h4 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#00AF87] mt-1">
                {tWhyChoose("tripadvisorTitle")}
              </h4>
              <span className="text-5xl font-black tracking-tight text-zinc-950 dark:text-white mt-2">
                5.0
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">
                {tWhyChoose("tripadvisorCount")}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Appointment Contact Form Section */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-8 bg-zinc-950 overflow-visible flex flex-col items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/contact-bg.png"
            alt="Make an appointment background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950 z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Column: Contact details */}
          <div className="md:col-span-5 flex flex-col items-start gap-6 text-left">
            <h2 className="text-white font-extrabold text-3xl md:text-4xl tracking-tight leading-tight uppercase font-sans">
              {tContact("title")}
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[38ch] mb-4">
              {tContact("description")}
            </p>

            {/* Phone item */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-zinc-950 shadow-sm flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.622c0-1.272.78-2.319 1.938-2.67 1.15-.35 2.4-.1 3.248.672l1.637 1.513c.636.587.828 1.503.483 2.274l-.79 1.777c-.33.742-.15 1.62.454 2.186l3.41 3.142a2.182 2.182 0 0 0 2.122.421l1.792-.706c.76-.3 1.666-.085 2.22.524l1.652 1.815c.677.744.75 1.84.174 2.58a12.35 12.35 0 0 1-5.467 4.093c-1.127.394-2.365.19-3.21-.607l-9.03-8.312A9.09 9.09 0 0 1 2.25 6.622Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold tracking-[0.18em] text-zinc-400 uppercase">
                  {tContact("phoneLabel")}
                </span>
                <a href={`tel:${tContact("phoneVal")}`} className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5">
                  {tContact("phoneVal")}
                </a>
              </div>
            </div>

            {/* Email item */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-zinc-950 shadow-sm flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold tracking-[0.18em] text-zinc-400 uppercase">
                  {tContact("emailLabel")}
                </span>
                <a href={`mailto:${tContact("emailVal")}`} className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5">
                  {tContact("emailVal")}
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Form */}
          <div className="md:col-span-7 w-full z-30">
            <form className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.12)] p-8 md:p-10 flex flex-col gap-6 md:gap-8 text-left">
              
              {/* Name */}
              <div className="flex flex-col items-start gap-1">
                <label className="text-[10px] font-extrabold tracking-[0.15em] text-zinc-950 dark:text-white uppercase">
                  {tContact("formName")}
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:border-zinc-900 dark:focus:border-white focus:outline-none text-sm text-zinc-800 dark:text-zinc-200 font-semibold transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col items-start gap-1">
                <label className="text-[10px] font-extrabold tracking-[0.15em] text-zinc-950 dark:text-white uppercase">
                  {tContact("formSubject")}
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:border-zinc-900 dark:focus:border-white focus:outline-none text-sm text-zinc-800 dark:text-zinc-200 font-semibold transition-colors"
                />
              </div>

              {/* Phone & Email side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* Phone */}
                <div className="flex flex-col items-start gap-1">
                  <label className="text-[10px] font-extrabold tracking-[0.15em] text-zinc-950 dark:text-white uppercase">
                    {tContact("formPhone")}
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:border-zinc-900 dark:focus:border-white focus:outline-none text-sm text-zinc-800 dark:text-zinc-200 font-semibold transition-colors"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col items-start gap-1">
                  <label className="text-[10px] font-extrabold tracking-[0.15em] text-zinc-950 dark:text-white uppercase">
                    {tContact("formEmail")}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:border-zinc-900 dark:focus:border-white focus:outline-none text-sm text-zinc-800 dark:text-zinc-200 font-semibold transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col items-start gap-1">
                <label className="text-[10px] font-extrabold tracking-[0.15em] text-zinc-950 dark:text-white uppercase">
                  {tContact("formMessage")}
                </label>
                <textarea
                  required
                  className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:border-zinc-900 dark:focus:border-white focus:outline-none text-sm text-zinc-800 dark:text-zinc-200 font-semibold transition-colors resize-none h-20"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-8 py-4 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 uppercase w-fit mt-2 shadow-md"
              >
                {tContact("formBtn")}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* Interactive Google Map Section */}
      <section className="relative w-full h-[350px] md:h-[450px] z-10 -mt-20 md:-mt-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5949002175816!2d106.7288732753781!3d10.803916398771715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527d83ba221e5%3A%2Fx7348995971a3eca7!2sT99%20Barbershop!5e0!3m2!1sen!2s!4v1752576567530!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="T99 Barber Shop Location"
          className="w-full h-full grayscale dark:invert dark:opacity-80 transition-all duration-300"
        />
        {/* Soft dark/light vignette around the map corners to match design */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FDFBF7]/30 dark:from-zinc-950/20 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FDFBF7]/30 dark:from-zinc-950/20 to-transparent z-20 pointer-events-none" />
      </section>
    </>
  );
}
