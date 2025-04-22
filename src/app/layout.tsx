// app/layout.tsx (server component)

import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header/Header";
import { Itim } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";

const itim = Itim({
  subsets: ["latin-ext"],
  weight: ["400"],
  variable: "--font-itim",
});

export const metadata: Metadata = {
  title: "Patinhas do Instituto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={itim.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
