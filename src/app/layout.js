import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Magdeburg City Explorer",
  description: "Explore real-time and historical data for Magdeburg: people, housing, mobility, environment, economy and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="flex h-screen overflow-hidden antialiased"
        style={{ background: "#F8FAFC", color: "#0F172A" }}
      >
        <LanguageProvider>
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <MobileHeader />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
