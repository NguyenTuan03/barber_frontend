import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/common/PageBanner";
import Contact from "@/components/home/Contact";
import GoogleMap from "@/components/home/GoogleMap";
import getSiteSettingApi from "@/services/siteSettings/getSiteSettingsApi";
import { SiteSettingKeyEnum } from "@/enum/AppEnum";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHeader = await getTranslations("Header");
  const tContact = await getTranslations("Contact");

  // Fetch site setting for contact info
  const homeContactInfo = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_APPOINTMENT_INFO);
  const homeGoogleMap = await getSiteSettingApi(locale, SiteSettingKeyEnum.HOME_GOOGLE_MAP);

  const breadcrumbs = [
    { label: tHeader("home"), path: "/" },
    { label: tHeader("contact") }
  ];

  return (
    <>
      {/* Page Banner */}
      <PageBanner title={tHeader("contact")} breadcrumbs={breadcrumbs} />

      {/* Appointment Contact Form Section */}
      <Contact tContact={tContact} setting={homeContactInfo} />

      {/* Interactive Google Map Section */}
      <GoogleMap setting={homeGoogleMap} />
    </>
  );
}
