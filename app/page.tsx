"use client";
import { ElementType, useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Truck, RotateCcw, Shield, Zap, Heart, TrendingUp, Package } from 'lucide-react';
import { CATEGORIES, type Category } from "@/lib/data";
import { fadeInUp, staggerContainer, slideInRight } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";
// ── Static data (non-translatable fields) ────────────────────────────────────

const products = [
  {
    id: "1",
    name: "Velocity Oversized Tee",
    price: 42,
    originalPrice: 58 as number | undefined,
    discount: 28 as number | undefined,
    isSale: true,
    rating: 4.8,
    reviewCount: 312,
    description: "Ultra-soft 100% organic cotton. Dropped shoulders, relaxed fit.",
    image: "https://us.myprotein.com/images?url=https://static.thcdn.com/productimg/original/15208810-1355165965814289.jpg&format=webp&auto=avif",
    category: "Tops & Tees",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Nova Moto Jacket",
    price: 189,
    originalPrice: undefined as number | undefined,
    discount: undefined as number | undefined,
    isSale: false,
    rating: 4.9,
    reviewCount: 187,
    description: "Structured faux-leather with quilted lining. Wear it everywhere.",
    image: "https://cdn.shopify.com/s/files/1/0293/9277/products/InControlMotoJacket-Black_MER.jpg?v=1638464431&width=461&height=691&crop=center",
    category: "Outerwear",
    badge: "New",
  },
  {
    id: "3",
    name: "Flux Cargo Pants",
    price: 94,
    originalPrice: 120 as number | undefined,
    discount: 22 as number | undefined,
    isSale: true,
    rating: 4.7,
    reviewCount: 245,
    description: "Technical ripstop fabric. Six pockets. Tapered ankle.",
    image: "http://ap0cene.com/cdn/shop/files/fluxcargo.jpg?v=1749834946",
    category: "Bottoms",
    badge: "Sale",
  },
  {
    id: "4",
    name: "Drift Low Sneakers",
    price: 128,
    originalPrice: undefined as number | undefined,
    discount: undefined as number | undefined,
    isSale: false,
    rating: 4.6,
    reviewCount: 421,
    description: "Vulcanized sole, premium suede upper. Minimal and versatile.",
    image: "https://media.sorel.com/i/sorel/2150881_361_lf1?w=768&h=806&fmt=auto",
    category: "Footwear",
    badge: "New",
  },
  {
    id: "5",
    name: "Signal Hoodie",
    price: 76,
    originalPrice: 95 as number | undefined,
    discount: 20 as number | undefined,
    isSale: true,
    rating: 4.8,
    reviewCount: 538,
    description: "Heavyweight fleece, kangaroo pocket, ribbed cuffs.",
    image: "https://hbthmtb.com/wp-content/uploads/2025/06/6.png",
    category: "Tops & Tees",
    badge: "Sale",
  },
  {
    id: "6",
    name: "Arc Crossbody Bag",
    price: 65,
    originalPrice: undefined as number | undefined,
    discount: undefined as number | undefined,
    isSale: false,
    rating: 4.5,
    reviewCount: 193,
    description: "Water-resistant nylon. Adjustable strap. Fits a 13-inch laptop.",
    image: "https://www.incase.com/cdn/shop/files/ARC_DIMS_SmallCrossBody_BLACK_300DPI.png?v=1733859841&width=4267",
    category: "Accessories",
    badge: null,
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Jordan M.",
    location: "New York, NY",
    rating: 5,
    text: "The Nova Moto Jacket is everything. Fits perfectly, looks incredible, and the quality is way above the price point.",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Michael_Jordan_in_2014.jpg",
    product: "Nova Moto Jacket",
  },
  {
    id: "t2",
    name: "Priya S.",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I've ordered three times now. The Velocity Tee is my go-to. Soft, structured, and it holds its shape after washing.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQEsVGaT3gZljg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720453761122?e=2147483647&v=beta&t=fI57h9VVi0APY8AzA4yVkW9zOHjFnXyt8FqCm7X5BBc",
    product: "Velocity Oversized Tee",
  },
  {
    id: "t3",
    name: "Kai T.",
    location: "Chicago, IL",
    rating: 5,
    text: "Shipping was faster than expected and the packaging is genuinely beautiful. NovaThreads gets every detail right.",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Philippine_Air_Force_FA-50PH.jpg/1280px-Philippine_Air_Force_FA-50PH.jpg",
    product: "Flux Cargo Pants",
  },
];

