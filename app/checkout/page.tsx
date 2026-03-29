"use client";

import TopNav from "@/components/layout/TopNav";
import { GlassPanel } from "@/components/ui/GlassPanel";

const steps = [
  { number: 1, label: "CART" },
  { number: 2, label: "SHIPPING" },
  { number: 3, label: "PAYMENT" },
  { number: 4, label: "REVIEW" },
];

const activeStep = 3;

const orderItems = [
  { name: "KINETIC MONOLITH", sku: "NVX-001", price: 48.0 },
  { name: "VOID RESONANCE", sku: "NVX-002", price: 112.0 },
];

const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
const shipping = 12.0;
const total = subtotal + shipping;

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#E2E2E2]">
      <TopNav />

      <main className="pt-24 min-h-screen">
        <div className="grid grid-cols-[260px_1fr_400px] min-h-[calc(100vh-96px)]">
          {/* LEFT SIDEBAR — Checkout Stepper */}
          <aside className="bg-[#0E0E0E] p-8">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#919191] mb-8">
              PAYMENT PROTOCOL
            </h2>

            <div className="flex flex-col">
              {steps.map((step) => {
                const isActive = step.number === activeStep;
                return (
                  <div
                    key={step.number}
                    className={`flex items-center gap-3 py-4 border-b border-white/5 ${
                      isActive ? "text-white" : "text-[#474747]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center text-[10px] border ${
                        isActive
                          ? "border-white text-white"
                          : "border-[#474747] text-[#474747]"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`text-[10px] tracking-[0.15em] uppercase ${
                        isActive ? "text-white" : "text-[#474747]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* CENTER — Payment Form */}
          <section className="p-12">
            <h2 className="font-headline text-2xl tracking-wide text-[#E2E2E2] mb-8">
              PAYMENT DETAILS
            </h2>

            <form className="max-w-xl space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                />
              </div>

              {/* Expiry + CVV */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="000"
                    className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Full name on card"
                  className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                />
              </div>

              {/* City + ZIP */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                  />
                </div>
                <div className="w-40">
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                    ZIP
                  </label>
                  <input
                    type="text"
                    placeholder="00000"
                    className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors placeholder-[#474747]"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
                  Country
                </label>
                <select className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors appearance-none">
                  <option value="" disabled>
                    Select country
                  </option>
                  <option value="DE">Germany</option>
                  <option value="JP">Japan</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="FR">France</option>
                  <option value="IS">Iceland</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-white text-[#1A1C1C] w-full py-4 mt-8 text-[10px] tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity"
              >
                CONFIRM PROTOCOL
              </button>
            </form>
          </section>

          {/* RIGHT SIDEBAR — Order Summary */}
          <aside className="bg-[#1B1B1B] p-8">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#919191] mb-8">
              ORDER SUMMARY
            </h2>

            {/* Product Items */}
            <div className="space-y-6">
              {orderItems.map((item) => (
                <div key={item.sku} className="flex gap-4">
                  <div className="w-16 h-16 bg-[#1F1F1F] flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm text-[#E2E2E2] font-medium">
                      {item.name}
                    </h3>
                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747] block mt-1">
                      {item.sku}
                    </span>
                  </div>
                  <span className="text-sm text-[#E2E2E2] flex-shrink-0">
                    EUR {item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 my-6" />

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#919191]">
                  Subtotal
                </span>
                <span className="text-sm text-[#E2E2E2]">
                  EUR {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#919191]">
                  Shipping
                </span>
                <span className="text-sm text-[#E2E2E2]">
                  EUR {shipping.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#919191]">
                  Total
                </span>
                <span className="font-headline text-xl font-semibold text-[#E2E2E2]">
                  EUR {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="mt-8 space-y-3">
              <GlassPanel className="p-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-[16px] text-[#919191]">
                  lock
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-[#919191]">
                  AES-256 ENCRYPTED
                </span>
              </GlassPanel>
              <GlassPanel className="p-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-[16px] text-[#919191]">
                  verified_user
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-[#919191]">
                  SECURE PROTOCOL
                </span>
              </GlassPanel>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
