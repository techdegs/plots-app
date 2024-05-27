import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import ToastMessage from "./_components/ToastMessage";
import { Suspense } from "react";

//const inter = Inter({ subsets: ["outfit"] });

export const metadata = {
  title: "GOP",
  description: "Get-One-Plot, Where listing of properties and land purchase made easy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToastMessage />
          <Provider>{children}</Provider>
          <Toaster /> 
        </body>
      </html>
    </ClerkProvider>
  );
}
