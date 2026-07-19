import Image from "next/image";
import { Link } from "@/i18n/routing";

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface PageBannerProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
    return (
        <section className="relative w-full py-20 md:py-24 px-6 md:px-8 bg-zinc-950 overflow-hidden flex flex-col items-center justify-center border-b border-zinc-900">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt={`${title} banner background`}
                    fill
                    priority
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-zinc-950 z-10" />
            </div>

            {/* Banner Content */}
            <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center gap-4 text-center mt-12 md:mt-16">
                {/* Title */}
                <h1 className="text-white font-extrabold text-3xl md:text-5xl tracking-tight uppercase font-sans">
                    {title}
                </h1>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-zinc-400">
                    {breadcrumbs.map((crumb, idx) => {
                        const isLast = idx === breadcrumbs.length - 1;
                        if (isLast || !crumb.path) {
                            return (
                                <span key={idx} className="text-amber-500 font-extrabold uppercase">
                                    {crumb.label}
                                </span>
                            );
                        }
                        return (
                            <div key={idx} className="flex items-center gap-2">
                                <Link
                                    href={crumb.path}
                                    className="hover:text-white transition-colors uppercase"
                                >
                                    {crumb.label}
                                </Link>
                                <span className="text-zinc-600 font-normal">/</span>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </section>
    );
}
