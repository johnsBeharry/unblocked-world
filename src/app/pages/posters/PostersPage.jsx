import { Footer } from "../../components/footer/Footer.jsx";
import styles from "./PostersPage.module.scss";
import { OwnershipAbout } from "./components/ownership-about/OwnershipAbout.jsx";
import { OwnershipBreak } from "./components/ownership-break/OwnershipBreak.jsx";
import { OwnershipComingNext } from "./components/ownership-coming-next/OwnershipComingNext.jsx";
import { OwnershipContestHero } from "./components/ownership-contest-hero/OwnershipContestHero.jsx";
import { OwnershipExploration } from "./components/ownership-exploration/OwnershipExploration.jsx";
import { OwnershipHowItWorks } from "./components/ownership-how-it-works/OwnershipHowItWorks.jsx";
import { OwnershipJury } from "./components/ownership-jury/OwnershipJury.jsx";
import { OwnershipKeyDates } from "./components/ownership-key-dates/OwnershipKeyDates.jsx";
import { OwnershipProgramme } from "./components/ownership-programme/OwnershipProgramme.jsx";
import { OwnershipReferences } from "./components/ownership-references/OwnershipReferences.jsx";

export function PostersPage() {
  return (
    <main className={styles.page}>
      <div className={styles.viewport}>
        <div className={styles.canvas}>
          <OwnershipContestHero />
          <OwnershipAbout />
          <OwnershipBreak />
          <OwnershipExploration />
          <OwnershipReferences />
          <OwnershipProgramme />
          <OwnershipJury />
          <OwnershipHowItWorks />
          <OwnershipKeyDates />
          <OwnershipComingNext />
          <Footer color="#d9d9d9" ctaVariant="poster" />
        </div>
      </div>
    </main>
  );
}
