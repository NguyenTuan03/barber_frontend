import Image from "next/image";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";
import ScrollReveal from "@/components/common/ScrollReveal";

export interface AboutServiceStatItem {
    type: string;
    title: string;
    content: string;
}

type AboutServiceProps = {
    tAbout: (key: string) => string;
    titleSetting: SiteSetting | null;
    descriptionSetting: SiteSetting | null;
    statsSetting: SiteSetting | null;
}

export default function AboutService({ tAbout, titleSetting, descriptionSetting, statsSetting }: AboutServiceProps) {
    const homeAboutServiceTitle = typeof titleSetting?.value === "string" ? titleSetting.value : "BARBERSHOP CHUYÊN NGHIỆP";
    const homeAboutServiceDescription = typeof descriptionSetting?.value === "string" ? descriptionSetting.value : tAbout("description");
    const homeAboutServiceStats = safeParseJson<AboutServiceStatItem[]>(statsSetting?.value);

    return (
        <section className="w-full bg-[#FAFAFA] dark:bg-zinc-950 py-20 md:py-28 px-6 md:px-8 border-t border-zinc-200/60 dark:border-zinc-900">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

                {/* Left Column: Text & Stats */}
                <div className="md:col-span-7 flex flex-col items-start gap-6">
                    
                    {/* Heading */}
                    <ScrollReveal direction="up" delay={0.1}>
                        <h2 className="text-zinc-950 dark:text-white font-serif font-black text-3xl md:text-5xl tracking-tight leading-tight uppercase max-w-[16ch]">
                            {homeAboutServiceTitle}
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.2}>
                        <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm md:text-base font-normal leading-relaxed max-w-[52ch]">
                            {homeAboutServiceDescription}
                        </p>
                    </ScrollReveal>

                    {/* Big Statistics Row */}
                    <div className="w-full grid grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-2">
                        {homeAboutServiceStats && homeAboutServiceStats.length > 0 ? (
                            homeAboutServiceStats.map((stat, idx) => {
                                const numMatch = stat.title.match(/^(\d+)(.*)$/);
                                const num = numMatch ? numMatch[1] : stat.title;
                                const suffix = numMatch ? numMatch[2] : "";

                                return (
                                    <ScrollReveal key={idx} direction="up" delay={0.3 + idx * 0.1}>
                                        <div className="flex flex-col items-start">
                                            <div className="text-amber-500 dark:text-amber-400 font-sans text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                                                <span>{num}</span>
                                                {suffix && (
                                                    <span className="font-sans font-bold text-2xl md:text-3xl ml-0.5">
                                                        {suffix}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs font-sans font-bold tracking-wider text-zinc-600 dark:text-zinc-400 mt-2 leading-snug max-w-[18ch] uppercase">
                                                {stat.content}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })
                        ) : (
                            <>
                                {/* Stat 1 */}
                                <ScrollReveal direction="up" delay={0.3}>
                                    <div className="flex flex-col items-start">
                                        <div className="text-amber-500 dark:text-amber-400 font-sans text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                                            <span>300.000</span>
                                            <span className="font-sans font-bold text-2xl md:text-3xl ml-0.5">+</span>
                                        </div>
                                        <div className="text-xs font-sans font-bold tracking-wider text-zinc-600 dark:text-zinc-400 mt-2 leading-snug uppercase">
                                            {tAbout("stat1Label")}
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Stat 2 */}
                                <ScrollReveal direction="up" delay={0.4}>
                                    <div className="flex flex-col items-start">
                                        <div className="text-amber-500 dark:text-amber-400 font-sans text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                                            <span>15.000</span>
                                            <span className="font-sans font-bold text-2xl md:text-3xl ml-0.5">+</span>
                                        </div>
                                        <div className="text-xs font-sans font-bold tracking-wider text-zinc-600 dark:text-zinc-400 mt-2 leading-snug uppercase">
                                            {tAbout("stat2Label")}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Column: Clean Rounded Salon Image */}
                <div className="md:col-span-5 w-full flex justify-center">
                    <ScrollReveal direction="left" delay={0.2} className="w-full max-w-[450px]">
                        <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 relative">
                            <Image
                                src="/images/about-img.png"
                                alt="Professional barber styling hair"
                                fill
                                sizes="(max-width: 768px) 100vw, 450px"
                                className="object-cover"
                            />
                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </section>
    );
}