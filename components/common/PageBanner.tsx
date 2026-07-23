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
        <section className="relative w-full py-20 md:py-24 px-6 md:px-8 bg-[#FAFAFA] dark:bg-zinc-950 overflow-hidden flex flex-col items-center justify-center border-b border-zinc-200/80 dark:border-zinc-800">
            {/* Banner Content */}
            <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
                {/* Title with Serif Editorial Font */}
                <h1 className="text-zinc-950 dark:text-white font-serif font-black text-3xl md:text-5xl tracking-tight uppercase">
                    {title}
                </h1>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-serif font-bold tracking-wider text-zinc-500 uppercase">
                    {breadcrumbs.map((crumb, idx) => {
                        const isLast = idx === breadcrumbs.length - 1;
                        if (isLast || !crumb.path) {
                            return (
                                <span key={idx} className="text-zinc-950 dark:text-white">
                                    {crumb.label}
                                </span>
                            );
                        }
                        return (
                            <div key={idx} className="flex items-center gap-2">
                                <Link
                                    href={crumb.path}
                                    className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                                <span className="text-zinc-400 font-normal">/</span>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </section>
    );
}
