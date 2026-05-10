'use client';

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/react-lenis';

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <Lenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </Lenis>
  );
}
