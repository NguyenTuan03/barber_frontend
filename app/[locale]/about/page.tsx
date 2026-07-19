import { getTranslations } from "next-intl/server";
import getSiteSettingApi from "@/services/siteSettings/getSiteSettingsApi";
import { SiteSettingKeyEnum } from "@/enum/AppEnum";
import PageBanner from "@/components/common/PageBanner";
import AboutService from "@/components/home/AboutService";
import ReviewsSection from "@/components/home/ReviewsSection";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHeader = await getTranslations("Header");
  const tAbout = await getTranslations("About");
  const tWhyChoose = await getTranslations("WhyChoose");

  // Fetch site settings
  const homeAboutServiceTitle = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_ABOUT_SERVICE_TITLE);
  const homeAboutServiceDescription = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_ABOUT_SERVICE_DESCRIPTION);
  const homeAboutServiceStats = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_ABOUT_SERVICE_STATS);
  const homeReviewfeats = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_REVIEW_FEATS);

  const breadcrumbs = [
    { label: tHeader("home"), path: "/" },
    { label: tHeader("about") }
  ];

  return (
    <>
      {/* Page Banner */}
      <PageBanner title={tHeader("about")} breadcrumbs={breadcrumbs} />

      {/* About Service Section */}
      <AboutService
        tAbout={tAbout}
        titleSetting={homeAboutServiceTitle}
        descriptionSetting={homeAboutServiceDescription}
        statsSetting={homeAboutServiceStats}
      />

      {/* Why Choose Us & Reviews Section */}
      <ReviewsSection tWhyChoose={tWhyChoose} featsSetting={homeReviewfeats} />
    </>
  );
}