// Icons for value props — order matches messages/en.json value.items array
const valuePropIcons: ElementType[] = [Truck, RotateCcw, Shield, Package];

const categoryNames = [
  "Tops & Tees",
  "Outerwear",
  "Bottoms",
  "Footwear",
  "Accessories",
] as const;

const categoryImages = [
  "/images/category-tops-tees.jpg",
  "/images/category-outerwear.jpg",
  "/images/category-bottoms.jpg",
  "/images/category-footwear.jpg",
  "/images/category-accessories.jpg",
];

const categoryCounts = [48, 24, 36, 19, 31];

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={
              star <= Math.round(rating)
                ? "w-3.5 h-3.5 text-[var(--primary)] fill-[var(--primary)]"
                : "w-3.5 h-3.5 text-[var(--border)]"
            }
          />
        ))}
      </div>
      <span className="text-xs text-[var(--muted)]">({count})</span>
    </div>
  );
}

function ProductCard({
  product,
  delay = 0,
}: {
  product: (typeof products)[0];
  delay?: number;
}) {
  const [wished, setWished] = useState(false);
  const t = useTranslations();

  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:border-[var(--primary)]/40 hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_40px_-8px_rgba(233,69,96,0.15)] transition-all duration-300"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--background)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span
              className={
                product.badge === "Sale"
                  ? "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--primary)] text-white"
                  : product.badge === "Best Seller"
                  ? "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white"
                  : "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--foreground)] text-[var(--background)]"
              }
            >
              {product.badge}
            </span>
          )}
          <button
            onClick={() => setWished((w) => !w)}
            aria-label={t("product.wishlist_label")}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--surface)]/80 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[var(--primary)]"
          >
            <Heart
              className={
                wished
                  ? "w-4 h-4 text-[var(--primary)] fill-[var(--primary)]"
                  : "w-4 h-4 text-[var(--muted)]"
              }
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-colors shadow-[0_4px_16px_rgba(233,69,96,0.4)]">
              <ShoppingCart className="w-4 h-4" />
              {t("product.add_to_cart")}
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-[var(--muted)] mb-1">{product.category}</p>
          <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug mb-1.5 tracking-tight">
            {product.name}
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-base font-bold text-[var(--foreground)]">
              {"$"}{product.price}
            </span>
            {product.originalPrice !== undefined && (
              <span className="text-sm text-[var(--muted)] line-through">
                {"$"}{product.originalPrice}
              </span>
            )}
            {product.discount !== undefined && (
              <span className="text-xs font-semibold text-[var(--primary)]">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Read array data from messages via t.raw — avoids dynamic key construction
  const statsItems = t.raw("stats.items") as Array<{ value: string; label: string }>;
  const valueItems = t.raw("value.items") as Array<{ title: string; desc: string }>;

  const filteredProducts =
    activeCategory === "All"
      ? products
      : activeCategory === "Sale"
      ? products.filter((p) => p.isSale)
      : products.filter((p) => p.category === activeCategory);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[var(--primary)]/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold mb-6">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-tight leading-[1.05] text-balance mb-6"
              >
                {t("hero.headline_1")}
                <br />
                <span className="text-[var(--primary)]">{t("hero.headline_accent")}</span>
                <br />
                {t("hero.headline_2")}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-[var(--muted)] leading-relaxed max-w-md mb-8 text-pretty"
              >
                {t("hero.subtext")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--primary-hover)] transition-all duration-200 shadow-[0_4px_24px_rgba(233,69,96,0.4)] hover:shadow-[0_8px_32px_rgba(233,69,96,0.5)] hover:-translate-y-0.5"
                >
                  {t("hero.cta_primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#sale"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#sale")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--primary)]/50 transition-all duration-200"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 mt-10 pt-8 border-t border-[var(--border)]"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[var(--surface)] border-2 border-[var(--background)] overflow-hidden"
                    >
                      <img
                        src={"/images/avatar-customer-" + i + ".jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--muted)]">{t("hero.social_proof")}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg ml-auto">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/770e0ccd849f/800/600"
                    alt={t("hero.image_alt")}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-6 -left-8 bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--foreground)]">{t("hero.card_title")}</p>
                      <p className="text-xs text-[var(--muted)]">{t("hero.card_sub")}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
                  className="absolute -top-4 -right-4 bg-[var(--primary)] text-white rounded-2xl px-4 py-2 shadow-[0_4px_16px_rgba(233,69,96,0.5)]"
                >
                  <p className="text-xs font-bold">{t("hero.float_badge")}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-[var(--surface)]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsItems.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-3xl font-black text-[var(--foreground)] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PRODUCTS */}
      <section id="products" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3 block">
                  {t("products.eyebrow")}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight text-balance">
                  {t("products.heading")}
                </h2>
              </div>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200"
              >
                {t("products.view_all")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    activeCategory === cat
                      ? "px-4 py-2 rounded-full text-sm font-medium bg-[var(--primary)] text-white shadow-[0_4px_12px_rgba(233,69,96,0.35)] transition-all duration-200"
                      : "px-4 py-2 rounded-full text-sm font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/40 transition-all duration-200"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 0.07} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-[var(--muted)]">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">{t("products.empty")}</p>
            </div>
          )}
        </div>
      </section>

      {/* SALE BANNER */}
      <Reveal>
        <section id="sale" className="py-16 bg-[var(--primary)]/5 border-y border-[var(--primary)]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold mb-4">
                  <Zap className="w-3 h-3" fill="white" />
                  {t("sale.badge")}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight mb-3">
                  {t("sale.heading")}
                </h2>
                <p className="text-[var(--muted)] text-lg max-w-md">{t("sale.subtext")}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="text-center px-8 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="font-display text-4xl font-black text-[var(--primary)]">30%</p>
                  <p className="text-xs text-[var(--muted)] mt-1">{t("sale.off_label")}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveCategory("Sale");
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--primary-hover)] transition-all duration-200 shadow-[0_4px_24px_rgba(233,69,96,0.4)]"
                >
                  {t("sale.cta")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CATEGORIES GRID */}
      <section id="categories" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3 block">
                {t("categories.eyebrow")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight text-balance">
                {t("categories.heading")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryNames.map((name, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setActiveCategory(name as Category);
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden w-full shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_40px_-8px_rgba(233,69,96,0.2)] transition-shadow duration-300"
                >
                  <img
                    src={categoryImages[i]}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-semibold text-white text-sm leading-tight">{name}</p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {categoryCounts[i]} {t("categories.items_label")}
                    </p>
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <Reveal>
        <section className="py-16 bg-[var(--surface)]/50 border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueItems.map((vp, i) => {
                const Icon = valuePropIcons[i];
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-5 h-5 text-[var(--primary)]" />}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] text-sm mb-1">{vp.title}</p>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{vp.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3 block">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight text-balance">
                {t("testimonials.heading")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:border-[var(--primary)]/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[var(--foreground)] text-sm leading-relaxed mb-5">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--background)] flex-shrink-0">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{review.name}</p>
                      <p className="text-xs text-[var(--muted)]">{review.location}</p>
                    </div>
                    <span className="ml-auto text-xs text-[var(--primary)] font-medium bg-[var(--primary)]/10 px-2.5 py-1 rounded-full">
                      {review.product}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Reveal>
        <section id="newsletter" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden p-10 md:p-16 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_24px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--primary)]/10 blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  {t("newsletter.badge")}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight text-balance mb-4">
                  {t("newsletter.heading")}
                </h2>
                <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
                  {t("newsletter.subtext")}
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold"
                  >
                    <Shield className="w-4 h-4" />
                    {t("newsletter.success")}
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("newsletter.placeholder")}
                      required
                      className="flex-1 px-5 py-3 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--primary-hover)] transition-all duration-200 shadow-[0_4px_16px_rgba(233,69,96,0.4)] whitespace-nowrap"
                    >
                      {t("newsletter.cta")}
                    </button>
                  </form>
                )}

                <p className="text-xs text-[var(--muted)] mt-4">{t("newsletter.disclaimer")}</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
