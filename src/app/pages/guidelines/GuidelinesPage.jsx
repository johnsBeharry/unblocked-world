import { Footer } from "../../components/footer/Footer.jsx";
import styles from "./GuidelinesPage.module.scss";
import { GuidelinesContent } from "./components/guidelines-content/GuidelinesContent.jsx";
import { SubmissionsGuidelines } from "./components/submissions-guidelines/SubmissionsGuidelines.jsx";

export function GuidelinesPage() {
  return (
    <main className={styles.page}>
      <SubmissionsGuidelines />
      <GuidelinesContent />
      <Footer />
    </main>
  );
}
