import { Footer } from "../../components/footer/Footer.jsx";
import "../../styles/Unblocked.generated.module.scss";
import styles from "./HomePage.module.scss";
import themeContent from "./themes-content.json";
import { HeroSection } from "./components/hero/HeroSection.jsx";
import HiddenSystemsSection from "./components/hidden-systems/HiddenSystemsSection.jsx";
import { ThemeSection } from "./components/theme-section/ThemeSection.jsx";
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
                      {themeContent.themes.map((theme) => (
                        <ThemeSection
                          key={theme.variant}
                          versus={themeContent.versus}
                          {...theme}
                        />
                      ))}
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
