import Image from "next/image";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/common/ScrollReveal";

export interface IProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  tag: string;
  rating: number;
}

type ProductsSectionProps = {
  tProducts: (key: string) => string;
};

export default function ProductsSection({ tProducts }: ProductsSectionProps) {
  const products: IProductItem[] = [
    {
      id: "prod-1",
      name: tProducts("item1Title"),
      description: tProducts("item1Desc"),
      price: tProducts("item1Price"),
      image: "/images/product-pomade.png",
      category: "Styling Pomade",
      tag: "Best Seller",
      rating: 5.0,
    },
    {
      id: "prod-2",
      name: tProducts("item2Title"),
      description: tProducts("item2Desc"),
      price: tProducts("item2Price"),
      image: "/images/product-spray.png",
      category: "Grooming Spray",
      tag: "Pre-Styling",
      rating: 4.9,
    },
    {
      id: "prod-3",
      name: tProducts("item3Title"),
      description: tProducts("item3Desc"),
      price: tProducts("item3Price"),
      image: "/images/product-oil.png",
      category: "Nourishing Oil",
      tag: "Premium Care",
      rating: 4.9,
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F5] text-zinc-900 dark:bg-zinc-950 dark:text-white py-20 md:py-28 px-6 md:px-8 border-t border-zinc-200/80 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient gold radial blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        {/* Eyebrow Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex items-center gap-3 mb-3 justify-center">
            <span className="h-px w-8 bg-amber-500/60" />
            <span className="text-xs font-sans font-bold tracking-[0.22em] text-amber-600 dark:text-amber-400 uppercase">
              {tProducts("tagline")}
            </span>
            <span className="h-px w-8 bg-amber-500/60" />
          </div>
        </ScrollReveal>

        {/* Section Title */}
        <ScrollReveal direction="up" delay={0.15}>
          <h2 className="text-zinc-950 dark:text-white font-serif font-black text-3xl md:text-5xl tracking-tight leading-tight uppercase mb-4 text-center">
            {tProducts("title")}
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm font-sans font-normal leading-relaxed max-w-[65ch] text-center mb-16">
            {tProducts("subtitle")}
          </p>
        </ScrollReveal>

        {/* Product Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} direction="up" delay={0.1 + index * 0.1} className="h-full">
              <div className="group h-full bg-white dark:bg-zinc-900/70 border border-zinc-200/90 dark:border-zinc-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-amber-500/10">
                
                <div>
                  {/* Image Container with Double Bezel frame */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-zinc-100 dark:bg-zinc-950 p-2 border border-zinc-200/50 dark:border-zinc-800/80">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    {/* Badge Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 text-[10px] font-sans font-bold text-amber-400 tracking-wider uppercase">
                      {product.tag}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="px-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-sans font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span>★</span>
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-sans font-extrabold text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors uppercase tracking-tight mb-2">
                      {product.name}
                    </h3>

                    <p className="text-zinc-600 dark:text-zinc-400 text-xs font-sans font-normal leading-relaxed line-clamp-3 mb-4">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="px-1 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-lg font-serif font-black text-zinc-950 dark:text-white">
                    {product.price}
                  </span>

                  <Link
                    href="/products"
                    className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-amber-500/10 inline-flex items-center gap-1.5"
                  >
                    <span>{tProducts("buyBtn")}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Products Link Button */}
        <ScrollReveal direction="up" delay={0.25}>
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-amber-500 dark:hover:border-amber-400 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm inline-block"
          >
            {tProducts("viewAll")}
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
