import { TourEvent } from "@/lib/data";

export default function TourEventRow({ event }: { event: TourEvent }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-6 border-b border-white/5 hover:bg-[#1B1B1B] transition-colors group">
      <div className="sm:w-24">
        <span className="font-headline text-2xl font-light tracking-wide text-[#E2E2E2]">
          {event.date}
        </span>
      </div>
      <div className="sm:w-48">
        <span className="font-headline text-lg font-medium text-[#E2E2E2] block">
          {event.city}
        </span>
        <span className="text-[10px] text-[#919191] tracking-[0.2em] uppercase">
          {event.country}
        </span>
      </div>
      <div className="flex-1">
        <span className="text-sm text-[#919191]">{event.venue}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {event.features.map((feature) => (
          <span
            key={feature}
            className="text-[8px] tracking-[0.15em] bg-[#1F1F1F] px-3 py-1 text-[#919191] uppercase"
          >
            {feature}
          </span>
        ))}
      </div>
      <div className="w-full sm:w-32 sm:text-right">
        {event.status === "RESERVE" ? (
          <button className="w-full sm:w-auto border border-white/20 text-[10px] tracking-[0.2em] px-4 py-2 min-h-[44px] hover:bg-white hover:text-[#1A1C1C] transition-all text-[#E2E2E2] uppercase">
            Reserve
          </button>
        ) : (
          <span className="text-[10px] text-[#474747] tracking-[0.2em] uppercase">
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
}
