import { getTranslations } from "next-intl/server";
import getServiceApi from "@/services/service/getServiceApi";
import getSiteSettingApi from "@/services/siteSettings/getSiteSettingsApi";
import { SiteSettingKeyEnum } from "@/enum/AppEnum";
import HeroBanner from "@/components/home/HeroBanner";
import FloatingInfoBlock from "@/components/home/FloatingInfoBlock";
import AboutService from "@/components/home/AboutService";
import BrowserService from "@/components/home/BrowseService";
import PromotionBanner from "@/components/home/PromoBanner";
import ReviewsSection from "@/components/home/ReviewsSection";
import Contact from "@/components/home/Contact";
import GoogleMap from "@/components/home/GoogleMap";
import ScrollReveal from "@/components/common/ScrollReveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Tải bản dịch ở Server Side
  const tBanner = await getTranslations("Banner");

  // Site Settings for Hero
  const siteSettingTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HERO_TITLE);
  const siteSettingSubTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HERO_SUBTITLE);
  const siteSettingFloatingInfoBlock = await getSiteSettingApi(locale, SiteSettingKeyEnum.FLOATING_INFO_BLOCK);

  // About Service
  const tAbout = await getTranslations("HomeAboutService");
  const homeAboutServiceTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_ABOUT_SERVICE_TITLE);
  const homeAboutServiceDescription = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_ABOUT_SERVICE_DESCRIPTION);
  const homeAboutServiceStats = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_ABOUT_SERVICE_STATS);

  // Services List Setup
  const icons = [
    <svg key="1" className="w-6 h-6 text-zinc-950 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>,
    <svg key="2" className="w-6 h-6 text-zinc-950 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 001.17 4.02m1.637 2.973A17.935 17.935 0 0112 19.5c1.458 0 2.873-.173 4.234-.502m0 0l-3.3-3.3m3.3 3.3l-3.3 3.3" />
    </svg>,
    <svg key="3" className="w-6 h-6 text-zinc-950 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>,
    <svg key="4" className="w-6 h-6 text-zinc-950 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    </svg>
  ];

  const defaultServicesList = [
    { id: "haircut", price: "100.000đ", icon: icons[0] },
    { id: "shave", price: "50.000đ", icon: icons[1] },
    { id: "combo", price: "140.000đ", icon: icons[2] },
    { id: "kid", price: "80.000đ", icon: icons[3] },
  ];

  const tServices = await getTranslations("HomeServices");
  const servicesList = await getServiceApi(locale, defaultServicesList, tServices);

  const homeServiceTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_SERVICE_TITLE);
  const homeServiceDescription = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_SERVICE_DESCRIPTION);
  const homeServiceList = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_SERVICE_LIST);

  // Promo Banner
  const tPromo = await getTranslations("HomePromo");
  const homePromoTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_PROMO_TITLE);

  // Why Choose Us
  const tWhyChoose = await getTranslations("WhyChoose");

  // Reviews
  const homeReviewfeats = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_REVIEW_FEATS);

  // Appointment Info
  const tContact = await getTranslations("HomeContactInfo");
  const homeContactInfo = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_APPOINTMENT_INFO);

  // Google map
  const homeGoogleMap = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_GOOGLE_MAP);

  return (
    <>
      {/* Hero Banner Section */}
      <HeroBanner
        title={typeof siteSettingTitle?.value === "string" ? siteSettingTitle.value : tBanner("title")}
        subtitle={typeof siteSettingSubTitle?.value === "string" ? siteSettingSubTitle.value : tBanner("subtitle")}
        tBanner={tBanner}
      />

      {/* Floating Shop Info Block */}
      <ScrollReveal direction="up" delay={0.1}>
        <FloatingInfoBlock tBanner={tBanner} setting={siteSettingFloatingInfoBlock} />
      </ScrollReveal>

      {/* About Service Section */}
      <AboutService
        tAbout={tAbout}
        titleSetting={homeAboutServiceTitle}
        descriptionSetting={homeAboutServiceDescription}
        statsSetting={homeAboutServiceStats}
      />

      {/* Browse Services Section */}
      <BrowserService
        tServices={tServices}
        servicesList={servicesList}
        titleSetting={homeServiceTitle}
        descriptionSetting={homeServiceDescription}
        listSetting={homeServiceList}
      />

      {/* Promo/CTA Banner Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <PromotionBanner tPromo={tPromo} title={typeof homePromoTitle?.value === "string" ? homePromoTitle.value : tPromo("title")} />
      </ScrollReveal>

      {/* Why Choose Us & Reviews Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <ReviewsSection tWhyChoose={tWhyChoose} featsSetting={homeReviewfeats} />
      </ScrollReveal>

      {/* Appointment Contact Form Section */}
      <Contact tContact={tContact} setting={homeContactInfo} />

      {/* Interactive Google Map Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <GoogleMap setting={homeGoogleMap} />
      </ScrollReveal>
    </>
  );
}
