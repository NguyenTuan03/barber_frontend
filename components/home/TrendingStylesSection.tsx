import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/common/ScrollReveal";

export interface ITrendingStyle {
    id: string;
    name: string;
    description: string;
    tag: string;
    image: string;
}

export default function TrendingStylesSection({
    tStyles,
}: {
    tStyles: (key: string) => string;
}) {
    const stylesList: ITrendingStyle[] = [
        {
            id: "style-1",
            name: tStyles("style1Name"),
            description: tStyles("style1Desc"),
            tag: tStyles("style1Tag"),
            image: "/images/style-1.png",
        },
        {
            id: "style-2",
            name: tStyles("style2Name"),
            description: tStyles("style2Desc"),
            tag: tStyles("style2Tag"),
            image: "/images/style-2.png",
        },
        {
            id: "style-3",
            name: tStyles("style3Name"),
            description: tStyles("style3Desc"),
            tag: tStyles("style3Tag"),
            image: "/images/style-3.png",
        },
        {
            id: "style-4",
            name: tStyles("style4Name"),
            description: tStyles("style4Desc"),
            tag: tStyles("style4Tag"),
            image: "/images/style-4.png",
        },
    ];

    return (
        <section className="w-full bg-[#FAF9F5] text-zinc-900 dark:bg-zinc-950 dark:text-white py-20 md:py-28 px-6 md:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-300 relative overflow-hidden">
            {/* Background subtle light ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                {/* Header */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="flex items-center gap-3 mb-3 justify-center">
                        <span className="h-px w-8 bg-amber-500/60" />
                        <span className="text-xs font-sans font-bold tracking-[0.22em] text-amber-600 dark:text-amber-400 uppercase">
                            {tStyles("tagline")}
                        </span>
                        <span className="h-px w-8 bg-amber-500/60" />
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.15}>
                    <h2 className="text-zinc-950 dark:text-white font-serif font-black text-3xl md:text-5xl tracking-tight leading-tight uppercase mb-4 text-center">
                        {tStyles("title")}
                    </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm font-sans font-normal leading-relaxed max-w-[65ch] text-center mb-16">
                        {tStyles("subtitle")}
                    </p>
                </ScrollReveal>

                {/* Hairstyles Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
                    {stylesList.map((style, index) => (
                        <ScrollReveal key={style.id} direction="up" delay={0.1 + index * 0.08} className="h-full">
                            <div className="group h-full bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500">
                                {/* Image Box */}
                                <div>
                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-900">
                                        <Image
                                            src={style.image}
                                            alt={style.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* Tag Badge */}
                                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-sans font-black tracking-widest uppercase shadow-md">
                                            {style.tag}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                                    </div>

                                    {/* Text Info */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-sans font-extrabold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors uppercase tracking-tight mb-2">
                                            {style.name}
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-xs font-sans leading-relaxed line-clamp-3">
                                            {style.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Booking link */}
                                <div className="p-5 pt-0">
                                    <Link
                                        href="/booking"
                                        className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-amber-500 dark:hover:bg-amber-500 text-zinc-900 dark:text-amber-400 hover:text-zinc-950 dark:hover:text-zinc-950 font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 border border-zinc-200 dark:border-amber-500/30 hover:border-amber-500"
                                    >
                                        <span>Đặt lịch kiểu này</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom CTA */}
                <ScrollReveal direction="up" delay={0.3}>
                    <Link
                        href="/booking"
                        className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 inline-flex items-center gap-2"
                    >
                        <span>TƯ VẤN & ĐẶT LỊCH NGAY</span>
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
}
