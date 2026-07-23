import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/common/ScrollReveal";

export interface IBarberMember {
    id: string;
    name: string;
    role: string;
    experience: string;
    avatar: string;
    specialties: string[];
}

export default function BarberTeamSection({
    tTeam,
}: {
    tTeam: (key: string, values?: Record<string, string | number>) => string;
}) {
    const barbers: IBarberMember[] = [
        {
            id: "barber-1",
            name: tTeam("barber1Name"),
            role: tTeam("barber1Role"),
            experience: tTeam("experience", { years: tTeam("barber1Exp") }),
            avatar: "/images/barber-1.png",
            specialties: ["Classic Cut", "Master Styling", "Beard Trim"],
        },
        {
            id: "barber-2",
            name: tTeam("barber2Name"),
            role: tTeam("barber2Role"),
            experience: tTeam("experience", { years: tTeam("barber2Exp") }),
            avatar: "/images/barber-2.png",
            specialties: ["Skin Fade", "Modern Crop", "Hair Tattoo"],
        },
        {
            id: "barber-3",
            name: tTeam("barber3Name"),
            role: tTeam("barber3Role"),
            experience: tTeam("experience", { years: tTeam("barber3Exp") }),
            avatar: "/images/barber-3.png",
            specialties: ["Hot Towel Shave", "Beard Sculpting", "Scalp Care"],
        },
    ];

    return (
        <section className="w-full bg-zinc-900 text-white dark:bg-[#121110] py-20 md:py-28 px-6 md:px-8 border-t border-amber-500/20 transition-colors duration-300 relative overflow-hidden">
            {/* Background subtle light ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                {/* Header */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="flex items-center gap-3 mb-3 justify-center">
                        <span className="h-px w-8 bg-amber-500/60" />
                        <span className="text-xs font-sans font-bold tracking-[0.22em] text-amber-400 uppercase">
                            {tTeam("tagline")}
                        </span>
                        <span className="h-px w-8 bg-amber-500/60" />
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.15}>
                    <h2 className="text-white font-serif font-black text-3xl md:text-5xl tracking-tight leading-tight uppercase mb-4 text-center">
                        {tTeam("title")}
                    </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                    <p className="text-zinc-300 dark:text-zinc-400 text-xs md:text-sm font-sans font-normal leading-relaxed max-w-[65ch] text-center mb-16">
                        {tTeam("subtitle")}
                    </p>
                </ScrollReveal>

                {/* Team Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {barbers.map((barber, index) => (
                        <ScrollReveal key={barber.id} direction="up" delay={0.1 + index * 0.1} className="h-full">
                            <div className="group h-full bg-zinc-800/60 dark:bg-zinc-900/60 border border-zinc-700/60 dark:border-zinc-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 backdrop-blur-sm">
                                {/* Image Container */}
                                <div>
                                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-zinc-950">
                                        <Image
                                            src={barber.avatar}
                                            alt={barber.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* Experience Badge */}
                                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-sans font-bold text-amber-400 tracking-wider uppercase">
                                            {barber.experience}
                                        </div>
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                    </div>

                                    {/* Info */}
                                    <div className="px-2">
                                        <span className="text-[11px] font-sans font-bold tracking-widest text-amber-400/90 uppercase mb-1 block">
                                            {barber.role}
                                        </span>
                                        <h3 className="text-xl font-sans font-extrabold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight mb-3">
                                            {barber.name}
                                        </h3>

                                        {/* Specialties Pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {barber.specialties.map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="px-2.5 py-1 rounded-md bg-zinc-700/60 dark:bg-zinc-800/80 border border-zinc-600/50 dark:border-zinc-700/50 text-[10px] font-sans font-medium text-zinc-200 dark:text-zinc-300 uppercase tracking-wider"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Action */}
                                <div className="px-2 pt-2">
                                    <Link
                                        href="/booking"
                                        className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-md shadow-amber-500/10"
                                    >
                                        <span>{tTeam("bookWithBarber", { name: barber.name.split(" ")[0] })}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
            </div>
        </section>
    );
}
