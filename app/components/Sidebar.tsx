"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { FaUser, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/next.svg";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <aside
      className={`sticky top-0 h-screen transition-all ${
        expanded ? "w-60" : "w-min"
      }`}
    >
      <nav className="h-full flex flex-col align-end bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src={logo}
            alt="logo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-200">
            <FaUser />
          </button>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Akbar</h4>
              <span className="text-xs text-gray-600">Akbar@gmail.com</span>
            </div>
            <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-200">
              <FaEllipsisVertical size={20} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a SidebarContext provider");
  }

  const { expanded } = context;

  return (
    <li>
      <Link
        className={`relative capitalize p-2 my-1 flex justify-center items-center font-medium rounded-full cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-cyan-200 to-indigo-100 text-cyan-400"
            : "hover:bg-cyan-50 text-gray-600"
        }`}
        href={`/${text === "home" ? "" : text}`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-cyan-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
        {!expanded && (
          <div
            className={`
          absolute left-0 rounded-md px-2 py-1 ml-6
          bg-cyan-400 text-white text-sm z-10 invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-10`}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

export default Sidebar;
