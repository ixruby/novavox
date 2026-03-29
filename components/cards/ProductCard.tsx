import { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  return (
    <div className="group">
      <div className="relative overflow-hidden aspect-square bg-[#1F1F1F]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 text-[8px] tracking-[0.2em] bg-white text-[#1A1C1C] px-2 py-1 uppercase">
            {product.badge}
          </span>
        )}
      </div>
      <div className="pt-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-headline text-sm tracking-wide font-medium text-[#E2E2E2]">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-[#E2E2E2]">
            {formattedPrice}
          </span>
        </div>
        <p className="text-[10px] text-[#919191] tracking-[0.15em] uppercase mt-1">
          {product.series} / {product.material}
        </p>
        <button className="mt-3 w-full text-[10px] tracking-[0.2em] uppercase border border-white/10 py-3 hover:bg-white hover:text-[#1A1C1C] transition-all text-[#E2E2E2]">
          Add to Archive
        </button>
      </div>
    </div>
  );
}
