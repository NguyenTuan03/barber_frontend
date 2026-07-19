import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/common/PageBanner";
import Contact from "@/components/home/Contact";
import GoogleMap from "@/components/home/GoogleMap";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const tHeader = await getTranslations("Header");
  const tContact = await getTranslations("Contact");

  const breadcrumbs = [
    { label: tHeader("home"), path: "/" },
    { label: tHeader("contact") }
  ];

  return (
    <>
      {/* Page Banner */}
      <PageBanner title={tHeader("contact")} breadcrumbs={breadcrumbs} />

      {/* Appointment Contact Form Section */}
      <Contact tContact={tContact} />

      {/* Interactive Google Map Section */}
      <GoogleMap />
    </>
  );
}
