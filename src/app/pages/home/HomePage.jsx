import React from "react";
import "../../styles/Unblocked.generated.module.scss";
import styles from "./HomePage.module.scss";
import { HeroSection } from "./components/hero/HeroSection.jsx";
import OwnershipSection from "./components/ownership/OwnershipSection.jsx";
import PermanenceSection from "./components/permanence/PermanenceSection.jsx";
import EnergySection from "./components/energy/EnergySection.jsx";
import PeersSection from "./components/peers/PeersSection.jsx";
import { ThemeSectionStack } from "./components/theme-section-stack/ThemeSectionStack.jsx";
import HiddenSystemsSection from "./components/hidden-systems/HiddenSystemsSection.jsx";
import { Footer } from "../../components/footer/Footer.jsx";

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
                      <PeersSection />
                      <PermanenceSection />
                      <EnergySection />
                      <OwnershipSection />
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
