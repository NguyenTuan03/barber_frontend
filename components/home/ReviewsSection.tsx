import Image from "next/image";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";

export interface ReviewFeatItem {
  type: string;
  title: string;
  description: string;
}

export default function ReviewsSection({
  tWhyChoose,
  featsSetting,
}: {
  tWhyChoose: (key: string) => string;
  featsSetting: SiteSetting | null;
}) {
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

  const apiFeatsData = safeParseJson<ReviewFeatItem[]>(featsSetting?.value);

  const mappedFeats = (apiFeatsData || []).map((feat, idx) => {
    const defaultFeat = whyChooseFeats[idx % whyChooseFeats.length];
    return {
      id: `feat-${idx}`,
      title: feat.title,
      description: feat.description,
      icon: defaultFeat.icon,
    };
  });

  const finalFeats = mappedFeats.length > 0 ? mappedFeats : whyChooseFeats.map((feat) => ({
    id: feat.id,
    title: tWhyChoose(`${feat.id}Title`),
    description: tWhyChoose(`${feat.id}Desc`),
    icon: feat.icon,
  }));

  return (
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
          {finalFeats.map((feat) => (
            <div key={feat.id} className="flex flex-col items-center text-center gap-4 group">
              {/* Double-Bezel Bezel Icon Enclosure */}
              <div className="w-14 h-14 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-950 dark:text-amber-500 shadow-sm border border-zinc-200/50 dark:border-zinc-800/80 p-3 transition-transform duration-300 group-hover:scale-105">
                {feat.icon}
              </div>
              <h3 className="text-sm font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase mt-2">
                {feat.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed max-w-[28ch]">
                {feat.description}
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
  );
}