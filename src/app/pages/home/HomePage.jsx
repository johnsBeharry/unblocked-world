import { Footer } from "../../components/footer/Footer.jsx";
import "../../styles/Unblocked.generated.module.scss";
import styles from "./HomePage.module.scss";
import EnergySection from "./components/energy/EnergySection.jsx";
import { HeroSection } from "./components/hero/HeroSection.jsx";
import HiddenSystemsSection from "./components/hidden-systems/HiddenSystemsSection.jsx";
import OwnershipSection from "./components/ownership/OwnershipSection.jsx";
import PeersSection from "./components/peers/PeersSection.jsx";
import PermanenceSection from "./components/permanence/PermanenceSection.jsx";
import { ThemeSectionStack } from "./components/theme-section-stack/ThemeSectionStack.jsx";

export function HomePage() {
  return (
    <main>
      <div id="container">
        <div>
          <div>
            <div className="css-uwf2km css-fou3uo tailwind">
              <div className={styles.shell}>
                <div className={styles.canvas}>
                  <div className="relative size-full" data-name="index">
                    <HeroSection />
                    <ThemeSectionStack>
                      <OwnershipSection />
                      <PermanenceSection />
                      <EnergySection />
                      <PeersSection />
                    </ThemeSectionStack>
                    <HiddenSystemsSection />
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
