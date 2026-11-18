import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OwnershipJury.module.scss";
import content from "./ownership-jury-content.json";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";

gsap.registerPlugin(ScrollTrigger);

// Members (name, portrait, description) live in ownership-jury-content.json.
// Portraits are shown as-is (no blend); placeholders until the real photos
// arrive (sources in public/UNBLOCKED-poster_files/jury).
const MEMBERS = content.members;
// Tablet / mobile show the first four members as cards.
const MOBILE_JURY_CARDS = MEMBERS.slice(0, 4);

// 1 juri = 1 tinggi viewport scroll
const SCROLL_VIEWPORTS_PER_MEMBER = 1;
// progress slot (0..1) saat portrait juri berikutnya mulai muncul
const JURY_IMAGE_TRANSITION_START = 0.7;

// curtain horizontal: jumlah strip & stagger antar strip (0..1)
const CURTAIN_STRIPS = 16;
const CURTAIN_STAGGER = 0.6;

const clamp = (v) => Math.min(1, Math.max(0, v));

// t = progress curtain (0..1).
// Strip paling bawah mulai duluan, paling atas terakhir, jadi bawah tebal, atas tipis (kayak gambar #2).
// Yang di-clip adalah layer portrait-nya langsung.
const buildCurtainClip = (t) => {
  const duration = 1 - CURTAIN_STAGGER;
  const stripH = 100 / CURTAIN_STRIPS;
  const pts = [];

  for (let i = 0; i < CURTAIN_STRIPS; i++) {
    const fromBottom = CURTAIN_STRIPS - 1 - i; // 0 = strip paling bawah
    const delay = (fromBottom / (CURTAIN_STRIPS - 1)) * CURTAIN_STAGGER;
    const p = clamp((t - delay) / duration);

    const yBottom = (i + 1) * stripH;
    const yTop = yBottom - p * stripH; // tinggi strip ngikut scroll

    pts.push(
      `0% ${yTop}%`,
      `100% ${yTop}%`,
      `100% ${yBottom}%`,
      `0% ${yBottom}%`,
    );
  }

  return `polygon(${pts.join(", ")})`;
};

const applyClip = (el, value) => {
  el.style.clipPath = value;
  el.style.webkitClipPath = value;
};

export function OwnershipJury() {
  const memberListRef = useRef(null);
  const [activeJuryIndex, setActiveJuryIndex] = useState(0);

  useEffect(() => {
    const memberList = memberListRef.current;
    const section = memberList?.closest('[data-name="jury"]');
    if (!memberList || !section) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 865px)", () => {
      const rows = Array.from(memberList.querySelectorAll("[data-jury-row]"));
      const textRows = rows.map((row) => row.querySelector("[data-jury-text]"));
      const descriptionRows = Array.from(
        section.querySelectorAll("[data-jury-description]"),
      );
      const imageLayers = Array.from(
        section.querySelectorAll("[data-jury-image-layer]"),
      );
      if (!rows.length || imageLayers.length !== rows.length) return undefined;

      const slotSize = 1 / rows.length;
      let activeLabelIndex = -1;

      const applyProgress = (progress) => {
        const overall = clamp(progress);
        const activeIndex = Math.min(
          rows.length - 1,
          Math.floor(overall * rows.length),
        );
        const activeSlotProgress = clamp(
          (overall - activeIndex * slotSize) / slotSize,
        );

        if (activeIndex !== activeLabelIndex) {
          activeLabelIndex = activeIndex;
          setActiveJuryIndex(activeIndex);
          textRows.forEach((text, index) => {
            gsap.to(text, {
              opacity: index <= activeIndex ? 1 : 0.5,
              duration: index === activeIndex ? 0.42 : 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
          descriptionRows.forEach((description, index) => {
            const isActive = index === activeIndex;
            gsap.to(description, {
              opacity: isActive ? 1 : 0,
              duration: isActive ? 0.42 : 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        }

        // Garis progress di atas nama
        rows.forEach((row, index) => {
          let rowProgress = 0;
          if (index < activeIndex) rowProgress = 1;
          else if (index === activeIndex) rowProgress = activeSlotProgress;

          row.style.setProperty("--jury-progress", rowProgress);
        });

        // Curtain portrait juri berikutnya (mulai di 70% slot)
        const transitionProgress = clamp(
          (activeSlotProgress - JURY_IMAGE_TRANSITION_START) /
            (1 - JURY_IMAGE_TRANSITION_START),
        );

        imageLayers.forEach((layer, index) => {
          let t = 0;
          if (index <= activeIndex) t = 1;
          else if (index === activeIndex + 1) t = transitionProgress;

          if (index === 0 || t >= 1) applyClip(layer, "none");
          else applyClip(layer, buildCurtainClip(t));
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        // total scroll = jumlah juri x tinggi viewport x SCROLL_VIEWPORTS_PER_MEMBER
        end: () =>
          `+=${Math.round(
            rows.length * SCROLL_VIEWPORTS_PER_MEMBER * window.innerHeight,
          )}`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress),
      });

      applyProgress(trigger.progress);

      return () => {
        trigger.kill();
        gsap.killTweensOf(textRows);
        gsap.killTweensOf(descriptionRows);
        rows.forEach((row) => row.style.removeProperty("--jury-progress"));
        textRows.forEach((el) => el && (el.style.opacity = ""));
        imageLayers.forEach((layer) => applyClip(layer, ""));
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className={styles.section}
      data-name="jury"
      aria-label={content.label}
    >
      <div className={styles.label}>
        <RevealText as="p">{content.sectionLabel}</RevealText>
      </div>

      <div className={styles.imageFrame}>
        <div className={styles.imageStack}>
          {MEMBERS.map((member, index) => (
            <div
              className={styles.imageLayer}
              data-name={index === 0 ? "image 40" : `image 40 ${index + 1}`}
              data-jury-image-layer
              key={member.name}
            >
              <img src={member.photo} alt={member.alt} />
            </div>
          ))}
        </div>
      </div>

      <div ref={memberListRef} className={styles.memberList}>
        {MEMBERS.map((member) => (
          <p className={styles.member} key={member.name} data-jury-row>
            <span className={styles.memberText} data-jury-text>
              {member.name}
            </span>
          </p>
        ))}
      </div>

      <div className={styles.description}>
        {MEMBERS.map((member, index) => (
          <RevealText
            as="p"
            className={styles.descriptionText}
            data-jury-description
            enabled
            play={index === activeJuryIndex}
            key={`${member.name}-description`}
          >
            {member.description}
          </RevealText>
        ))}
      </div>

      <div className={styles.mobileCards} aria-hidden="true">
        {MOBILE_JURY_CARDS.map((member, index) => (
          <article className={styles.mobileCard} key={index}>
            <div className={styles.mobileImageFrame}>
              <img src={member.photo} alt="" />
            </div>
            <RevealText as="h2">{member.name}</RevealText>
            <RevealText as="p">{member.description}</RevealText>
          </article>
        ))}
      </div>
    </section>
  );
}
