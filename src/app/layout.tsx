import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import NavBar from "@/components/Navbar/NavBar";

const inter = Inter({ subsets: ["latin"],
display: 'swap', });

export const metadata: Metadata = {
  title: "RentalBike",
  description: "Renta de motocicletas",
};

interface RootLayoutProps{
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps
){

  return (
    <html  lang="en">
      <body className={inter.className}>
        <NavBar/>
        <NotificationProvider>
          <main>
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  );
}
