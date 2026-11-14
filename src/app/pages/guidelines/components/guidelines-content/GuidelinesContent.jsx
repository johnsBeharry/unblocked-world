import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GuidelinesContent.module.scss'
import { introduction, introductionLines, sections, rounds, unansweredQuestions, prizes } from './content.js'
import { GuidelineSection, RuledList } from '../guideline-section/GuidelineSection.jsx'
import { JudgingRound } from '../judging-round/JudgingRound.jsx'
import { FaqAccordion } from '../faq-accordion/FaqAccordion.jsx'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'

function Label({ children }) { return <span className={styles.label}><RevealText as="span">{children}</RevealText></span> }

gsap.registerPlugin(ScrollTrigger)

// Reference line the section progress is measured against (matches the active band).
const PROGRESS_LINE = 'top 45%'

const navigation = [...sections.map(({ id, title }) => ({ id, title })), { id: 'judging-process', title: 'Judging Process' }, { id: 'after-submission', title: 'After Submission' }]

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
      <a href="#submission-process" className={styles.skipLink}>Skip to submission guide</a>
      <header className={styles.header}>
        <RevealText as="p" className={styles.introText}>This page explains how to prepare<br />and submit work for the poster<br />contest. The first theme is<br /><u>Ownership</u>.</RevealText>
        <h1 className={`${styles.headline} ${styles.introHeadline}`}>
          <RevealText as="span" className={styles.introDesktop}>{introduction}</RevealText>
          <RevealText as="span" className={styles.introTablet}>{introductionLines.map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{line}</React.Fragment>)}</RevealText>
        </h1>
      </header>
      <div className={styles.contentGrid}>
        <aside><div className={styles.stickyNavigation}><Label>Sections</Label><nav ref={navRef} aria-label="Submission guide sections" className={styles.navigation}>{navigation.map(({ id, title }) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setActiveSection(id)} className={styles.navLink}>{title}<span className={styles.navFill} aria-hidden="true">{title}</span></a>)}</nav></div></aside>
        <div className={styles.contentSections}>
          {sections.map(section => <GuidelineSection key={section.id} id={section.id} title={section.title} description={section.description} items={section.items} ordered={section.id === 'submission-process'} />)}
          <section id="judging-process" className={styles.guideSection} aria-labelledby="judging-title">
            <RevealText as="h2" id="judging-title" className={styles.headline}>Judging Process</RevealText>
            <RevealText as="p">The competition review process takes place across four rounds. During each round, submitted posters are reviewed and either progress to the next stage or conclude their journey. Each round represents a different level of selection and feedback.</RevealText>
            {rounds.map(round => <JudgingRound key={round.status} {...round} />)}
            <div className={styles.progressOverview}><RevealText as="h3" className={styles.bold}>Progress Overview</RevealText><RevealText as="p">Accepted (→) Under Review (→) Shortlisted (→) Selected</RevealText></div>
          </section>
          <section id="after-submission" className={styles.guideSection} aria-labelledby="after-title"><RevealText as="h2" id="after-title" className={styles.headline}>After Submission</RevealText><RevealText as="p">After submitting, you should receive a confirmation message or email. Please do not close or exit the page while your submission is uploading.</RevealText></section>
        </div>
      </div>
      <section className={styles.faqSection} aria-labelledby="faq-title"><h2 id="faq-title"><Label>FAQs</Label></h2><div className={styles.faqContent}>{unansweredQuestions.map(question => <FaqAccordion key={question} question={question} />)}<FaqAccordion question="What do I get if I win?" defaultOpen><RevealText as="p">Winning entries receive recognition across our channels and programme materials, with selected works becoming part of the broader exhibition experience.</RevealText><ul className={styles.prizesList}>{prizes.map(prize => <RevealRow key={prize} className={styles.prizeItem} contentClassName={styles.prizeContent} lineClassName={styles.prizeRule}><span aria-hidden="true">•</span><span>{prize}</span></RevealRow>)}</ul></FaqAccordion></div></section>
    </section>
  )
}
