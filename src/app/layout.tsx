import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./my_style.css";
import MainLogo from "@/components/UI/Logo/MainLogo";
import KofiLogo from "@/components/UI/Logo/KofiLogo";
import { GoogleAnalytics } from '@next/third-parties/google'
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meowu Gacha",
  description: "Try your luck in cute animal gacha simulators inspired by Honkai: Star Rail, Wuthering Waves, and more!",
  icons: {
    icon: '/meowu_gacha_logo.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:site_name" content="Meowu Gacha" />
        <meta property="og:image" content="https://meowu-gacha-web.vercel.app/meowu_gacha_logo.png" />
        <meta name="google-site-verification" content="_1miGTBEO-vjbgiRcTF3dDSGbCbau7joIM-e337DL_c" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen flex flex-col gap-4`}>
        <div className='w-full bg-[#2C3E50] flex justify-center sticky top-0 p-2 z-50'>
          <div className='w-[95%] flex flex-row'>
            <span className=""><MainLogo/></span>
            <span className="ml-auto"><KofiLogo/></span>
          </div>
        </div>
        <div className='flex-1 min-h-0 w-full'>
          {children}
        </div>
        <GoogleAnalytics gaId="G-0F8JZB175Q" />
      </body>
    </html>
  );
}
