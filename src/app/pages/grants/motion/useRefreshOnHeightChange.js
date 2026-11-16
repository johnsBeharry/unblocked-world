import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Shared by the grant program pages (Culture Grants, Open Systems).
const REFRESH_DELAY = 150; // ms, lets a burst of re-measures settle

// Section ScrollTriggers measure their start/end when they mount, but the
// text-driven sections keep changing height afterwards (RevealText splits
// its lines after measuring, again once the font loads), so later triggers
// fired hundreds of px early. Refresh them whenever the page height changes,
// and once after mount and once the fonts are ready: the first RevealText
// splits run in layout effects before this observer is attached, so their
// height change is never observed (Open Systems directions trigger was
// computed ~900px early).
export function useRefreshOnHeightChange(pageRef) {
  useEffect(() => {
    const page = pageRef.current;
    let height = page.offsetHeight;
    let timer;
    const observer = new ResizeObserver(() => {
      if (Math.abs(page.offsetHeight - height) < 1) return;
      height = page.offsetHeight;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), REFRESH_DELAY);
    });
    observer.observe(page);
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    const frame = requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [pageRef]);
}
