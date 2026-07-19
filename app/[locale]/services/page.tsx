import { getTranslations } from "next-intl/server";
import getServiceApi from "@/services/service/getServiceApi";
import getSiteSettingApi from "@/services/siteSettings/getSiteSettingsApi";
import { SiteSettingKeyEnum } from "@/enum/AppEnum";
import PageBanner from "@/components/common/PageBanner";
import BrowserService from "@/components/home/BrowseService";
import PromotionBanner from "@/components/home/PromoBanner";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHeader = await getTranslations("Header");
  const tServices = await getTranslations("Services");
  const tPromo = await getTranslations("Promo");

  const defaultServicesList = [
    {
      id: "adultHaircut",
      price: "$39 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          <circle cx="6" cy="16" r="2.5" />
          <circle cx="14" cy="16" r="2.5" />
          <path d="M8 14.5L16.5 6M12 14.5L7.5 6" />
          <path d="M19 4v10M16 4v3M13 4v3M10 4v3M7 4v3" />
        </svg>
      ),
    },
    {
      id: "kidsHaircut",
      price: "$19 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          <path d="M4 6h16v4H4z" />
          <path d="M6 10v4M9 10v4M12 10v4M15 10v4M18 10v4" />
        </svg>
      ),
    },
    {
      id: "beardTrim",
      price: "$29 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          <path d="M9 4h6l-1 4H10zM10 8v10a2 2 0 002 2h0a2 2 0 002-2V8" />
          <path d="M9.5 4v-2M11 4v-2M12.5 4v-2M14 4v-2" />
        </svg>
      ),
    },
    {
      id: "neckShave",
      price: "$39 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          <path d="M6 18c0-3.3 2.7-6 6-6h8" />
          <path d="M12 12L7 4h10l3 8" />
        </svg>
      ),
    },
    {
      id: "scalpMoisturizing",
      price: "$10 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          <path d="M8 8h8v11a2 2 0 01-2 2H10a2 2 0 01-2-2V8zM10 8V5a1 1 0 011-1h2a1 1 0 011 1v3" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      ),
    },
    {
      id: "beardGrooming",
      price: "$49 USD",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-zinc-900 dark:text-amber-500"
        >
          <path d="M5 8c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2-1-4-3-4-2 0-3 2-5 2s-3-2-5-2c-2 0-3 2-3 4z" />
          <path d="M8 9c2-1 3 1 4 1s2-2 4-1c0 0-1 2-2 2s-2-2-4-1z" />
        </svg>
      ),
    },
  ];

  const servicesList = await getServiceApi(locale, defaultServicesList, tServices);

  // Fetch site settings
  const homeServiceTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_SERVICE_TITLE);
  const homeServiceDescription = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_SERVICE_DESCRIPTION);
  const homeServiceList = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_SERVICE_LIST);
  const homePromoTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_PROMO_TITLE);

  const breadcrumbs = [
    { label: tHeader("home"), path: "/" },
    { label: tHeader("services") }
  ];

  return (
    <>
      {/* Page Banner */}
      <PageBanner title={tHeader("services")} breadcrumbs={breadcrumbs} />

      {/* Services Grid Section */}
      <BrowserService
        tServices={tServices}
        servicesList={servicesList}
        titleSetting={homeServiceTitle}
        descriptionSetting={homeServiceDescription}
        listSetting={homeServiceList}
      />

      {/* Promotion CTA Banner */}
      <PromotionBanner
        tPromo={tPromo}
        title={typeof homePromoTitle?.value === "string" ? homePromoTitle.value : tPromo("title")}
      />
    </>
  );
}
