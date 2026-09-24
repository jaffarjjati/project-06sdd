import type { ReactNode } from "react";
import "@/app/globals.css";
import Layout from "@/components/layout/auth";
import { Instrument_Serif, JetBrains_Mono, Roboto } from "next/font/google";

export const metadata = {
  title: "project-06sdd",
  description: "a book library project",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
