"use client";

interface FilterTabsProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export function FilterTabs({ filters, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-row gap-2">
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all ${
              isActive
                ? "bg-white text-[#1A1C1C]"
                : "text-[#919191] border border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
