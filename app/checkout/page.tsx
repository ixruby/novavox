'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Truck, ShieldCheck, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Checkout() {
  const [step, setStep] = React.useState(1);
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div>
          <div className="mono-label mb-4">CHECKOUT_V1.0</div>
          <h1 className="text-6xl font-bold uppercase">SECURE CHECKOUT</h1>
        </div>
        <div className="flex items-center gap-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 flex items-center justify-center text-[10px] font-bold border transition-all duration-500",
                step >= s ? "bg-white text-black border-white" : "text-white/20 border-white/10"
              )}>
                0{s}
              </div>
              <div className={cn(
                "mono-label transition-colors duration-500",
                step >= s ? "text-white" : "text-white/20"
              )}>
                {s === 1 ? 'SHIPPING' : s === 2 ? 'PAYMENT' : 'REVIEW'}
              </div>
              {s < 3 && <div className="w-8 h-[1px] bg-white/10 ml-2" />}
            </div>
          ))}
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          <div className="w-24 h-24 border border-white/10 flex items-center justify-center">
            <ShoppingBag size={48} className="text-white/10" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase mb-2">YOUR SYSTEM IS EMPTY</h2>
            <p className="text-white/40 text-sm">Add sonic objects to begin your architectural journey.</p>
          </div>
          <Link href="/catalog" className="px-12 py-5 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all flex items-center gap-4">
            GO TO CATALOG <ArrowRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Truck size={20} className="text-white/40" />
                <h2 className="text-2xl font-bold uppercase">SHIPPING DATA</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="mono-label text-white/40">FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="LYRA VOID"
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mono-label text-white/40">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="LYRA@NOVAVOX.COM"
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="mono-label text-white/40">STREET ADDRESS</label>
                  <input 
                    type="text" 
                    placeholder="123 SONIC ARCHITECTURE WAY"
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mono-label text-white/40">CITY</label>
                  <input 
                    type="text" 
                    placeholder="NEO-BERLIN"
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mono-label text-white/40">POSTAL CODE</label>
                  <input 
                    type="text" 
                    placeholder="10115"
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <CreditCard size={20} className="text-white/40" />
                <h2 className="text-2xl font-bold uppercase">PAYMENT METHOD</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['CREDIT CARD', 'CRYPTO', 'BANK TRANSFER'].map((method) => (
                  <button 
                    key={method}
                    className="p-6 glass border border-white/10 hover:bg-white/10 transition-all text-center space-y-2 group"
                  >
                    <div className="mono-label group-hover:text-white transition-colors">{method}</div>
                    <div className="text-[10px] text-white/20">SECURE_ENCRYPTED</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 flex justify-between items-center">
              <Link href="/catalog" className="text-white/40 hover:text-white transition-colors mono-label flex items-center gap-2">
                <ArrowRight size={14} className="rotate-180" /> BACK TO CATALOG
              </Link>
              <button 
                onClick={() => setStep(2)}
                className="px-12 py-5 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all flex items-center gap-4"
              >
                CONTINUE TO PAYMENT <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-12">
            <div className="glass border border-white/10 p-8 space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <ShoppingBag size={18} className="text-white/40" />
                <h2 className="text-xl font-bold uppercase">ORDER SUMMARY</h2>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start group">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold tracking-widest uppercase">{item.name}</div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-white transition-all"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <div className="mono-label text-white/30 mt-1">QTY: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-bold">{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between text-white/50 text-xs">
                  <span>SUBTOTAL</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/50 text-xs">
                  <span>SHIPPING</span>
                  <span>$45</span>
                </div>
                <div className="flex justify-between text-white/50 text-xs">
                  <span>TAX</span>
                  <span>${(totalPrice * 0.08).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4">
                  <span>TOTAL</span>
                  <span>${(totalPrice + 45 + totalPrice * 0.08).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 border border-white/10 text-white/40">
              <ShieldCheck size={24} />
              <div className="text-[10px] font-mono leading-relaxed">
                YOUR TRANSACTION IS PROTECTED BY 256-BIT SSL ENCRYPTION. 
                NOVAVOX DOES NOT STORE YOUR PAYMENT DATA.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
