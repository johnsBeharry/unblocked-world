import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OwnershipJury.module.scss";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PHOTO =
  "/UNBLOCKED-poster_files/d356dbbf2d02f78c903bcc39b1a7ff95ac05d5a7.d356dbbf.png";

const JURY_MEMBERS = [
  "Kyle Fletcher",
  "Johns Beharry",
  "Lewis Webber",
  "Liam Hartwell",
  "Caleb Winters",
  "Ava Sinclair",
];

const MOBILE_JURY_CARDS = [0, 1, 2, 3];
const DEFAULT_JURY_DESCRIPTION =
  "Head of Brand Creative at Cash App, with experience shaping cultural work across music, identity, and visual systems.";
const DEFAULT_JURY_DESCRIPTIONS = JURY_MEMBERS.map(
  () => DEFAULT_JURY_DESCRIPTION,
);

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

export function OwnershipJury({
  photoSrc = DEFAULT_PHOTO,
  descriptions = DEFAULT_JURY_DESCRIPTIONS,
}) {
  const memberListRef = useRef(null);
  const [activeJuryIndex, setActiveJuryIndex] = useState(0);
  const photoSources = Array.isArray(photoSrc)
    ? photoSrc
    : JURY_MEMBERS.map(() => photoSrc);
  const descriptionSources = JURY_MEMBERS.map(
    (_, index) =>
      descriptions[index] || descriptions[0] || DEFAULT_JURY_DESCRIPTION,
  );

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
      aria-label="Jury Members"
    >
      <div className={styles.label}>
        <RevealText as="p">Sec. 05 (Jury Members)</RevealText>
      </div>

      <div className={styles.imageFrame}>
        <div className={styles.imageStack}>
          {JURY_MEMBERS.map((member, index) => (
            <div
              className={styles.imageLayer}
              data-name={index === 0 ? "image 40" : `image 40 ${index + 1}`}
              data-jury-image-layer
              key={member}
            >
              <img
                src={photoSources[index] || photoSources[0]}
                alt={`${member} portrait`}
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={memberListRef} className={styles.memberList}>
        {JURY_MEMBERS.map((member) => (
          <p className={styles.member} key={member} data-jury-row>
            <span className={styles.memberText} data-jury-text>
              {member}
            </span>
          </p>
        ))}
      </div>

      <div className={styles.description}>
        {descriptionSources.map((description, index) => (
          <RevealText
            as="p"
            className={styles.descriptionText}
            data-jury-description
            enabled
            play={index === activeJuryIndex}
            key={`${JURY_MEMBERS[index]}-description`}
          >
            {description}
          </RevealText>
        ))}
      </div>

      <div className={styles.mobileCards} aria-hidden="true">
        {MOBILE_JURY_CARDS.map((card) => (
          <article className={styles.mobileCard} key={card}>
            <div className={styles.mobileImageFrame}>
              <img
                src={Array.isArray(photoSrc) ? photoSrc[0] : photoSrc}
                alt=""
              />
            </div>
            <RevealText as="h2">Kyle Fletcher</RevealText>
            <RevealText as="p">
              Head of Brand Creative at Cash App, with experience shaping
              cultural work across music, identity, and visual systems.
            </RevealText>
          </article>
        ))}
      </div>
    </section>
  );
}
