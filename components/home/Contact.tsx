import Image from "next/image";
import { Link } from "@/i18n/routing";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";
import ScrollReveal from "@/components/common/ScrollReveal";

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
    <section className="relative w-full py-24 md:py-32 px-6 md:px-8 bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center border-t border-zinc-900">
      
      {/* Background Image with Dark Tint Overlay (Tim Barber Shop Style) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/contact-bg.png"
          alt="Make an appointment background"
          fill
          className="object-cover opacity-25 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950 z-10" />
      </div>

      {/* Book Callout Block (BOOK LỊCH HẸN!) */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 mb-16">
        <ScrollReveal direction="up" delay={0.1}>
          <span className="text-xs font-serif font-bold tracking-[0.2em] text-amber-400 uppercase">
            T99 BARBER SHOP - FROM HEART TO HAIR!
          </span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <h2 className="text-white font-serif font-black text-4xl md:text-6xl tracking-tight leading-tight uppercase">
            {tContact("appointmentTitle")}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-zinc-300 text-sm md:text-base max-w-[50ch] font-normal leading-relaxed">
            {tContact("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25}>
          <Link
            href="/booking"
            className="px-10 py-4 bg-white hover:bg-zinc-100 text-zinc-950 font-serif font-bold text-xs tracking-wider rounded-full transition-all duration-300 uppercase shadow-lg inline-block"
          >
            {tContact("formBtn")}
          </Link>
        </ScrollReveal>
      </div>

      {/* Contact Form Container (#F4F4F0 Light Card) */}
      <ScrollReveal direction="up" delay={0.2} className="relative z-20 w-full max-w-4xl mx-auto">
        <div className="w-full bg-[#F4F4F0] text-zinc-950 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h3 className="font-serif font-black text-xl md:text-2xl uppercase tracking-wider text-center mb-8">
            {tContact("formSectionTitle")}
          </h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-zinc-700">
                {tContact("formName")}
              </label>
              <input
                type="text"
                required
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-zinc-700">
                {tContact("formSubject")}
              </label>
              <input
                type="text"
                required
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-zinc-700">
                {tContact("formPhone")}
              </label>
              <input
                type="tel"
                required
                defaultValue={phone}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-zinc-700">
                {tContact("formEmail")}
              </label>
              <input
                type="email"
                required
                defaultValue={email}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-zinc-700">
                {tContact("formMessage")}
              </label>
              <textarea
                required
                rows={3}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                className="px-10 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-serif font-bold text-xs tracking-wider rounded-full transition-all duration-300 uppercase shadow-md"
              >
                {tContact("formBtn")}
              </button>
            </div>
          </form>
        </div>
      </ScrollReveal>

    </section>
  );
}