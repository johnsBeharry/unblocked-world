import { Footer } from "../../components/footer/Footer.jsx";
import { GrantsHero } from "./components/grants-hero/GrantsHero.jsx";
import { ProgramsSections } from "./components/programs-section/PorgramsSection.jsx";
import styles from "./GrantsPage.module.scss";

export function GrantsPage() {
  return (
    <main className={styles.page}>
      <GrantsHero />
      <ProgramsSections />
      <Footer />
    </main>
  );
}
