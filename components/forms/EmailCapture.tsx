"use client";

import { useState } from "react";

export default function EmailCapture({
  label = "RECEIVE THE WEEKLY SONIC DISPATCH",
}: {
  label?: string;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    setEmail("");
  };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mb-6 text-center">
        {label}
      </p>
      <form onSubmit={handleSubmit} className="flex border-b border-[#919191]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your coordinates"
          className="bg-transparent text-sm text-white placeholder-[#474747] flex-1 py-3 outline-none min-h-[44px]"
          required
        />
        <button type="submit" className="text-white hover:opacity-70 transition-opacity pl-4">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </div>
  );
}
