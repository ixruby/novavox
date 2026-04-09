"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { DotGrid } from "@/components/ui/DotGrid";
import { FilterTabs } from "@/components/ui/FilterTabs";
import ProductCard from "@/components/cards/ProductCard";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { products as defaultProducts, type Product } from "@/lib/data";

const SERIES_FILTERS = ["ALL", "NVX-001", "NVX-002", "NVX-003", "NVX-004", "NVX-005"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [activeSeries, setActiveSeries] = useState("ALL");

  useEffect(() => { fetch("/api/data").then(r => r.json()).then(d => d.products && setProducts(d.products)).catch(() => {}); }, []);

  const filteredProducts =
    activeSeries === "ALL"
      ? products
      : products.filter((p) => p.series === activeSeries);

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <TopNav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 grayscale brightness-[0.2]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/40 via-[#131313]/70 to-[#131313]" />
        <div className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-12">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
            TECHNICAL AUDIO SYSTEMS
          </p>
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
            SONIC OBJECTS
          </h1>
          <div className="mt-6">
            <Breadcrumbs items={[{ label: "Shop" }]} />
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 sm:px-12 py-8 max-w-[1920px] mx-auto">
        <FilterTabs
          filters={SERIES_FILTERS}
          active={activeSeries}
          onChange={setActiveSeries}
        />
      </section>

      {/* Product Grid */}
      <section className="relative px-6 sm:px-12 pb-24 max-w-[1920px] mx-auto">
        <DotGrid />
        <ScrollReveal>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Technical Spec Section */}
      <section className="bg-[#0E0E0E] px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-24">
        <ScrollReveal>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">
              ENGINEERING
            </p>
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-white mb-8">
              THE ARCHIVAL PRESSING
            </h2>
            <p className="text-sm text-[#919191] leading-relaxed mb-12 max-w-lg">
              Every NovaVox pressing is manufactured to laboratory-grade
              tolerances. Each record is a precision instrument, engineered for
              maximum fidelity and structural permanence.
            </p>

            {/* Spec Table */}
            <div className="border-t border-white/5">
              {[
                { label: "Material", value: "Virgin 180g PVC Compound" },
                { label: "Weight", value: "180g ± 2g Tolerance" },
                { label: "Mastering", value: "Half-Speed, Direct Metal" },
                { label: "Tolerance", value: "ISO 3745 Class 1 Verified" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-4 border-b border-white/5"
                >
                  <span className="text-[10px] tracking-[0.2em] text-[#474747] uppercase">
                    {spec.label}
                  </span>
                  <span className="text-[10px] tracking-[0.15em] text-[#919191] uppercase">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square bg-[#1F1F1F] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80"
              alt="Archival pressing detail"
              loading="lazy"
              className="grayscale brightness-50 object-cover w-full h-full"
            />
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Newsletter */}
      <section className="text-center py-24 bg-[#131313] px-6 sm:px-12">
        <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">
          DISPATCH
        </p>
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-white mb-4">
          JOIN THE ARCHIVE
        </h2>
        <p className="text-[10px] tracking-[0.2em] text-[#919191] uppercase mb-10">
          FIRST ACCESS TO PRESSINGS, OBJECTS &amp; TRANSMISSIONS
        </p>
        <div className="flex items-center max-w-md mx-auto border-b border-[#919191]">
          <input
            type="email"
            placeholder="Email address"
            className="bg-transparent text-sm text-white placeholder-[#474747] flex-1 py-3 outline-none font-body"
          />
          <button
            type="button"
            className="text-white hover:opacity-70 transition-opacity pl-4 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Subscribe"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>
      </section>

      <Footer />
      <MobileNav />
      <ScrollToTop />
    </div>
  );
}
