'use client';
import { useEffect } from 'react';

export default function ScrollReset({ dep }: { dep: string | undefined }) {
  useEffect(() => {
    // Reset scroll on all possible scroll containers
    const col3 = document.querySelector('.col-3');
    if (col3) {
      col3.scrollTop = 0;
    }
    
    const shell = document.querySelector('.shell');
    if (shell) {
      shell.scrollTop = 0;
    }
    
    const colScrollables = document.querySelectorAll('.col-scrollable');
    colScrollables.forEach(el => {
      el.scrollTop = 0;
    });

    // Also just in case window is scrolling
    window.scrollTo(0, 0);

  }, [dep]);

  return null;
}
