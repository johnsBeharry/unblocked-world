import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GuidelinesContent.module.scss'
import content from './guidelines-content.json'
import { GuidelineSection, RuledList } from '../guideline-section/GuidelineSection.jsx'
import { JudgingRound } from '../judging-round/JudgingRound.jsx'
import { FaqAccordion } from '../faq-accordion/FaqAccordion.jsx'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'

const { sections, judging, afterSubmission, faq } = content

function Label({ children }) { return <span className={styles.label}><RevealText as="span">{children}</RevealText></span> }

gsap.registerPlugin(ScrollTrigger)

// Reference line the section progress is measured against (matches the active band).
const PROGRESS_LINE = 'top 45%'

const navigation = [...sections, judging, afterSubmission].map(({ id, title }) => ({ id, title }))

export function GuidelinesContent() {
  const [activeSection, setActiveSection] = useState(navigation[0].id)
  const navRef = useRef(null)

  // Each nav label's dark layer is clipped by its section's scroll progress:
  // 0 when the section top reaches the reference line, 1 when its bottom does
  // (clamped to the page end so the last short section can still complete).
  useEffect(() => {
    const triggers = navigation.map(({ id }) => {
      const section = document.getElementById(id)
      const link = navRef.current?.querySelector(`[href="#${id}"]`)
      if (!section || !link) return null
      const setProgress = self => link.style.setProperty('--nav-progress', self.progress.toFixed(4))
      return ScrollTrigger.create({ trigger: section, start: PROGRESS_LINE, end: 'clamp(bottom 45%)', onUpdate: setProgress, onRefresh: setProgress })
    })
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => triggers.forEach(trigger => trigger?.kill())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-5% 0px -55% 0px', threshold: 0 })
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.page} data-name="guidelines-content">
      <a href={content.skipLink.href} className={styles.skipLink}>{content.skipLink.label}</a>
      <header className={styles.header}>
        <RevealText as="p" className={styles.introText}>{contentLines(content.introText)}</RevealText>
        <h1 className={`${styles.headline} ${styles.introHeadline}`}>
          <RevealText highlight as="span" className={styles.introDesktop}>{content.introduction.join(' ')}</RevealText>
          <RevealText highlight as="span" className={styles.introTablet}>{contentLines(content.introduction)}</RevealText>
        </h1>
      </header>
      <div className={styles.contentGrid}>
        <aside><div className={styles.stickyNavigation}><Label>{content.navigation.title}</Label><nav ref={navRef} aria-label={content.navigation.label} className={styles.navigation}>{navigation.map(({ id, title }) => <RevealRow as="a" line={false} key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setActiveSection(id)} className={styles.navLink}>{title}<span className={styles.navFill} aria-hidden="true">{title}</span></RevealRow>)}</nav></div></aside>
        <div className={styles.contentSections}>
          {sections.map(section => <GuidelineSection key={section.id} id={section.id} title={section.title} description={section.description} items={section.items} ordered={section.id === 'submission-process'} />)}
          <section id={judging.id} className={styles.guideSection} aria-labelledby="judging-title">
            <RevealText as="h2" id="judging-title" className={styles.headline}>{judging.title}</RevealText>
            <RevealText as="p">{judging.description}</RevealText>
            {judging.rounds.map(round => <JudgingRound key={round.status} statusLabel={judging.statusLabel} {...round} />)}
            <div className={styles.progressOverview}><RevealText as="h3" className={styles.bold}>{judging.progressTitle}</RevealText><RevealText as="p">{judging.progress}</RevealText></div>
          </section>
          <section id={afterSubmission.id} className={styles.guideSection} aria-labelledby="after-title"><RevealText as="h2" id="after-title" className={styles.headline}>{afterSubmission.title}</RevealText><RevealText as="p">{afterSubmission.description}</RevealText></section>
        </div>
      </div>
      <section className={styles.faqSection} aria-labelledby="faq-title"><h2 id="faq-title"><Label>{faq.title}</Label></h2><div className={styles.faqContent}>{faq.questions.map(question => <FaqAccordion key={question} question={question} />)}<FaqAccordion question={faq.prize.question} defaultOpen><RevealText as="p">{faq.prize.answer}</RevealText><ul className={styles.prizesList}>{faq.prize.prizes.map(prize => <RevealRow key={prize} className={styles.prizeItem} contentClassName={styles.prizeContent} lineClassName={styles.prizeRule}><span aria-hidden="true">•</span><span>{prize}</span></RevealRow>)}</ul></FaqAccordion></div></section>
    </section>
  )
}
