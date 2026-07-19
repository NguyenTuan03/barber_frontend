import Image from "next/image";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";

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
    const homeAboutServiceTitle = typeof titleSetting?.value === "string" ? titleSetting.value : tAbout("title");
    const homeAboutServiceDescription = typeof descriptionSetting?.value === "string" ? descriptionSetting.value : tAbout("description");
    const homeAboutServiceStats = safeParseJson<AboutServiceStatItem[]>(statsSetting?.value);
    return (
        <section className="w-full bg-[#FDFBF7] dark:bg-zinc-950/40 py-20 md:py-28 px-6 md:px-8 border-t border-zinc-100 dark:border-zinc-900">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

                {/* Left Column: Text & Stats */}
                <div className="md:col-span-7 flex flex-col items-start gap-5">
                    <h2 className="text-zinc-950 dark:text-white font-extrabold text-3xl md:text-4xl tracking-tight leading-tight uppercase font-sans max-w-[16ch]">
                        {homeAboutServiceTitle}
                    </h2>

                    <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[50ch] mb-4">
                        {homeAboutServiceDescription}
                    </p>

                    {/* Statistics Row */}
                    <div className="w-full grid grid-cols-2 gap-8 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-8 mt-2">
                        {homeAboutServiceStats && homeAboutServiceStats.length > 0 ? (
                            homeAboutServiceStats.map((stat, idx) => {
                                const numMatch = stat.title.match(/^(\d+)(.*)$/);
                                const num = numMatch ? numMatch[1] : stat.title;
                                const suffix = numMatch ? numMatch[2] : "";

                                return (
                                    <div key={idx} className="flex flex-col items-start">
                                        <div className="text-zinc-950 dark:text-white text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                                            <span>{num}</span>
                                            {suffix && (
                                                <span className="text-amber-500 font-extrabold text-2xl md:text-3xl ml-0.5">
                                                    {suffix}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-[10px] md:text-xs font-extrabold tracking-[0.18em] text-zinc-400 dark:text-zinc-500 mt-2 leading-snug max-w-[15ch] uppercase">
                                            {stat.content}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <>
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
                            </>
                        )}
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
    );
}