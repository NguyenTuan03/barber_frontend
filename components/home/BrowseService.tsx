import * as React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";
import ScrollReveal from "@/components/common/ScrollReveal";

export interface IServiceList {
    id: string;
    name: string;
    description: string;
    price: string;
    icon: React.ReactNode;
}

export interface APIServiceItem {
    type: string;
    title: string;
    description: string;
    price: string;
}

export default function BrowserService({
    tServices,
    servicesList,
    titleSetting,
    descriptionSetting,
    listSetting,
}: {
    tServices: (key: string) => string;
    servicesList: IServiceList[];
    titleSetting: SiteSetting | null;
    descriptionSetting: SiteSetting | null;
    listSetting: SiteSetting | null;
}) {
    const title = typeof titleSetting?.value === "string" ? titleSetting.value : tServices("title");
    const description = typeof descriptionSetting?.value === "string" ? descriptionSetting.value : tServices("subtitle");

    const apiServicesData = safeParseJson<APIServiceItem[]>(listSetting?.value);

    const mappedServicesList: IServiceList[] = (apiServicesData || []).map((service, idx) => {
        const fallbackIcon = servicesList[idx % servicesList.length]?.icon || servicesList[0]?.icon;
        return {
            id: `service-${idx}`,
            name: service.title,
            description: service.description,
            price: service.price,
            icon: fallbackIcon,
        };
    });

    const finalServicesList = mappedServicesList.length > 0 ? mappedServicesList : servicesList;

    // Multi-language Feature Cards
    const featureCards = [
        {
            title: tServices("card1Title"),
            desc: tServices("card1Desc"),
            img: "/images/hero-bg.png"
        },
        {
            title: tServices("card2Title"),
            desc: tServices("card2Desc"),
            img: "/images/about-img.png"
        },
        {
            title: tServices("card3Title"),
            desc: tServices("card3Desc"),
            img: "/images/contact-bg.png"
        }
    ];

    return (
        <section className="w-full bg-[#141312] text-white py-20 md:py-28 px-6 md:px-8 border-t border-amber-500/20">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                {/* Subtitle Eyebrow Banner */}
                <ScrollReveal direction="up" delay={0.1}>
                    <span className="text-xs font-sans font-bold tracking-[0.2em] text-amber-400 uppercase mb-2">
                        {tServices("tagline")}
                    </span>
                </ScrollReveal>

                {/* Centered Editorial Serif Title */}
                <ScrollReveal direction="up" delay={0.15}>
                    <h2 className="text-white font-serif font-black text-3xl md:text-5xl tracking-tight leading-tight uppercase mb-4 text-center">
                        {title}
                    </h2>
                </ScrollReveal>

                {/* Subtitle */}
                <ScrollReveal direction="up" delay={0.2}>
                    <p className="text-zinc-300 text-xs md:text-sm font-sans font-normal leading-relaxed max-w-[62ch] text-center mb-16">
                        {description}
                    </p>
                </ScrollReveal>

                {/* 3 Column Card Grid with Staggered ScrollReveal */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
                    {featureCards.map((card, idx) => (
                        <ScrollReveal key={idx} direction="up" delay={0.15 + idx * 0.1} className="h-full">
                            <div className="flex flex-col h-full bg-[#FDFBF7] text-zinc-950 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-amber-500/20">
                                {/* Card Image */}
                                <div className="w-full h-48 relative overflow-hidden shrink-0">
                                    <Image
                                        src={card.img}
                                        alt={card.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Card Content - Easy to Read Sans-Serif Font */}
                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <h3 className="font-sans font-extrabold text-base md:text-lg tracking-wide uppercase text-zinc-950">
                                        {card.title}
                                    </h3>
                                    <p className="font-sans text-xs md:text-sm text-zinc-600 font-normal leading-relaxed">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Service Menu Details List */}
                <ScrollReveal direction="up" delay={0.2} className="w-full">
                    <div className="w-full bg-[#0C0C0B] border border-amber-500/20 rounded-2xl p-6 md:p-10 mb-12">
                        <h3 className="font-sans font-black text-lg md:text-xl text-amber-400 tracking-widest uppercase mb-8 text-center">
                            {tServices("detailPriceTitle")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {finalServicesList.map((service) => (
                                <div key={service.id} className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-sans font-bold text-sm text-white uppercase tracking-wide">
                                            {service.name}
                                        </span>
                                        <span className="font-sans text-xs text-zinc-400 font-normal leading-normal">
                                            {service.description}
                                        </span>
                                    </div>
                                    <span className="font-sans font-bold text-sm text-amber-400 ml-4 shrink-0">
                                        {service.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Booking Button */}
                <ScrollReveal direction="up" delay={0.25}>
                    <Link
                        href="/booking"
                        className="px-10 py-3.5 bg-gradient-to-r from-[#d4c3a3] via-amber-500 to-[#c5a059] hover:opacity-95 text-zinc-950 font-sans font-bold text-xs tracking-wider rounded-full transition-all duration-300 text-center uppercase shadow-md shadow-amber-500/10 inline-block"
                    >
                        {tServices("bookBtn")}
                    </Link>
                </ScrollReveal>

            </div>
        </section>
    );
}