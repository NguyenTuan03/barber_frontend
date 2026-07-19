import * as React from "react";
import Link from "next/link";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";

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

    return (
        <section className="w-full bg-[#FDFBF7] dark:bg-zinc-950/40 py-20 md:py-28 px-6 md:px-8 border-t border-zinc-100 dark:border-zinc-900">
            <div className="max-w-5xl mx-auto flex flex-col items-center">

                {/* Centered Heading */}
                <h2 className="text-zinc-950 dark:text-white font-extrabold text-3xl md:text-4xl tracking-tight leading-tight uppercase font-sans mb-4 text-center">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[60ch] text-center mb-16">
                    {description}
                </p>

                {/* Large Floating Services Card */}
                <div className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.04)] p-8 md:p-12 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12">
                        {finalServicesList.map((service) => (
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
    );
}