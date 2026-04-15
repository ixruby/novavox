export default function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03]"
      aria-hidden="true"
      style={{
        background:
          "repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%) 50% / 2px 2px",
      }}
    />
  );
}
