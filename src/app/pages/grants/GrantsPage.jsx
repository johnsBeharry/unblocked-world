import { Footer } from "../../components/footer/Footer.jsx";
import { GrantsHero } from "./components/grants-hero/GrantsHero.jsx";
import { PeopleSection } from "./components/people-section/PeopleSection.jsx";
import { PrinciplesSection } from "./components/principles-section/PrinciplesSection.jsx";
import { ResidenciesSection } from "./components/residencies-section/ResidenciesSection.jsx";
import { SelectionSection } from "./components/selection-section/SelectionSection.jsx";
import { ProgramsSections } from "./components/programs-section/PorgramsSection.jsx";
import styles from "./GrantsPage.module.scss";

export function GrantsPage() {
  return (
    <main className={styles.page}>
      <GrantsHero />
      <ProgramsSections />
      <PrinciplesSection />
      <SelectionSection />
      <ResidenciesSection />
      <PeopleSection />
      <Footer />
    </main>
  );
}
