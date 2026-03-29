'use client';

import dynamic from 'next/dynamic';

export const ClientOnlyBackground = dynamic(
  () => import('./SpatialBackground').then((mod) => mod.SpatialBackground),
  { ssr: false }
);
