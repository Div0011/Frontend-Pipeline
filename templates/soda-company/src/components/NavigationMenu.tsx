"use client";

import React from "react";
import StaggeredMenu from "./StaggeredMenu";
import { useAdaptiveTheme } from "./AdaptiveThemeProvider";

export default function NavigationMenu() {
  const { theme } = useAdaptiveTheme();

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Products", ariaLabel: "View our soda collection", link: "/products" },
    { label: "Contact", ariaLabel: "Get in touch with AURA", link: "/contact" },
  ];

  const socialItems = [
    { label: "Twitter / X", link: "https://twitter.com" },
    { label: "Instagram", link: "https://instagram.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={true}
      colors={["rgba(22, 5, 36, 0.75)", "rgba(9, 2, 18, 0.85)"]}
      accentColor={theme.accentColor}
    />
  );
}
