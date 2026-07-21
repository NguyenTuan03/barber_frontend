import Image from "next/image";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";

interface ContactInfoItem {
  type: string;
  title: string;
}

interface Props {
  tContact: (key: string) => string;
  setting?: SiteSetting | null;
}

export default function Contact({ tContact, setting }: Props) {
  const apiContactData = safeParseJson<ContactInfoItem[]>(setting?.value);
  
  let phone = tContact("phoneVal");
  let email = tContact("emailVal");

  if (apiContactData && Array.isArray(apiContactData)) {
    const emailItem = apiContactData.find(item => item.title.includes("@"));
    const phoneItem = apiContactData.find(item => !item.title.includes("@"));
    if (emailItem) email = emailItem.title;
    if (phoneItem) phone = phoneItem.title;
  }

  return (
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
              <a href={`tel:${phone}`} className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5">
                {phone}
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
              <a href={`mailto:${email}`} className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5">
                {email}
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
  );
}