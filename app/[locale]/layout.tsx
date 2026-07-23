import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "../globals.css";
import HeaderLayout from "@/components/layouts/Header";
import FooterLayout from "@/components/layouts/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { ThemeProvider } from "@wrksz/themes/next";
import QueryProvider from "@/components/providers/query-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T99 Barber Shop",
  description: "Đặt lịch cắt tóc chuyên nghiệp",
  icons: {
    icon: "/common/logo.png",
  },
  openGraph: {
    title: "T99 Barber Shop",
    description: "Đặt lịch cắt tóc chuyên nghiệp",
    images: [
      {
        url: "/common/logo.png",
        width: 250,
        height: 250,
        alt: "T99 Barber Shop Logo",
      },
    ],
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSupported = routing.locales.includes(locale as typeof routing.locales[number]);
  if (!isSupported) {
    notFound();
  }

  // Tải nội dung dịch trên Server Side
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-zinc-900 font-sans tracking-normal selection:bg-amber-500/30 selection:text-amber-900">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
            >
              <HeaderLayout />
              {children}
              <FooterLayout />
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
