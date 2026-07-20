"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Camera as Instagram, MessageCircle as Twitter, Heart } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { useTranslations } from "next-intl";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const footerSections = [
  {
    titleKey: "footer.shop_title",
    links: [
      { labelKey: "footer.new_arrivals", href: "#products" },
      { labelKey: "footer.best_sellers", href: "#products" },
      { labelKey: "footer.sale", href: "#sale" },
      { labelKey: "footer.all_products", href: "#products" },
    ],
  },
  {
    titleKey: "footer.help_title",
    links: [
      { labelKey: "footer.shipping", href: "#" },
      { labelKey: "footer.returns", href: "#" },
      { labelKey: "footer.size_guide", href: "#" },
      { labelKey: "footer.contact", href: "#" },
    ],
  },
  {
    titleKey: "footer.company_title",
    links: [
      { labelKey: "footer.about", href: "#" },
      { labelKey: "footer.sustainability", href: "#" },
      { labelKey: "footer.careers", href: "#" },
      { labelKey: "footer.press", href: "#" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#") && href !== "#") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#") && href !== "#" && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_0_16px_rgba(233,69,96,0.4)]">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-bold text-[var(--foreground)] tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/novathreads"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.instagram_label")}
                className="w-9 h-9 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] text-[var(--muted)] transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/novathreads"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.twitter_label")}
                className="w-9 h-9 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] text-[var(--muted)] transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com/novathreads"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.pinterest_label")}
                className="w-9 h-9 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] text-[var(--muted)] transition-all duration-200"
              >
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.titleKey} variants={fadeInUp}>
              <h3 className="text-[var(--foreground)] text-sm font-semibold uppercase tracking-wider mb-4">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={resolveHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-[var(--muted)] text-sm hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--muted)] text-xs">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[var(--muted)] text-xs hover:text-[var(--foreground)] transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="#"
              className="text-[var(--muted)] text-xs hover:text-[var(--foreground)] transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}