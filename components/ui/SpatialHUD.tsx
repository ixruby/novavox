type HUDPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface SpatialHUDProps {
  position?: HUDPosition;
  coordinates?: string;
  status?: string;
}

const positionStyles: Record<HUDPosition, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

const alignStyles: Record<HUDPosition, string> = {
  "top-left": "items-start text-left",
  "top-right": "items-end text-right",
  "bottom-left": "items-start text-left",
  "bottom-right": "items-end text-right",
};

export function SpatialHUD({
  position = "top-left",
  coordinates = "52.5200\u00B0N, 13.4050\u00B0E",
  status = "ACTIVE",
}: SpatialHUDProps) {
  return (
    <div
      className={`absolute ${positionStyles[position]} z-10 pointer-events-none`}
    >
      <div
        className={`flex flex-col gap-0.5 leading-relaxed ${alignStyles[position]}`}
      >
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747] font-body">
          LOC: {coordinates}
        </span>
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747] font-body">
          SYS_STATUS: {status}
        </span>
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747] font-body">
          TRANS_VECTOR: READY
        </span>
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747] font-body">
          ENC_STATUS: AES-256-GCM
        </span>
      </div>
    </div>
  );
}
