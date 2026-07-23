import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/common/PageBanner";
import ProductsSection from "@/components/home/ProductsSection";
import PromotionBanner from "@/components/home/PromoBanner";
import getSiteSettingApi from "@/services/siteSettings/getSiteSettingsApi";
import { SiteSettingKeyEnum } from "@/enum/AppEnum";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [tHeader, tProducts, tPromo, homePromoTitle] = await Promise.all([
    getTranslations("Header"),
    getTranslations("Products"),
    getTranslations("HomePromo"),
    getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_PROMO_TITLE),
  ]);

  const breadcrumbs = [
    { label: tHeader("home"), path: "/" },
    { label: tHeader("products") },
  ];

  return (
    <>
      {/* Page Hero Banner */}
      <PageBanner title={tHeader("products")} breadcrumbs={breadcrumbs} />

      {/* Main Products Grid Showcase Section */}
      <ProductsSection tProducts={tProducts} />

      {/* Promotion CTA Banner */}
      <PromotionBanner
        tPromo={tPromo}
        title={typeof homePromoTitle?.value === "string" ? homePromoTitle.value : tPromo("title")}
      />
    </>
  );
}
