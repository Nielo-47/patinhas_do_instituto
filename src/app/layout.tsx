import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "@/components/Header/Header";
import { Itim } from "next/font/google";

const itim = Itim({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-itim',
});

export const metadata: Metadata = {
  title: "Patinhas do Instituto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <html lang="pt" className={itim.variable}>
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
