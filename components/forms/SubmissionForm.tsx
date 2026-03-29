"use client";

import { useState } from "react";

export default function SubmissionForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [specs, setSpecs] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h2 className="font-headline text-3xl tracking-wide text-[#E2E2E2]">
        COORDINATE SUBMISSION
      </h2>

      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
          Artist / Entity Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
          Submission Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors appearance-none"
          required
        >
          <option value="" disabled>
            Select format
          </option>
          <option value="spatial">SPATIAL AUDIO ATMOS</option>
          <option value="lossless">LOSSLESS STEREO</option>
          <option value="demo">TECHNICAL DEMO</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#919191] mb-2">
          Technical Specifications
        </label>
        <textarea
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          rows={4}
          className="w-full bg-transparent border-b border-[#474747] focus:border-white text-sm text-[#E2E2E2] py-3 outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="bg-white text-[#1A1C1C] text-[10px] tracking-[0.2em] uppercase px-8 py-4 hover:opacity-90 transition-opacity font-medium"
      >
        Transmit Data
      </button>
    </form>
  );
}
