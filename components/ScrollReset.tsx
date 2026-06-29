'use client';
import { useEffect } from 'react';

export default function ScrollReset({ dep }: { dep: string | undefined }) {
  useEffect(() => {
    document.querySelector('.col-3')?.scrollTo(0, 0);
    document.querySelectorAll('.col-scrollable').forEach(el => { (el as HTMLElement).scrollTop = 0; });
  }, [dep]);

  return null;
}
