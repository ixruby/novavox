interface StatusIndicatorProps {
  label: string;
  active?: boolean;
}

export function StatusIndicator({ label, active = false }: StatusIndicatorProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          active ? "bg-white animate-pulse" : "bg-[#474747]"
        }`}
        style={{ borderRadius: "9999px" }}
      />
      <span className="text-[9px] tracking-[0.2em] uppercase text-[#919191]">
        {label}
      </span>
    </div>
  );
}
