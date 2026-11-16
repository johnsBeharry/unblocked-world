import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "../../components/footer/Footer.jsx";
import { CultureGrantsHero } from "./components/culture-grants-hero/CultureGrantsHero.jsx";
import { FundingSection } from "./components/funding-section/FundingSection.jsx";
import { MakersSection } from "./components/makers-section/MakersSection.jsx";
import { EligibilitySection } from "./components/eligibility-section/EligibilitySection.jsx";
import { ApplicationSection } from "./components/application-section/ApplicationSection.jsx";
import { OpenSystemSection } from "./components/open-system-section/OpenSystemSection.jsx";
import styles from "./CultureGrantsPage.module.scss";

const REFRESH_DELAY = 150; // ms, lets a burst of re-measures settle

// Section ScrollTriggers measure their start/end when they mount, but the
// text-driven sections keep changing height afterwards (RevealText splits
// its lines after measuring, again once the font loads), so later triggers
// fired hundreds of px early. Refresh them whenever the page height changes.
function useRefreshOnHeightChange(pageRef) {
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
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pageRef]);
}

export function CultureGrantsPage() {
  const pageRef = useRef(null);
  useRefreshOnHeightChange(pageRef);

  return (
    <main ref={pageRef} className={styles["culture-grants-page"]}>
      {/* Desktop UI on tablet too: see CultureGrantsPage.module.scss. */}
      <div className={styles["culture-grants-page__sections"]}>
        <CultureGrantsHero />
        <FundingSection />
        <MakersSection />
        <EligibilitySection />
        <ApplicationSection />
        <OpenSystemSection />
      </div>
      <Footer />
    </main>
  );
}
