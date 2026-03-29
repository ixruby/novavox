interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`bg-[#353535]/60 backdrop-blur-[40px] border border-white/5 ${className}`}
    >
      {children}
    </div>
  );
}
