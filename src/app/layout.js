"use client";

import { useState } from "react";
import "./globals.css";
import { geistSans } from "./fonts";
import { Context } from "./context";
import Header from "@/components/header";
import ContactModal from "@/components/contact-modal";
import IconModal from "@/components/icon-modal";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({
    iconName: "",
    iconSet: "",
    JSX: "",
    HTML: "",
  });

  return (
    <html lang="en">
      <body
        className={`box-border text-[#666] text-sm antialiased ${
          geistSans.className
        } ${menuOpen ? "overflow-hidden lg:overflow-auto" : ""} ${
          filterDropdownOpen ? "overflow-hidden sm:overflow-auto" : ""
        } ${contactModalOpen ? "overflow-hidden" : ""} ${
          iconModalOpen ? "overflow-hidden" : ""
        }`}
      >
        <Context.Provider
          value={{
            menuOpen,
            setMenuOpen,
            filterDropdownOpen,
            setFilterDropdownOpen,
            contactModalOpen,
            setContactModalOpen,
            iconModalOpen,
            setIconModalOpen,
            clickedItem,
            setClickedItem,
          }}
        >
          <Header />
          <ContactModal />
          <IconModal />
          {children}
          <Footer />
        </Context.Provider>
        <Analytics />
      </body>
    </html>
  );
}
