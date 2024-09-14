import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >

            {children}
            <ToastProvider />
            <ModalProvider />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
