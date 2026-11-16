import { useRef } from "react";
import { Footer } from "../../components/footer/Footer.jsx";
import { useRefreshOnHeightChange } from "../grants/motion/useRefreshOnHeightChange";
import { ProgramHero } from "../grants/components/program-hero/ProgramHero.jsx";
import { RingsArtwork } from "../grants/components/rings-artwork/RingsArtwork.jsx";
import { FundingSection } from "../grants/components/funding-section/FundingSection.jsx";
import { IntroSection } from "./components/intro-section/IntroSection.jsx";
import { DirectionsSection } from "./components/directions-section/DirectionsSection.jsx";
import { ProgramListSection } from "../grants/components/program-list-section/ProgramListSection.jsx";
import { ProgramStepsSection } from "../grants/components/program-steps-section/ProgramStepsSection.jsx";
import { ProgramCrossLinkSection } from "../grants/components/program-cross-link-section/ProgramCrossLinkSection.jsx";
import { SliceArtwork } from "../grants/components/slice-artwork/SliceArtwork.jsx";
import { CROSS_LINK_SLICES } from "./crossLinkSlices";
import hero from "./hero.json";
import funding from "./funding.json";
import role from "./role.json";
import process from "./process.json";
import crossLink from "./crossLink.json";
import styles from "./OpenSystemsPage.module.scss";

// Hero rings measured from the 1440 desktop mockup (artwork 1440 × 854 under
// the 645px intro, centre 721 / 427), outermost first = paint order. The
// artwork is on the first screen, so the iris plays once on load.
const HERO_ART = { width: 1440, height: 854, cx: 721, cy: 427 };
const HERO_RINGS = [
  { r: 683, tone: "light" },
  { r: 632.85, tone: "dark" },
  { r: 527, tone: "light" },
  { r: 452, tone: "dark" },
  { r: 326, tone: "light" },
];

export function OpenSystemsPage() {
  const pageRef = useRef(null);
  useRefreshOnHeightChange(pageRef);

  return (
    <main ref={pageRef} className={styles["open-systems-page"]}>
      {/* Desktop UI on tablet too: see OpenSystemsPage.module.scss. */}
      <div className={styles["open-systems-page__sections"]}>
        <ProgramHero
          id="open-systems-title"
          title={hero.title}
          summary={hero.summary}
          artwork={
            <RingsArtwork
              {...HERO_ART}
              rings={HERO_RINGS}
              play="intro"
              className={styles["open-systems-page__hero-art"]}
            />
          }
          className={styles["open-systems-page__hero"]}
        />
        <FundingSection content={funding} className={styles["open-systems-page__funding"]} />
        <IntroSection />
        <DirectionsSection />
        <ProgramListSection id="open-systems-role-title" content={role} />
        <ProgramStepsSection
          id="open-systems-process-title"
          content={process}
          className={styles["open-systems-page__process"]}
        />
        <ProgramCrossLinkSection
          id="open-systems-cross-link-title"
          content={crossLink}
          artwork={<SliceArtwork geometry={CROSS_LINK_SLICES} />}
          className={styles["open-systems-page__cross-link"]}
        />
      </div>
      <Footer />
    </main>
  );
}
