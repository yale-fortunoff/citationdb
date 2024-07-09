import { GeistSans } from "geist/font/sans";

import SiteBanner from "~/components/SiteBanner";
import Data from "~/components/Data";

import "~/styles/globals.scss";

export const metadata = {
  title: "Metadash - Fortunoff Video Archive for Holocaust Testimonies",
  description: "Metadash - Fortunoff Video Archive for Holocaust Testimonies",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#f5f5f5]">
        <Data />
        <SiteBanner />
        {children}
      </body>
    </html>
  );
}
