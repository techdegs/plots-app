import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import ToastMessage from "./_components/ToastMessage";

export const metadata = {
  developer: "Samuel Osei Adu",
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
