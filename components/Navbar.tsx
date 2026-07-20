"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { navLinks, navCTA } from "@/lib/data";
import { useTranslations } from "next-intl";

// Map each navLink href to its literal translation key.
// Avoids dynamic key construction which cannot be resolved at build time.
const navLabelKeys: Record<string, string> = {
  "/": "nav.home",
  "#products": "nav.shop",
  "#categories": "nav.categories",
  "#sale": "nav.sale",
  "#newsletter": "nav.newsletter",
};

interface NavbarProps {
  cartItemCount?: number;
}

export default function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  function getLinkLabel(href: string): string {
    const key = navLabelKeys[href];
    return key ? t(key) : href;
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={
        isScrolled
          ? "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--surface)]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b border-[var(--border)]"
          : "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_0_16px_rgba(233,69,96,0.4)]">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-display text-xl font-bold text-[var(--foreground)] tracking-tight">
              {t("nav.brand")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {getLinkLabel(link.href)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              aria-label={t("nav.cart_label")}
              className="relative p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(233,69,96,0.6)]">
                  {cartItemCount}
                </span>
              )}
            </button>

            <Link
              href={resolveHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(233,69,96,0.35)]"
            >
              {t("nav.cta")}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={t("nav.menu_toggle")}
              className="md:hidden p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[var(--foreground)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--foreground)]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--surface)] border-t border-[var(--border)]"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5 rounded-xl transition-all duration-200"
                >
                  {getLinkLabel(link.href)}
                </Link>
              ))}
              <Link
                href={resolveHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="mt-2 px-4 py-3 text-sm font-semibold text-white bg-[var(--primary)] rounded-xl text-center"
              >
                {t("nav.cta")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
