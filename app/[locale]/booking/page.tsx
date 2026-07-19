import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/common/PageBanner";
import BookingForm from "@/components/booking/BookingForm";

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHeader = await getTranslations("Header");
  const tBooking = await getTranslations("Booking");

  const breadcrumbs = [
    { label: tHeader("home"), path: "/" },
    { label: tBooking("title") }
  ];

  return (
    <div className="bg-[#FAF8F5] dark:bg-zinc-950 min-h-screen pb-16">
      {/* Page Banner */}
      <PageBanner title={tBooking("title")} breadcrumbs={breadcrumbs} />

      {/* Booking Form Component */}
      <BookingForm locale={locale} />
    </div>
  );
}
