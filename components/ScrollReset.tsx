'use client';
import { useEffect } from 'react';

export default function ScrollReset({ dep }: { dep: string | undefined }) {
  useEffect(() => {
    document.querySelector('.win-split-right')?.scrollTo(0, 0);
    document.querySelector('.win-content-scroll')?.scrollTo(0, 0);
  }, [dep]);

  return null;
}
