import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import HeaderLayout from "@/components/layouts/Header";
import FooterLayout from "@/components/layouts/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <HeaderLayout />
            {children}
            <FooterLayout />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
