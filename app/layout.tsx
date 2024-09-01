import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { FaHouse, FaCalendarDays, FaTable } from "react-icons/fa6";
import StoreProvider from "@/store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assignment",
  description: "Next Js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex ${inter.className}`}>
        <StoreProvider>
          <Sidebar>
            <SidebarItem icon={<FaHouse />} text="home" active />
            <SidebarItem icon={<FaCalendarDays />} text="calendar" alert />
            <SidebarItem icon={<FaTable />} text="table" />
          </Sidebar>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
