import { useRef } from "react";
import { useRefreshOnHeightChange } from "../grants/motion/useRefreshOnHeightChange";
import { Footer } from "../../components/footer/Footer.jsx";
import { ProgramHero } from "../grants/components/program-hero/ProgramHero.jsx";
import { SliceArtwork } from "../grants/components/slice-artwork/SliceArtwork.jsx";
import { HERO_SLICES } from "./heroSlices";
import { FundingSection } from "../grants/components/funding-section/FundingSection.jsx";
import { MakersSection } from "./components/makers-section/MakersSection.jsx";
import { ProgramListSection } from "../grants/components/program-list-section/ProgramListSection.jsx";
import { ProgramStepsSection } from "../grants/components/program-steps-section/ProgramStepsSection.jsx";
import { ProgramCrossLinkSection } from "../grants/components/program-cross-link-section/ProgramCrossLinkSection.jsx";
import { RingsArtwork } from "../grants/components/rings-artwork/RingsArtwork.jsx";
import hero from "./hero-content.json";
import funding from "./funding-content.json";
import eligibility from "./eligibility-content.json";
import application from "./application-content.json";
import crossLink from "./cross-link-content.json";
import styles from "./CultureGrantsPage.module.scss";

// Open System cross-link rings, measured from the 1440 × 800 mockup (720 ×
// 800 panel, centre 360 / 400), outermost first = paint order. Scrubbed
// iris on the panel (RingsArtwork default `top 85%` → `bottom bottom`).
const CROSS_LINK_PANEL = { width: 720, height: 800, cx: 360, cy: 400 };
const CROSS_LINK_RINGS = [
  { r: 483.5, tone: "light" },
  { r: 447.5, tone: "dark" },
  { r: 373.5, tone: "light" },
  { r: 320, tone: "dark" },
  { r: 230.5, tone: "light" },
];

export function CultureGrantsPage() {
  const pageRef = useRef(null);
  useRefreshOnHeightChange(pageRef);

  return (
    <main ref={pageRef} className={styles["culture-grants-page"]}>
      {/* Desktop UI on tablet too: see CultureGrantsPage.module.scss. */}
      <div className={styles["culture-grants-page__sections"]}>
        <ProgramHero
          id="culture-grants-title"
          title={hero.title}
          summary={hero.summary}
          artwork={<SliceArtwork geometry={HERO_SLICES} mobileIntro />}
          className={styles["culture-grants-page__hero"]}
        />
        <FundingSection content={funding} />
        <MakersSection />
        <ProgramListSection id="eligibility-title" content={eligibility} />
        <ProgramStepsSection id="application-title" content={application} />
        <ProgramCrossLinkSection
          id="open-system-title"
          content={crossLink}
          artwork={<RingsArtwork {...CROSS_LINK_PANEL} rings={CROSS_LINK_RINGS} />}
          className={styles["culture-grants-page__cross-link"]}
        />
      </div>
      <Footer />
    </main>
  );
}
