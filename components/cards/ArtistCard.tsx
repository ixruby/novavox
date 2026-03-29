import Link from "next/link";
import { Artist } from "@/lib/data";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={artist.image}
          alt={artist.name}
          className="grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#131313] to-transparent p-6">
          <h3 className="font-headline text-xl font-semibold tracking-wide text-white">
            {artist.name}
          </h3>
          <p className="text-[10px] tracking-[0.2em] text-[#919191] uppercase mt-1">
            {artist.genre}
          </p>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
          {artist.status}
        </p>
        <p className="text-[8px] tracking-[0.15em] text-[#474747]">
          {artist.coordinates}
        </p>
      </div>
    </Link>
  );
}
